import { Inject, Injectable } from '@angular/core';
import { ISource, Source, SourceType } from 'ngx-source';
import { config, initialStimulsoftConfig, IStimulsoftConfig } from './config';
import { StimulsoftSourceName } from './stimulsoft-source-name.model';

@Injectable()
export class StimulsoftService {
  public stimulsoftDesignerCssUrl: IStimulsoftConfig['stimulsoftDesignerCssUrl'];
  public stimulsoftViewerCssUrl: IStimulsoftConfig['stimulsoftViewerCssUrl'];
  public stimulsoftDesignerJsUrl: IStimulsoftConfig['stimulsoftDesignerJsUrl'];
  public stimulsoftReportsJsUrl: IStimulsoftConfig['stimulsoftReportsJsUrl'];
  public stimulsoftViewerJsUrl: IStimulsoftConfig['stimulsoftViewerJsUrl'];
  public options: IStimulsoftConfig['options'];
  public fonts: IStimulsoftConfig['fonts'];
  public baseUrl: IStimulsoftConfig['baseUrl'];

  public constructor(@Inject(config) protected stimulsoftConfig: IStimulsoftConfig) {
    this.stimulsoftDesignerCssUrl = this.stimulsoftConfig.stimulsoftDesignerCssUrl;
    this.stimulsoftViewerCssUrl = this.stimulsoftConfig.stimulsoftViewerCssUrl;
    this.stimulsoftDesignerJsUrl = this.stimulsoftConfig.stimulsoftDesignerJsUrl;
    this.stimulsoftReportsJsUrl = this.stimulsoftConfig.stimulsoftReportsJsUrl;
    this.stimulsoftViewerJsUrl = this.stimulsoftConfig.stimulsoftViewerJsUrl;
    this.options = this.stimulsoftConfig.options;
    this.fonts = this.stimulsoftConfig.fonts;
    this.baseUrl = this.stimulsoftConfig.baseUrl;
  }

  public get stimulsoftSourceStore(): ISource[] {
    return [
      new Source(
        StimulsoftSourceName.STIMULSOFT_DESIGNER,
        this.stimulsoftDesignerJsUrl ? this.stimulsoftDesignerJsUrl : initialStimulsoftConfig.stimulsoftDesignerJsUrl,
        SourceType.SCRIPT,
      ),

      new Source(
        StimulsoftSourceName.STIMULSOFT_REPORTER,
        this.stimulsoftReportsJsUrl ? this.stimulsoftReportsJsUrl : initialStimulsoftConfig.stimulsoftReportsJsUrl,
        SourceType.SCRIPT,
      ),

      new Source(
        StimulsoftSourceName.STIMULSOFT_VIEWER,
        this.stimulsoftViewerJsUrl ? this.stimulsoftViewerJsUrl : initialStimulsoftConfig.stimulsoftViewerJsUrl,
        SourceType.SCRIPT,
      ),

      new Source(
        StimulsoftSourceName.CSS_STIMULSOFT_DESIGNER,
        this.stimulsoftDesignerCssUrl ? this.stimulsoftDesignerCssUrl : initialStimulsoftConfig.stimulsoftDesignerCssUrl,
        SourceType.STYLE,
      ),
      new Source(
        StimulsoftSourceName.CSS_STIMULSOFT_VIEWER,
        this.stimulsoftViewerCssUrl ? this.stimulsoftViewerCssUrl : initialStimulsoftConfig.stimulsoftViewerCssUrl,
        SourceType.STYLE,
      ),
    ];
  }
}
