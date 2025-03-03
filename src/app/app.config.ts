import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, PreloadAllModules, withPreloading } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes, withPreloading(PreloadAllModules))]
};
