import { InjectionToken } from '@angular/core';

export interface IStimulsoftOption {
  appearance?: {
    rightToLeft?: boolean;
    fullScreenMode?: boolean;
    scrollbarsMode?: boolean;
    openLinksWindow?: string;
    openExportedReportWindow?: string;
    showTooltips?: boolean;
    showTooltipsHelp?: boolean;
    pageAlignment?: number;
    showPageShadow?: boolean;
    bookmarksPrint?: boolean;
    bookmarksTreeWidth?: number;
    parametersPanelPosition?: number;
    parametersPanelMaxHeight?: number;
    parametersPanelColumnsCount?: number;
    parametersPanelDateFormat?: string;
    interfaceType?: number;
    chartRenderType?: number;
    reportDisplayMode?: number;
    datePickerFirstDayOfWeek?: number;
    allowTouchZoom?: boolean;
    htmlRenderMode?: number;
  };
  exports?: {
    storeExportSettings?: boolean;
    showExportDialog?: boolean;
    showExportToDocument?: boolean;
    showExportToPdf?: boolean;
    showExportToXps?: boolean;
    showExportToPowerPoint?: boolean;
    showExportToHtml?: boolean;
    showExportToHtml5?: boolean;
    showExportToMht?: boolean;
    showExportToText?: boolean;
    showExportToRtf?: boolean;
    showExportToWord2007?: boolean;
    showExportToOpenDocumentWriter?: boolean;
    showExportToExcel?: boolean;
    showExportToExcelXml?: boolean;
    showExportToExcel2007?: boolean;
    showExportToOpenDocumentCalc?: boolean;
    showExportToCsv?: boolean;
    showExportToDbf?: boolean;
    showExportToXml?: boolean;
    showExportToDif?: boolean;
    showExportToSylk?: boolean;
    showExportToImageBmp?: boolean;
    showExportToImageGif?: boolean;
    showExportToImageJpeg?: boolean;
    showExportToImagePcx?: boolean;
    showExportToImagePng?: boolean;
    showExportToImageTiff?: boolean;
    showExportToImageMetafile?: boolean;
    showExportToImageSvg?: boolean;
    showExportToImageSvgz?: boolean;
  };
  toolbar?: {
    visible?: boolean;
    displayMode?: number;
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
    showEditorButton?: boolean;
    showFullScreenButton?: boolean;
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

  width?: string;
  height?: string;
  viewerId?: string;
  reportDesignerMode?: false;
}

export interface IStimulsoftConfig {
  baseUrl?: string;
  stimulsoftDesignerCssUrl: string;
  stimulsoftDesignerJsUrl: string;
  stimulsoftReportsJsUrl: string;
  stimulsoftViewerCssUrl: string;
  stimulsoftViewerJsUrl: string;
  fonts?: object;
  options?: IStimulsoftOption;
}

export type OptionsConfig = Partial<IStimulsoftConfig>;
export const config: InjectionToken<IStimulsoftConfig> = new InjectionToken('config');
export const NEW_CONFIG: InjectionToken<IStimulsoftConfig> = new InjectionToken('NEW_CONFIG');
export const INITIAL_CONFIG: InjectionToken<IStimulsoftConfig> = new InjectionToken('INITIAL_CONFIG');

export const initialStimulsoftConfig: IStimulsoftConfig = {
  baseUrl: '',
  stimulsoftDesignerCssUrl: '/content/css/stimulsoft.designer.office2013.whiteblue.css',
  stimulsoftDesignerJsUrl: '/content/js/stimulsoft.designer.js',
  stimulsoftReportsJsUrl: '/content/js/stimulsoft.reports.js',
  stimulsoftViewerCssUrl: '/content/css/stimulsoft.viewer.office2013.whiteblue.css',
  stimulsoftViewerJsUrl: '/content/js/stimulsoft.viewer.js',
};
