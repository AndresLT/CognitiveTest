import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { usersReducer } from './shared/ngrx/users/state/user.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideToastr({
        closeButton: true,
        newestOnTop: true,
        progressBar: true,
        preventDuplicates: true,
        countDuplicates: true,
        resetTimeoutOnDuplicate: true,
        includeTitleDuplicates: true,
        positionClass: 'toast-bottom-center'
    }),
    provideStore(),
    provideEffects(),
    provideStore({
      users: usersReducer
    }),
    provideEffects([
      
    ]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
