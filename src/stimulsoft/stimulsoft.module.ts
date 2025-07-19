import { ModuleWithProviders, NgModule } from '@angular/core';
import { OptionsConfig } from './config';
import { StimulsoftDesignerComponent } from './stimulsoft-designer.component';
import { StimulsoftViewerComponent } from './stimulsoft-viewer.component';
import { provideStimulsoft } from './stimulsoft.provider';

@NgModule({
  declarations: [StimulsoftDesignerComponent, StimulsoftViewerComponent],
  exports: [StimulsoftDesignerComponent, StimulsoftViewerComponent],
})
export class NgxStimulsoftModule {
  static forRoot(configValue?: OptionsConfig | (() => OptionsConfig)): ModuleWithProviders<NgxStimulsoftModule> {
    return {
      ngModule: NgxStimulsoftModule,
      providers: [provideStimulsoft(configValue)],
    };
  }

  static forChild(): ModuleWithProviders<NgxStimulsoftModule> {
    return {
      ngModule: NgxStimulsoftModule,
    };
  }
}
