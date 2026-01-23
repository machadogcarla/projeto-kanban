import { inject, Injectable } from '@angular/core';
import { ToastService } from './toast-message-service';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  private toast = inject(ToastService);

  log(message: string, summary: string) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      message,
    };
    console.log('[LOG]', logEntry);

    if (summary == 'success') {
      this.success(message);
    } else if(summary == 'error') {
      this.error(message);
    }
  }

  success(message: string) {
    this.toast.success(message);
  }

  error(message: string) {
    this.toast.error(message);
  }
}
