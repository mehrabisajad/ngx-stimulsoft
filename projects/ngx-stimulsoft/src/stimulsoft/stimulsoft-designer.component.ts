import {Component, OnInit} from '@angular/core';
import {NgxSourceService} from 'ngx-source';
import {StimulsoftSourceName} from './stimulsoft-source-name.model';

declare var Stimulsoft: any;

@Component({
    selector: 'ngx-stimulsoft-designer',
    template: `<div id="designer"></div>`,
})
export class StimulsoftDesignerComponent implements OnInit {

    constructor(private sourceService: NgxSourceService) {
    }

    public async ngOnInit(): Promise<void> {
        await this.sourceService.load(StimulsoftSourceName.CSS_STIMULSOFT_DESIGNER);
        await this.sourceService.load(StimulsoftSourceName.CSS_STIMULSOFT_VIEWER);
        await this.sourceService.load(StimulsoftSourceName.STIMULSOFT_REPORTER);
        await this.sourceService.load(StimulsoftSourceName.STIMULSOFT_VIEWER);
        await this.sourceService.load(StimulsoftSourceName.STIMULSOFT_DESIGNER);

        const options = new Stimulsoft.Designer.StiDesignerOptions();
        const designer = new Stimulsoft.Designer.StiDesigner(options, 'StiDesigner', false);
        designer.report = new Stimulsoft.Report.StiReport();
        designer.renderHtml('designer');
    }
}
