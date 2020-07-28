import {Component, OnInit} from '@angular/core';
import {NgxSourceService} from 'ngx-source';
import {StimulsoftSourceName} from './stimulsoft-source-name.model';
import {DefaultStimulantSourceStore} from './stimulsoft-source.store';

declare var Stimulsoft: any;

@Component({
  selector: 'ngx-stimulsoft-viewer',
  template: `<div id="stimulsoft-viewer"></div>`,
})
export class StimulsoftViewerComponent implements OnInit {
  constructor(public sourceService: NgxSourceService) {
    this.sourceService.addSources(...DefaultStimulantSourceStore);
  }

  public async ngOnInit(): Promise<void> {
    await this.sourceService.loadBySourceName(StimulsoftSourceName.CSS_STIMULSOFT_VIEWER);
    await this.sourceService.loadBySourceName(StimulsoftSourceName.STIMULSOFT_REPORTER);
    await this.sourceService.loadBySourceName(StimulsoftSourceName.STIMULSOFT_VIEWER);

    const options = new Stimulsoft.Viewer.StiViewerOptions();
    const viewer = new Stimulsoft.Designer.StiViewer(options, 'StiViewer', false);
    const report = new Stimulsoft.Report.StiReport();

    report.loadFile('reports/Report.mrt');
    viewer.report = report;
    viewer.renderHtml('stimulsoft-viewer');
  }
}
