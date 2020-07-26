import {ModuleWithProviders, NgModule} from '@angular/core';
import {ISource, NgxSourceService} from 'ngx-source';
import {StimulsoftDesignerComponent} from './stimulsoft-designer.component';
import {DefaultStimulantSourceStore} from './stimulsoft-source.store';

@NgModule({
  declarations: [StimulsoftDesignerComponent],
  entryComponents: [StimulsoftDesignerComponent],
  exports: [StimulsoftDesignerComponent],
})
export class NgxStimulsoftModule {

  constructor(private sourceService: NgxSourceService) {

  }
}
