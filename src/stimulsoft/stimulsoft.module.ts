import { ModuleWithProviders, NgModule } from '@angular/core';
import { config, INITIAL_CONFIG, initialStimulsoftConfig, NEW_CONFIG, OptionsConfig } from './config';
import { StimulsoftDesignerComponent } from './stimulsoft-designer.component';
import { StimulsoftViewerComponent } from './stimulsoft-viewer.component';
import { StimulsoftService } from './stimulsoft.service';

@NgModule({
  declarations: [StimulsoftDesignerComponent, StimulsoftViewerComponent],
  exports: [StimulsoftDesignerComponent, StimulsoftViewerComponent],
})
export class NgxStimulsoftModule {
  public static forRoot(configValue?: OptionsConfig | (() => OptionsConfig)): ModuleWithProviders<NgxStimulsoftModule> {
    return {
      ngModule: NgxStimulsoftModule,
      providers: [
        {
          provide: NEW_CONFIG,
          useValue: configValue,
        },
        {
          provide: INITIAL_CONFIG,
          useValue: initialStimulsoftConfig,
        },
        {
          deps: [INITIAL_CONFIG, NEW_CONFIG],
          provide: config,
          useFactory: configFactory,
        },
        StimulsoftService,
      ],
    };
  }

  public static forChild(): ModuleWithProviders<NgxStimulsoftModule> {
    return {
      ngModule: NgxStimulsoftModule,
    };
  }
}

export function configFactory(initConfig: OptionsConfig, configValue: OptionsConfig | (() => OptionsConfig)): OptionsConfig {
  return configValue instanceof Function ? { ...initConfig, ...configValue() } : { ...initConfig, ...configValue };
}
