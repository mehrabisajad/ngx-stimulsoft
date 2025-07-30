import { InjectionToken } from '@angular/core';

export interface IStimulsoftOption {
  appearance?: {
    backgroundColor?: any;
    pageBorderColor?: any;
    rightToLeft?: boolean;
    fullScreenMode?: boolean;
    scrollbarsMode?: boolean;
    openLinksWindow?: string;
    openExportedReportWindow?: string;
    showTooltips?: boolean;
    showTooltipsHelp?: boolean;
    showDialogsHelp?: boolean;
    pageAlignment?: number;
    showPageShadow?: boolean;
    bookmarksPrint?: boolean;
    bookmarksTreeWidth?: number;
    parametersPanelPosition?: number;
    parametersPanelMaxHeight?: number;
    parametersPanelColumnsCount?: number;
    parametersPanelDateFormat?: string;
    parametersPanelSortDataItems?: boolean;
    interfaceType?: number;
    chartRenderType?: number;
    reportDisplayMode?: number;
    datePickerFirstDayOfWeek?: number;
    datePickerIncludeCurrentDayForRanges?: boolean;
    allowTouchZoom?: boolean;
    allowMobileMode?: boolean;
    combineReportPages?: boolean;
    htmlRenderMode?: number;
    theme?: number;
  };
  exports?: {
    storeExportSettings?: boolean;
    showExportDialog?: boolean;
    showExportToDocument?: boolean;
    showExportToPdf?: boolean;
    showExportToHtml?: boolean;
    showExportToHtml5?: boolean;
    showExportToWord2007?: boolean;
    showExportToExcel2007?: boolean;
    showExportToCsv?: boolean;
    showExportToJson?: boolean;
    showExportToText?: boolean;
    showExportToOpenDocumentWriter?: boolean;
    showExportToOpenDocumentCalc?: boolean;
    showExportToPowerPoint?: boolean;
    showExportToImageSvg?: boolean;
    showExportToXps?: boolean;
  };
  toolbar?: {
    visible?: boolean;
    displayMode?: number;
    backgroundColor?: any;
    borderColor?: any;
    fontColor?: any;
    fontFamily?: string;
    alignment?: number;
    showButtonCaptions?: boolean;
    showPrintButton?: boolean;
    showOpenButton?: boolean;
    showSaveButton?: boolean;
    showSendEmailButton?: boolean;
    showFindButton?: boolean;
    showBookmarksButton?: boolean;
    showParametersButton?: boolean;
    showResourcesButton?: boolean;
    showEditorButton?: boolean;
    showFullScreenButton?: boolean;
    showRefreshButton?: boolean;
    showFirstPageButton?: boolean;
    showPreviousPageButton?: boolean;
    showCurrentPageControl?: boolean;
    showNextPageButton?: boolean;
    showLastPageButton?: boolean;
    showZoomButton?: boolean;
    showViewModeButton?: boolean;
    showDesignButton?: boolean;
    showAboutButton?: boolean;
    showPinToolbarButton?: boolean;
    printDestination?: number;
    viewMode?: number;
    multiPageWidthCount?: number;
    multiPageHeightCount?: number;
    _zoom?: number;
    menuAnimation?: boolean;
    showMenuMode?: number;
    autoHide?: boolean;
  };
  email?: {
    showEmailDialog?: boolean;
    showExportDialog?: boolean;
    defaultEmailAddress?: string;
    defaultEmailSubject?: string;
    defaultEmailMessage?: string;
  };
  width?: string;
  height?: string;
  viewerId?: string;
  reportDesignerMode?: false;
}

export type ResourceUrl = string | string[];

export interface IStimulsoftConfig {
  baseUrl?: string;
  designerCssUrl?: ResourceUrl;
  designerJsUrl: ResourceUrl;
  reportsJsUrl: ResourceUrl;
  viewerCssUrl?: ResourceUrl;
  viewerJsUrl: ResourceUrl;
  localizationPath?: string;
  fonts?: Record<string, string>;
  options?: IStimulsoftOption;
  licenseKey?: string;
  licenseFile?: string;
}

export type OptionsConfig = Partial<IStimulsoftConfig>;
export const config: InjectionToken<IStimulsoftConfig> = new InjectionToken('config');
export const NEW_CONFIG: InjectionToken<IStimulsoftConfig> = new InjectionToken('NEW_CONFIG');
export const INITIAL_CONFIG: InjectionToken<IStimulsoftConfig> = new InjectionToken('INITIAL_CONFIG');

export const initialStimulsoftConfig: IStimulsoftConfig = {
  baseUrl: '',
  designerJsUrl: '/content/js/stimulsoft.designer.js',
  reportsJsUrl: '/content/js/stimulsoft.reports.js',
  viewerJsUrl: '/content/js/stimulsoft.viewer.js',
};
