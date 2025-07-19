import { config, INITIAL_CONFIG, initialStimulsoftConfig, NEW_CONFIG, OptionsConfig } from './config';
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { StimulsoftService } from './stimulsoft.service';

function configFactory(initConfig: OptionsConfig, configValue?: OptionsConfig | (() => OptionsConfig)): OptionsConfig {
  return {
    ...initConfig,
    ...(typeof configValue === 'function' ? configValue() : (configValue ?? {})),
  };
}

export function provideStimulsoft(configValue?: OptionsConfig | (() => OptionsConfig)): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: NEW_CONFIG, useValue: configValue },
    { provide: INITIAL_CONFIG, useValue: initialStimulsoftConfig },
    {
      provide: config,
      useFactory: configFactory,
      deps: [INITIAL_CONFIG, NEW_CONFIG],
    },
    StimulsoftService,
  ]);
}
