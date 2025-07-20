import { Inject, Injectable } from '@angular/core';
import { ISource, Source, SourceType } from 'ngx-source';
import { config, initialStimulsoftConfig, IStimulsoftConfig, ResourceUrl } from './config';
import { StimulsoftSourceName } from './stimulsoft-source-name.model';

@Injectable()
export class StimulsoftService {
  public readonly stimulsoftDesignerCssUrl: ResourceUrl;
  public readonly stimulsoftViewerCssUrl: ResourceUrl;
  public readonly stimulsoftDesignerJsUrl: ResourceUrl;
  public readonly stimulsoftReportsJsUrl: ResourceUrl;
  public readonly stimulsoftViewerJsUrl: ResourceUrl;
  public readonly options: IStimulsoftConfig['options'];
  public readonly fonts: IStimulsoftConfig['fonts'];
  public readonly baseUrl: string | undefined;

  constructor(@Inject(config) public readonly stimulsoftConfig: IStimulsoftConfig) {
    const {
      stimulsoftDesignerCssUrl,
      stimulsoftViewerCssUrl,
      stimulsoftDesignerJsUrl,
      stimulsoftReportsJsUrl,
      stimulsoftViewerJsUrl,
      options,
      fonts,
      baseUrl,
    } = stimulsoftConfig;

    this.stimulsoftDesignerCssUrl = stimulsoftDesignerCssUrl || initialStimulsoftConfig.stimulsoftDesignerCssUrl;
    this.stimulsoftViewerCssUrl = stimulsoftViewerCssUrl || initialStimulsoftConfig.stimulsoftViewerCssUrl;
    this.stimulsoftDesignerJsUrl = stimulsoftDesignerJsUrl || initialStimulsoftConfig.stimulsoftDesignerJsUrl;
    this.stimulsoftReportsJsUrl = stimulsoftReportsJsUrl || initialStimulsoftConfig.stimulsoftReportsJsUrl;
    this.stimulsoftViewerJsUrl = stimulsoftViewerJsUrl || initialStimulsoftConfig.stimulsoftViewerJsUrl;
    this.options = options;
    this.fonts = fonts;
    this.baseUrl = baseUrl;
  }

  public get stimulsoftSourceStore(): ISource[] {
    const { STYLE, SCRIPT } = SourceType;
    return (
      [
        [StimulsoftSourceName.STIMULSOFT_DESIGNER, this.stimulsoftDesignerJsUrl, SCRIPT],
        [StimulsoftSourceName.STIMULSOFT_REPORTER, this.stimulsoftReportsJsUrl, SCRIPT],
        [StimulsoftSourceName.STIMULSOFT_VIEWER, this.stimulsoftViewerJsUrl, SCRIPT],
        [StimulsoftSourceName.CSS_STIMULSOFT_DESIGNER, this.stimulsoftDesignerCssUrl, STYLE],
        [StimulsoftSourceName.CSS_STIMULSOFT_VIEWER, this.stimulsoftViewerCssUrl, STYLE],
      ] as Array<[StimulsoftSourceName, ResourceUrl, SourceType]>
    )
      .map(([name, url, type]) => (Array.isArray(url) ? url : [url]).map(u => new Source(name, u, type)))
      .reduce((resources, item) => [...resources, ...item], [] as ISource[]);
  }
}
