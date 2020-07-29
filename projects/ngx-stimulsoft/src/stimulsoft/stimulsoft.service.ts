import {Inject, Injectable} from '@angular/core';
import {ISource, Source, SourceType} from 'ngx-source';
import {config, IStimulsoftConfig} from './config';
import {StimulsoftSourceName} from './stimulsoft-source-name.model';

@Injectable()
export class StimulsoftService {
  public stimulsoftDesignerCssUrl!: IStimulsoftConfig['stimulsoftDesignerCssUrl'];
  public stimulsoftViewerCssUrl!: IStimulsoftConfig['stimulsoftViewerCssUrl'];
  public stimulsoftDesignerJsUrl!: IStimulsoftConfig['stimulsoftDesignerJsUrl'];
  public stimulsoftReportsJsUrl!: IStimulsoftConfig['stimulsoftReportsJsUrl'];
  public stimulsoftViewerJsUrl!: IStimulsoftConfig['stimulsoftViewerJsUrl'];

  public constructor(@Inject(config) protected stimulsoftConfig: IStimulsoftConfig) {
    this.stimulsoftDesignerCssUrl = this.stimulsoftConfig.stimulsoftDesignerCssUrl;
    this.stimulsoftViewerCssUrl = this.stimulsoftConfig.stimulsoftViewerCssUrl;
    this.stimulsoftDesignerJsUrl = this.stimulsoftConfig.stimulsoftDesignerJsUrl;
    this.stimulsoftReportsJsUrl = this.stimulsoftConfig.stimulsoftReportsJsUrl;
    this.stimulsoftViewerJsUrl = this.stimulsoftConfig.stimulsoftViewerJsUrl;
  }

  public get stimulsoftSourceStore(): ISource[] {
    return [
      new Source(StimulsoftSourceName.STIMULSOFT_DESIGNER,
        this.stimulsoftDesignerJsUrl,
        SourceType.SCRIPT),

      new Source(StimulsoftSourceName.STIMULSOFT_REPORTER,
        this.stimulsoftReportsJsUrl,
        SourceType.SCRIPT),

      new Source(StimulsoftSourceName.STIMULSOFT_VIEWER,
        this.stimulsoftViewerJsUrl,
        SourceType.SCRIPT),

      new Source(
        StimulsoftSourceName.CSS_STIMULSOFT_DESIGNER,
        this.stimulsoftDesignerCssUrl,
        SourceType.STYLE,
      ),
      new Source(
        StimulsoftSourceName.CSS_STIMULSOFT_VIEWER,
        this.stimulsoftViewerCssUrl,
        SourceType.STYLE),
    ];
  }
}
