import { Inject, Injectable } from '@angular/core';
import { ISource, Source, SourceType } from 'ngx-source';
import { config, initialStimulsoftConfig, IStimulsoftConfig, ResourceUrl } from './config';
import { StimulsoftSourceName } from './stimulsoft-source-name.model';

@Injectable()
export class StimulsoftService {
  public readonly designerCssUrl: ResourceUrl;
  public readonly viewerCssUrl: ResourceUrl;
  public readonly designerJsUrl: ResourceUrl;
  public readonly reportsJsUrl: ResourceUrl;
  public readonly viewerJsUrl: ResourceUrl;
  public readonly options: IStimulsoftConfig['options'];
  public readonly fonts: IStimulsoftConfig['fonts'];
  public readonly baseUrl: string | undefined;
  public readonly localizationFile: string | undefined;

  constructor(@Inject(config) public readonly stimulsoftConfig: IStimulsoftConfig) {
    const { designerCssUrl, viewerCssUrl, designerJsUrl, reportsJsUrl, viewerJsUrl, options, fonts, baseUrl, localizationFile } =
      stimulsoftConfig;

    this.designerCssUrl = designerCssUrl || initialStimulsoftConfig.designerCssUrl;
    this.viewerCssUrl = viewerCssUrl || initialStimulsoftConfig.viewerCssUrl;
    this.designerJsUrl = designerJsUrl || initialStimulsoftConfig.designerJsUrl;
    this.reportsJsUrl = reportsJsUrl || initialStimulsoftConfig.reportsJsUrl;
    this.viewerJsUrl = viewerJsUrl || initialStimulsoftConfig.viewerJsUrl;
    this.localizationFile = localizationFile;
    this.options = options;
    this.fonts = fonts;
    this.baseUrl = baseUrl;
  }

  public get stimulsoftSourceStore(): ISource[] {
    const { STYLE, SCRIPT } = SourceType;
    return (
      [
        [StimulsoftSourceName.STIMULSOFT_DESIGNER, this.designerJsUrl, SCRIPT],
        [StimulsoftSourceName.STIMULSOFT_REPORTER, this.reportsJsUrl, SCRIPT],
        [StimulsoftSourceName.STIMULSOFT_VIEWER, this.viewerJsUrl, SCRIPT],
        [StimulsoftSourceName.CSS_STIMULSOFT_DESIGNER, this.designerCssUrl, STYLE],
        [StimulsoftSourceName.CSS_STIMULSOFT_VIEWER, this.viewerCssUrl, STYLE],
      ] as Array<[StimulsoftSourceName, ResourceUrl, SourceType]>
    )
      .map(([name, url, type]) => (Array.isArray(url) ? url : [url]).map(u => new Source(name, u, type)))
      .reduce((resources, item) => [...resources, ...item], [] as ISource[]);
  }
}
