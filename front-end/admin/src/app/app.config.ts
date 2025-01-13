import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideHttpClient} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import {VERSION as MAT_VERSION, MatNativeDateModule} from '@angular/material/core';
import {VERSION as CDK_VERSION} from '@angular/cdk';
console.info('Angular CDK version', CDK_VERSION.full);
console.info('Angular Material version', MAT_VERSION.full);
export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom(MatNativeDateModule),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)]
};
