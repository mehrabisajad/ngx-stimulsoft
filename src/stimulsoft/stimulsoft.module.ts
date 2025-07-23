import { ModuleWithProviders, NgModule } from '@angular/core';
import { OptionsConfig } from './config';
import { provideStimulsoft } from './stimulsoft.provider';

@NgModule({
  declarations: [],
  exports: [],
  providers: [],
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
