import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay, withIncrementalHydration } from '@angular/platform-browser';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading } from '@angular/router';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { FIREBASE_CONFIG } from './app.constants';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideClientHydration(
      withEventReplay(),
      withIncrementalHydration(),
    ),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withPreloading(PreloadAllModules),
    ),
    provideHttpClient(withFetch()),
    provideFirebaseApp(() => initializeApp(FIREBASE_CONFIG)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
