import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { authFeature } from './core/state/auth/auth.reducer';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './core/state/auth/auth.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { RoomEffects } from './core/room/room.effects';
import { roomFeature } from './core/room/room.reducer';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),

    provideStore({
      [authFeature.name]: authFeature.reducer,
      [roomFeature.name]:roomFeature.reducer
    }),

    provideEffects(AuthEffects,RoomEffects),

    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode()
    })
  ]
};
