import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { ConfirmationService, MessageService } from 'primeng/api';

registerLocaleData(localePt);

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    MessageService,
    ConfirmationService
  ]
}).catch(err => console.error(err));
