import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private messageService = inject(MessageService);

  success(detail: string, summary = 'Sucesso') {
    this.messageService.add({
      severity: 'success',
      summary,
      detail
    });
  }

  error(detail: string, summary = 'Erro') {
    this.messageService.add({
      severity: 'error',
      summary,
      detail
    });
  }

  warn(detail: string, summary = 'Atenção') {
    this.messageService.add({
      severity: 'warn',
      summary,
      detail
    });
  }

  info(detail: string, summary = 'Info') {
    this.messageService.add({
      severity: 'info',
      summary,
      detail
    });
  }
}
