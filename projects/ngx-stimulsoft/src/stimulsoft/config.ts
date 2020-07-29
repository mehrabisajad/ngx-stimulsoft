import { InjectionToken } from '@angular/core';

export interface IStimulsoftConfig {
  stimulsoftDesignerCssUrl: string;
  stimulsoftDesignerJsUrl: string;
  stimulsoftReportsJsUrl: string;
  stimulsoftViewerCssUrl: string;
  stimulsoftViewerJsUrl: string;
}

export type OptionsConfig = Partial<IStimulsoftConfig>;
export const config: InjectionToken<IStimulsoftConfig> = new InjectionToken('config');
export const NEW_CONFIG: InjectionToken<IStimulsoftConfig> = new InjectionToken('NEW_CONFIG');
export const INITIAL_CONFIG: InjectionToken<IStimulsoftConfig> = new InjectionToken('INITIAL_CONFIG');

export const initialStimulsoftConfig: IStimulsoftConfig = {
  stimulsoftDesignerCssUrl: '/content/css/stimulsoft.designer.office2013.whiteblue.css',
  stimulsoftDesignerJsUrl: '/content/js/stimulsoft.designer.js',
  stimulsoftReportsJsUrl: '/content/js/stimulsoft.reports.js',
  stimulsoftViewerCssUrl: '/content/css/stimulsoft.viewer.office2013.whiteblue.css',
  stimulsoftViewerJsUrl: '/content/js/stimulsoft.viewer.js',
};
