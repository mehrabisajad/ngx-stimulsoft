import {Component, OnInit} from '@angular/core';
import {NgxSourceService} from 'ngx-source';
import {StimulsoftSourceName} from './stimulsoft-source-name.model';
import {DefaultStimulantSourceStore} from './stimulsoft-source.store';

declare var Stimulsoft: any;

@Component({
  selector: 'ngx-stimulsoft-designer',
  template: `<div id="stimulsoft-designer"></div>`,
})
export class StimulsoftDesignerComponent implements OnInit {
  constructor(public sourceService: NgxSourceService) {
    this.sourceService.addSources(...DefaultStimulantSourceStore);
  }

  public async ngOnInit(): Promise<void> {
    await this.sourceService.loadBySourceName(StimulsoftSourceName.CSS_STIMULSOFT_DESIGNER);
    await this.sourceService.loadBySourceName(StimulsoftSourceName.CSS_STIMULSOFT_VIEWER);
    await this.sourceService.loadBySourceName(StimulsoftSourceName.STIMULSOFT_REPORTER);
    await this.sourceService.loadBySourceName(StimulsoftSourceName.STIMULSOFT_VIEWER);
    await this.sourceService.loadBySourceName(StimulsoftSourceName.STIMULSOFT_DESIGNER);

    const options = new Stimulsoft.Designer.StiDesignerOptions();
    const designer = new Stimulsoft.Designer.StiDesigner(options, 'StiDesigner', false);
    designer.report = new Stimulsoft.Report.StiReport();
    designer.renderHtml('stimulsoft-designer');
  }
}
