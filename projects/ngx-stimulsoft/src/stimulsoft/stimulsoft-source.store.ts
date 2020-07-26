import {ISource, Source, SourceType} from 'ngx-source';
import {StimulsoftSourceName} from './stimulsoft-source-name.model';

export const DefaultStimulantSourceStore: ISource[] = [
  new Source(StimulsoftSourceName.STIMULSOFT_DESIGNER,
    '/content/js/stimulsoft.designer.js',
    SourceType.SCRIPT),

  new Source(StimulsoftSourceName.STIMULSOFT_REPORTER,
    '/content/js/stimulsoft.reports.js',
    SourceType.SCRIPT),

  new Source(StimulsoftSourceName.STIMULSOFT_VIEWER,
    '/content/js/stimulsoft.viewer.js',
    SourceType.SCRIPT),

  new Source(
    StimulsoftSourceName.CSS_STIMULSOFT_DESIGNER,
    '/content/css/stimulsoft.designer.office2013.whiteblue.css',
    SourceType.STYLE,
  ),
  new Source(
    StimulsoftSourceName.CSS_STIMULSOFT_VIEWER,
    '/content/css/stimulsoft.viewer.office2013.whiteblue.css',
    SourceType.STYLE),

];
