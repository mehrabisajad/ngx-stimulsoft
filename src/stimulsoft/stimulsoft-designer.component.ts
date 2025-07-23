import { Component, inject, input, OnInit } from '@angular/core';
import { NgxSourceService } from 'ngx-source';
import { StimulsoftSourceName } from './stimulsoft-source-name.model';
import { StimulsoftService } from './stimulsoft.service';
import { UniqueComponentId } from './util';

declare let Stimulsoft: any;

@Component({
  selector: 'ngx-stimulsoft-designer',
  template: ` <div [id]="id()"></div>`,
  standalone: true,
})
export class StimulsoftDesignerComponent implements OnInit {
  readonly id = input<string>(UniqueComponentId());
  readonly licenseKey = input<string | undefined>();
  readonly licenseFile = input<string | undefined>();

  private readonly sourceService = inject(NgxSourceService);
  private readonly stimulsoftService = inject(StimulsoftService);

  constructor() {
    this.sourceService.addSources(...this.stimulsoftService.stimulsoftSourceStore);
  }

  async ngOnInit(): Promise<void> {
    await this.sourceService
      .loadBySourceNames(
        StimulsoftSourceName.CSS_STIMULSOFT_DESIGNER,
        StimulsoftSourceName.CSS_STIMULSOFT_VIEWER,
        StimulsoftSourceName.STIMULSOFT_REPORTER,
        StimulsoftSourceName.STIMULSOFT_VIEWER,
        StimulsoftSourceName.STIMULSOFT_DESIGNER,
      )
      .catch((error: any) => console.error('Failed to initialize Stimulsoft Designer:', error));
    this.initializeDesigner(this.id());
  }

  private applyLicense(): void {
    if (this.licenseKey() || this.stimulsoftService.stimulsoftConfig.licenseKey) {
      Stimulsoft.Base.StiLicense.Key = this.licenseKey() ?? this.stimulsoftService.stimulsoftConfig.licenseKey;
    } else if (this.licenseFile() || this.stimulsoftService.stimulsoftConfig.licenseFile) {
      Stimulsoft.Base.StiLicense.loadFromFile(this.licenseFile() ?? this.stimulsoftService.stimulsoftConfig.licenseFile);
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

    if (this.stimulsoftService.localizationFile) {
      const stiLocalization = Stimulsoft.Base.Localization.StiLocalization;
      stiLocalization.cultureName = stiLocalization.loadLocalizationFile(this.stimulsoftService.localizationFile);
    }

    designer.renderHtml(id);
  }
}
