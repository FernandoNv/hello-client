import {
  ApplicationConfig,
  importProvidersFrom,
  LOCALE_ID,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideTranslations } from './translate-loader';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import MockData from './core/db/mock-data';
import { registerLocaleData } from '@angular/common';

import localePt from '@angular/common/locales/pt';
import localeEn from '@angular/common/locales/en';

registerLocaleData(localePt);
registerLocaleData(localeEn);

const browserLang = navigator.language.startsWith('pt') ? 'pt' : 'en';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(
      InMemoryWebApiModule.forRoot(MockData, { delay: 600, passThruUnknownUrl: true }),
    ),
    provideAnimationsAsync(),
    ...provideTranslations(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.dark',
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng',
          },
        },
      },
    }),
    {
      provide: LOCALE_ID,
      useValue: browserLang,
    },
  ],
};
