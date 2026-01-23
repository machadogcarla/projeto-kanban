import { Component, inject, Input, OnInit, output, Output } from '@angular/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService } from 'primeng/api';
import { ModalConfirmationInterface } from '../../interface/task';

@Component({
  selector: 'app-modal-confirmation',
  imports: [ToastModule, ConfirmDialogModule],
  templateUrl: './modal-confirmation.html',
  styleUrl: './modal-confirmation.css',
})
export class ModalConfirmationComponent implements OnInit {
  @Input() conteudoModal!: ModalConfirmationInterface;
  actionReceived = output<string>();

  private confirmationService = inject(ConfirmationService);

  ngOnInit(): void {
    this.confirmationService.confirm({
      target: this.conteudoModal?.target,
      message: this.conteudoModal?.message,
      header: this.conteudoModal?.header,
      icon: this.conteudoModal?.icon,
      rejectLabel: this.conteudoModal?.rejectLabel,
      rejectButtonProps: {
        label: this.conteudoModal?.rejectLabel,
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: this.conteudoModal?.acceptLabel,
        severity: 'danger',
      },

      accept: () => {
        this.actionReceived.emit('sucess');
      },
      reject: () => {
        this.actionReceived.emit('fail');
      },
    });
  }
}
