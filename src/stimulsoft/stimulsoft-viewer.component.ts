import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { NgxSourceService } from 'ngx-source';
import { IStimulsoftOption } from './config';
import { StimulsoftSourceName } from './stimulsoft-source-name.model';
import { StimulsoftService } from './stimulsoft.service';
import { UniqueComponentId } from './util';

declare let Stimulsoft: any;

@Component({
  selector: 'ngx-stimulsoft-viewer',
  template: ` <div dir="ltr" [id]="id()"></div>`,
  standalone: true,
})
export class StimulsoftViewerComponent {
  readonly stimulsoftService = inject(StimulsoftService);
  readonly sourceService = inject(NgxSourceService);
  readonly document = inject(DOCUMENT);

  readonly id = input<string>(UniqueComponentId());
  readonly baseUrl = input<string | undefined>(this.stimulsoftService.baseUrl);
  readonly fileName = input.required<string>();
  readonly fonts = input<Record<string, string> | undefined>(this.stimulsoftService.fonts);
  readonly dataSet = input.required<any>();
  readonly options = input<IStimulsoftOption | undefined>(this.stimulsoftService.options);
  readonly licenseKey = input<string | undefined>();
  readonly licenseFile = input<string | undefined>();
  readonly local = input<string>('en');
  readonly dir = input<'ltr' | 'rtl'>('ltr');

  readonly ready = output<boolean>();
  readonly loading = output<boolean>();
  readonly onLoadResourceFailed = output<{ source: string; error: any }>();

  private viewerOptions: any;
  private viewer: any;
  private report: any;

  private readonly isLoadedSource = signal(false);
  private readonly failResourcesDownload = signal<boolean>(false);

  private readonly canInitialize = computed(
    () => this.isLoadedSource() && !this.failResourcesDownload() && !!this.fileName() && !!this.dataSet(),
  );

  constructor() {
    this.sourceService.addSources(...this.stimulsoftService.stimulsoftSourceStore);

    this.loadResources().then();

    effect(() => {
      if (this.canInitialize()) {
        // eslint-disable-next-line
        const dependencies = [
          this.options(),
          this.fonts(),
          this.dataSet(),
          this.fileName(),
          this.id(),
          this.licenseKey(),
          this.licenseFile(),
          this.local(),
          this.dir(),
        ];
        this.initializeViewer();
      }
    });
  }

  private async loadResources(): Promise<void> {
    this.loading.emit(true);
    const sources = [StimulsoftSourceName.REPORTER_SCRIPT, StimulsoftSourceName.VIEWER_SCRIPT];

    if (this.stimulsoftService.viewerCssUrl) {
      sources.push(StimulsoftSourceName.VIEWER_STYLE);
    }

    try {
      await this.sourceService.loadBySourceNames(...sources);
      this.isLoadedSource.set(true);
    } catch (error) {
      this.failResourcesDownload.set(true);
      this.onLoadResourceFailed.emit({ source: 'stimulsoft', error });
    } finally {
      this.loading.emit(false);
    }
  }

  private initializeViewer(): void {
    if (typeof Stimulsoft === 'undefined') {
      this.onLoadResourceFailed.emit({ error: 'Stimulsoft undefined', source: 'global' });
      return;
    }

    this.ready.emit(false);

    this.viewerOptions = new Stimulsoft.Viewer.StiViewerOptions();
    this.viewerOptions.appearance.rightToLeft = this.dir() === 'rtl';
    this.viewer = new Stimulsoft.Viewer.StiViewer(this.viewerOptions, 'StiViewer', false);
    this.report = new Stimulsoft.Report.StiReport();

    this.applyOptions();
    this.setupReport();
  }

  private applyOptions(): void {
    const options = this.options();
    this.deepMerge(this.stimulsoftService.options, options);
    this.deepMerge(options, this.viewerOptions);
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
    if (!this.viewerOptions || !this.viewer || !this.report) {
      return;
    }

    this.applyFonts();
    this.loadReportFile();
    this.registerDataSet();
    this.applyLicense();
    this.setLocale();

    const targetElement = this.document.getElementById(this.id());
    if (!targetElement) {
      console.warn(`Element with id "${this.id()}" not found.`);
      return;
    }

    this.ready.emit(true);
    this.report.renderAsync(() => {
      this.viewer.report = this.report;
      this.viewer.renderHtml(this.id());
    });
  }

  private applyFonts(): void {
    const fonts = this.fonts();
    if (!fonts) {
      return;
    }
    for (const [name, url] of Object.entries(fonts)) {
      try {
        Stimulsoft.Base.StiFontCollection.addFontFile(url, name);
      } catch {
        console.error(`Can't load font: ${url}`);
      }
    }
  }

  private registerDataSet(): void {
    const json = this.dataSet();
    if (!json) {
      return;
    }
    const dataSet = new Stimulsoft.System.Data.DataSet('DataSet');
    dataSet.readJson(JSON.stringify(json));
    this.report.dictionary.databases.clear();
    this.report.regData('DataSet', 'DataSet', dataSet);
  }

  private applyLicense(): void {
    const key = this.licenseKey() ?? this.stimulsoftService.stimulsoftConfig.licenseKey;
    const file = this.licenseFile() ?? this.stimulsoftService.stimulsoftConfig.licenseFile;

    if (key) {
      Stimulsoft.Base.StiLicense.Key = key;
    } else if (file) {
      Stimulsoft.Base.StiLicense.loadFromFile(file);
    }
  }

  private loadReportFile(): void {
    const name = this.fileName();
    if (!name) {
      return;
    }

    const base = this.baseUrl() ?? '';
    this.report.loadFile(base + name);
  }

  private setLocale(): void {
    if (!this.stimulsoftService.localizationPath) {
      return;
    }
    const local = this.local();
    const stiLocalization = Stimulsoft.Base.Localization.StiLocalization;

    if (local === 'en') {
      stiLocalization.cultureName = 'English';
    } else {
      const path = [this.stimulsoftService.localizationPath.replace(/\/$/g, ''), `${local}.xml`].join('/');
      stiLocalization.cultureName = stiLocalization.loadLocalizationFile(path);
    }
  }
}
