import {Component, Input, OnChanges, OnInit, SimpleChange} from '@angular/core';
import {NgxSourceService} from 'ngx-source';
import {IStimulsoftOption} from './config';
import {StimulsoftSourceName} from './stimulsoft-source-name.model';
import {StimulsoftService} from './stimulsoft.service';

declare var Stimulsoft: any;

@Component({
  selector: 'ngx-stimulsoft-viewer',
  template: `
    <div id="stimulsoft-viewer"></div>`,
})
export class StimulsoftViewerComponent implements OnInit, OnChanges {
  @Input() public baseUrl?: string | null;
  @Input() public fileName?: string | null;
  @Input() public fonts?: object;
  @Input() public dataSet?: any;
  @Input() public options?: IStimulsoftOption;

  private stimulsoftOptions: any;
  private stimulsoftViewer: any;
  private stimulsoftReport: any;

  constructor(protected stimulsoftService: StimulsoftService,
              public sourceService: NgxSourceService) {
    this.sourceService.addSources(...stimulsoftService.stimulsoftSourceStore);
    this.options = this.stimulsoftService.options;
    this.fonts = this.stimulsoftService.fonts;
    this.baseUrl = this.stimulsoftService.baseUrl;
  }

  public async ngOnInit(): Promise<void> {
    await this.sourceService.loadBySourceName(StimulsoftSourceName.CSS_STIMULSOFT_VIEWER);
    await this.sourceService.loadBySourceName(StimulsoftSourceName.STIMULSOFT_REPORTER);
    await this.sourceService.loadBySourceName(StimulsoftSourceName.STIMULSOFT_VIEWER);
    this.initStimulsoft();
  }

  private initStimulsoft(): void {
    this.stimulsoftOptions = new Stimulsoft.Viewer.StiViewerOptions();
    this.stimulsoftViewer = new Stimulsoft.Viewer.StiViewer(this.stimulsoftOptions, 'StiViewer', false);
    this.stimulsoftReport = new Stimulsoft.Report.StiReport();

    this.setOptions();
    this.load();
  }

  public ngOnChanges(changes: { [propKey: string]: SimpleChange }): void {
    if ((changes.mrtFileLocation && !changes.mrtFileLocation.isFirstChange()) ||
      (changes.fonts && !changes.fonts.isFirstChange()) ||
      (changes.dataSet && !changes.dataSet.isFirstChange()) ||
      (changes.options && !changes.options.isFirstChange())) {
      this.initStimulsoft();
    }
  }

  protected setOptions(): void {
    this.deepCopy(this.options, this.stimulsoftOptions);
  }

  protected deepCopy(source: any, target: any): void {
    if (source && target) {
      for (const [key, value] of Object.entries(source)) {
        if (key) {
          if (typeof (value) === 'object') {
            this.deepCopy(value, target[key]);
          } else {
            target[key] = value;
          }
        }
      }
    }
  }

  protected load(): void {

    if (this.stimulsoftOptions &&
      this.stimulsoftViewer &&
      this.stimulsoftReport &&
      this.fileName && this.dataSet) {

      // set fonts
      if (this.fonts && typeof (this.fonts) === 'object') {
        for (const [key, value] of Object.entries(this.fonts)) {
          if (key && value) {
            try {
              Stimulsoft.Base.StiFontCollection.addOpentypeFontFile(value, key);
            } catch (e) {
              console.log('can`t load font: ' + value);
            }
          }
        }
      }

      // set mrt file
      if (this.fileName) {
        this.stimulsoftReport.loadFile((this.baseUrl ? this.baseUrl : '') + this.fileName);
      }

      if (this.dataSet) {
        const dataSet = new Stimulsoft.System.Data.DataSet('DataSet');
        const strJson = JSON.stringify(this.dataSet);
        dataSet.readJson(strJson);
        this.stimulsoftReport.dictionary.databases.clear();
        this.stimulsoftReport.regData('DataSet', 'DataSet', dataSet);
      }

      this.stimulsoftViewer.report = this.stimulsoftReport;
      this.stimulsoftViewer.renderHtml('stimulsoft-viewer');
    }
  }

}
