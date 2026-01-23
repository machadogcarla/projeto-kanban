import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { ConfirmationService, MessageService } from 'primeng/api';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { erroInterceptor } from './app/interceptors/erro-interceptor';

registerLocaleData(localePt);

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    MessageService,
    ConfirmationService,
    provideHttpClient(withInterceptors([erroInterceptor])),
  ],
}).catch((err) => console.error(err));
