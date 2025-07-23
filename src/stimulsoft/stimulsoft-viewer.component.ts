import { Component, effect, inject, input, OnInit, output, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { NgxSourceService } from 'ngx-source';
import { IStimulsoftOption } from './config';
import { StimulsoftSourceName } from './stimulsoft-source-name.model';
import { StimulsoftService } from './stimulsoft.service';
import { UniqueComponentId } from './util';

declare let Stimulsoft: any;

@Component({
  selector: 'ngx-stimulsoft-viewer',
  template: `<div [id]="id()"></div>`,
  standalone: true,
})
export class StimulsoftViewerComponent implements OnInit {
  readonly stimulsoftService = inject(StimulsoftService);
  readonly sourceService = inject(NgxSourceService);
  readonly document = inject(DOCUMENT);

  id = input<string>(UniqueComponentId());
  baseUrl = input<string | undefined>(this.stimulsoftService.baseUrl);
  fileName = input.required<string>();
  fonts = input<Record<string, string> | undefined>(this.stimulsoftService.fonts);
  dataSet = input.required<any>();
  options = input<IStimulsoftOption | undefined>(this.stimulsoftService.options);
  licenseKey = input<string | undefined>();
  licenseFile = input<string | undefined>();
  ready = output<boolean>();
  onLoadResourceFailed = output<{ source: string; error: any }>();
  isLoadedSource = signal(false);
  loading = output<boolean>();

  private viewerOptions: any;
  private viewer: any;
  private report: any;
  private failResourcesDownload = signal<boolean>(false);

  constructor() {
    this.sourceService.addSources(...this.stimulsoftService.stimulsoftSourceStore);

    effect(() => {
      if (this.isLoadedSource() && !this.failResourcesDownload()) {
        // eslint-disable-next-line
        const dependencies = [
          this.options(),
          this.fonts(),
          this.dataSet(),
          this.fileName(),
          this.id(),
          this.licenseKey(),
          this.licenseFile(),
        ];
        this.initializeViewer();
      }
    });
  }

  async ngOnInit(): Promise<void> {
    this.loading.emit(true);
    await this.sourceService
      .loadBySourceNames(
        StimulsoftSourceName.CSS_STIMULSOFT_VIEWER,
        StimulsoftSourceName.STIMULSOFT_REPORTER,
        StimulsoftSourceName.STIMULSOFT_VIEWER,
      )
      .then(() => this.isLoadedSource.set(true))
      .catch(error => {
        this.failResourcesDownload.set(true);
        this.onLoadResourceFailed.emit(error);
      })
      .finally(() => this.loading.emit(false));
  }

  private initializeViewer(): void {
    if (typeof Stimulsoft !== 'undefined') {
      this.ready.emit(false);

      this.viewerOptions = new Stimulsoft.Viewer.StiViewerOptions();
      this.viewer = new Stimulsoft.Viewer.StiViewer(this.viewerOptions, 'StiViewer', false);
      this.report = new Stimulsoft.Report.StiReport();

      this.applyOptions();
      this.setupReport();
    } else {
      this.onLoadResourceFailed.emit({ error: 'Stimulsoft undefined', source: 'Unknown' });
    }
  }

  private applyOptions(): void {
    this.deepMerge(this.options(), this.viewerOptions);
  }

  private deepMerge(source: any, target: any): void {
    if (!source || !target) {
      return;
    }

    for (const [key, value] of Object.entries(source)) {
      if (typeof value === 'object' && value !== null) {
        this.deepMerge(value, (target[key] ??= {}));
      } else {
        target[key] = value;
      }
    }
  }

  private setupReport(): void {
    if (!this.viewerOptions || !this.viewer || !this.report || !this.fileName() || !this.dataSet()) {
      return;
    }

    this.applyFonts();
    this.loadReportFile();
    this.registerDataSet();
    this.applyLicense();
    this.setLocalizationFile();

    const targetElement = this.document.getElementById(this.id());
    if (targetElement) {
      this.ready.emit(true);
      this.report.renderAsync(() => {
        this.viewer.report = this.report;
        this.viewer.renderHtml(this.id());
      });
    } else {
      console.warn(`Element with id "${this.id()}" not found.`);
    }
  }

  private setLocalizationFile(): void {
    if (this.stimulsoftService.localizationFile) {
      const stiLocalization = Stimulsoft.Base.Localization.StiLocalization;
      stiLocalization.cultureName = stiLocalization.loadLocalizationFile(this.stimulsoftService.localizationFile);
    }
  }

  private applyFonts(): void {
    const fonts = this.fonts();

    if (fonts) {
      for (const [name, url] of Object.entries(fonts)) {
        try {
          Stimulsoft.Base.StiFontCollection.addFontFile(url, name);
        } catch {
          console.error(`Can't load font: ${url}`);
        }
      }
    }
  }

  private registerDataSet(): void {
    const json = this.dataSet();
    if (json) {
      const dataSet = new Stimulsoft.System.Data.DataSet('DataSet');
      dataSet.readJson(JSON.stringify(json));
      this.report.dictionary.databases.clear();
      this.report.regData('DataSet', 'DataSet', dataSet);
    }
  }

  private applyLicense(): void {
    if (this.licenseKey() || this.stimulsoftService.stimulsoftConfig.licenseKey) {
      Stimulsoft.Base.StiLicense.Key = this.licenseKey() ?? this.stimulsoftService.stimulsoftConfig.licenseKey;
    } else if (this.licenseFile() || this.stimulsoftService.stimulsoftConfig.licenseFile) {
      Stimulsoft.Base.StiLicense.loadFromFile(this.licenseFile() ?? this.stimulsoftService.stimulsoftConfig.licenseFile);
    }
  }

  private loadReportFile(): void {
    const name = this.fileName();
    if (name) {
      const base = this.baseUrl() ?? '';
      this.report.loadFile(base + name);
    }
  }
}
