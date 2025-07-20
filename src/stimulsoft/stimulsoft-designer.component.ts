import { Component, inject, input, OnInit } from '@angular/core';
import { ISourceLoadResult, NgxSourceService } from 'ngx-source';
import { StimulsoftSourceName } from './stimulsoft-source-name.model';
import { StimulsoftService } from './stimulsoft.service';

declare let Stimulsoft: any;

@Component({
  selector: 'ngx-stimulsoft-designer',
  template: `<div [id]="elementId"></div>`,
  standalone: true,
})
export class StimulsoftDesignerComponent implements OnInit {
  licenseKey = input<string | undefined>();
  licenseFile = input<string | undefined>();

  protected readonly elementId: string = 'stimulsoft-designer';
  private readonly sourceService = inject(NgxSourceService);
  private readonly stimulsoftService = inject(StimulsoftService);

  constructor() {
    this.sourceService.addSources(...this.stimulsoftService.stimulsoftSourceStore);
  }

  async ngOnInit(): Promise<void> {
    try {
      await this.loadRequiredSources();
      this.initializeDesigner();
    } catch (error) {
      console.error('Failed to initialize Stimulsoft Designer:', error);
    }
  }

  private async loadRequiredSources(): Promise<ISourceLoadResult[]> {
    return this.sourceService.loadBySourceNames(
      StimulsoftSourceName.CSS_STIMULSOFT_DESIGNER,
      StimulsoftSourceName.CSS_STIMULSOFT_VIEWER,
      StimulsoftSourceName.STIMULSOFT_REPORTER,
      StimulsoftSourceName.STIMULSOFT_VIEWER,
      StimulsoftSourceName.STIMULSOFT_DESIGNER,
    );
  }

  private applyLicense(): void {
    if (this.licenseKey() || this.stimulsoftService.stimulsoftConfig.licenseKey) {
      Stimulsoft.Base.StiLicense.Key = this.licenseKey() ?? this.stimulsoftService.stimulsoftConfig.licenseKey;
    } else if (this.licenseFile() || this.stimulsoftService.stimulsoftConfig.licenseFile) {
      Stimulsoft.Base.StiLicense.loadFromFile(this.licenseFile() ?? this.stimulsoftService.stimulsoftConfig.licenseFile);
    }
  }

  private initializeDesigner(): void {
    const container = document.getElementById(this.elementId);
    if (!container) {
      console.warn(`Container with id "${this.elementId}" not found.`);
      return;
    }

    this.applyLicense();
    const options = new Stimulsoft.Designer.StiDesignerOptions();
    const designer = new Stimulsoft.Designer.StiDesigner(options, 'StiDesigner', false);
    designer.report = new Stimulsoft.Report.StiReport();
    designer.renderHtml(this.elementId);
  }
}
