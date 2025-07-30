import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { NgxSourceService } from 'ngx-source';
import { StimulsoftSourceName } from './stimulsoft-source-name.model';
import { StimulsoftService } from './stimulsoft.service';
import { UniqueComponentId } from './util';

declare let Stimulsoft: any;

@Component({
  selector: 'ngx-stimulsoft-designer',
  template: ` <div dir="ltr" [id]="id()"></div>`,
  standalone: true,
})
export class StimulsoftDesignerComponent {
  readonly id = input<string>(UniqueComponentId());
  readonly licenseKey = input<string | undefined>();
  readonly licenseFile = input<string | undefined>();
  readonly local = input<string>('en');

  readonly onLoadResourceFailed = output<{ source: string; error: any }>();
  readonly loading = output<boolean>();

  private readonly sourceService = inject(NgxSourceService);
  private readonly stimulsoftService = inject(StimulsoftService);
  private readonly isLoadedSource = signal(false);
  private failResourcesDownload = signal<boolean>(false);

  private readonly resourcesReady = computed(() => this.isLoadedSource() && !this.failResourcesDownload());

  constructor() {
    this.sourceService.addSources(...this.stimulsoftService.stimulsoftSourceStore);
    this.loadResources().then();
    effect(() => {
      if (this.resourcesReady()) {
        // eslint-disable-next-line
        const dependencies = [this.id(), this.licenseKey(), this.licenseFile(), this.local()];
        this.initializeDesigner(this.id());
      }
    });
  }

  private async loadResources(): Promise<void> {
    this.loading.emit(true);

    const sources = [StimulsoftSourceName.REPORTER_SCRIPT, StimulsoftSourceName.VIEWER_SCRIPT, StimulsoftSourceName.DESIGNER_SCRIPT];

    if (this.stimulsoftService.viewerCssUrl) {
      sources.push(StimulsoftSourceName.VIEWER_STYLE);
    }
    if (this.stimulsoftService.designerCssUrl) {
      sources.push(StimulsoftSourceName.DESIGNER_STYLE);
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

  private initializeDesigner(id: string): void {
    const container = document.getElementById(id);
    if (!container) {
      console.warn(`Container with id "${id}" not found.`);
      return;
    }

    this.applyLicense();

    const options = new Stimulsoft.Designer.StiDesignerOptions();
    const designer = new Stimulsoft.Designer.StiDesigner(options, 'StiDesigner', false);
    designer.report = new Stimulsoft.Report.StiReport();

    this.applyLocalization();

    designer.renderHtml(id);
  }

  private applyLocalization(): void {
    if (!this.stimulsoftService.localizationPath) {
      return;
    }

    const stiLocalization = Stimulsoft.Base.Localization.StiLocalization;
    const local = this.local();

    if (local === 'en') {
      stiLocalization.cultureName = 'English';
      return;
    }

    const path = `${this.stimulsoftService.localizationPath.replace(/\/$/g, '')}/${local}.xml`;
    stiLocalization.cultureName = stiLocalization.loadLocalizationFile(path);
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
}
