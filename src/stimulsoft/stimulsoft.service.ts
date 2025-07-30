import { Inject, Injectable } from '@angular/core';
import { ISource, Source, SourceType } from 'ngx-source';
import { config, initialStimulsoftConfig, IStimulsoftConfig, ResourceUrl } from './config';
import { StimulsoftSourceName } from './stimulsoft-source-name.model';

@Injectable()
export class StimulsoftService {
  public readonly designerCssUrl?: ResourceUrl;
  public readonly viewerCssUrl?: ResourceUrl;
  public readonly designerJsUrl: ResourceUrl;
  public readonly reportsJsUrl: ResourceUrl;
  public readonly viewerJsUrl: ResourceUrl;
  public readonly options: IStimulsoftConfig['options'];
  public readonly fonts: IStimulsoftConfig['fonts'];
  public readonly baseUrl: string | undefined;
  public readonly localizationPath: string | undefined;

  constructor(@Inject(config) public readonly stimulsoftConfig: IStimulsoftConfig) {
    const { designerCssUrl, viewerCssUrl, designerJsUrl, reportsJsUrl, viewerJsUrl, options, fonts, baseUrl, localizationPath } =
      stimulsoftConfig;

    this.designerCssUrl = designerCssUrl;
    this.viewerCssUrl = viewerCssUrl;
    this.designerJsUrl = designerJsUrl || initialStimulsoftConfig.designerJsUrl;
    this.reportsJsUrl = reportsJsUrl || initialStimulsoftConfig.reportsJsUrl;
    this.viewerJsUrl = viewerJsUrl || initialStimulsoftConfig.viewerJsUrl;
    this.localizationPath = localizationPath;
    this.options = options;
    this.fonts = fonts;
    this.baseUrl = baseUrl;
  }

  public get stimulsoftSourceStore(): ISource[] {
    const { STYLE, SCRIPT } = SourceType;
    const sources: Array<[StimulsoftSourceName, ResourceUrl, SourceType]> = [
      [StimulsoftSourceName.DESIGNER_SCRIPT, this.designerJsUrl, SCRIPT],
      [StimulsoftSourceName.REPORTER_SCRIPT, this.reportsJsUrl, SCRIPT],
      [StimulsoftSourceName.VIEWER_SCRIPT, this.viewerJsUrl, SCRIPT],
    ];
    if (this.designerCssUrl) {
      sources.push([StimulsoftSourceName.DESIGNER_STYLE, this.designerCssUrl, STYLE]);
    }
    if (this.viewerCssUrl) {
      sources.push([StimulsoftSourceName.VIEWER_STYLE, this.viewerCssUrl, STYLE]);
    }
    return sources
      .map(([name, url, type]) => (Array.isArray(url) ? url : [url]).map(u => new Source(name, u, type)))
      .reduce((resources, item) => [...resources, ...item], [] as ISource[]);
  }
}
