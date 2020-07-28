import {NgModule} from '@angular/core';
import {StimulsoftDesignerComponent} from './stimulsoft-designer.component';
import {StimulsoftViewerComponent} from './stimulsoft-viewer.component';

@NgModule({
  declarations: [StimulsoftDesignerComponent, StimulsoftViewerComponent],
  entryComponents: [StimulsoftDesignerComponent, StimulsoftViewerComponent],
  exports: [StimulsoftDesignerComponent, StimulsoftViewerComponent],
})
export class NgxStimulsoftModule {
}
