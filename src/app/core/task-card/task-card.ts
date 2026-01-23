import { Component, inject, Input, output, signal, ViewChild } from '@angular/core';
import { ModalConfirmationInterface, Task } from '../../interface/task';
import { DatePipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { SharedTaskModule } from '../../shared.module';
import { ChipModule } from 'primeng/chip';
import { PopoverModule } from 'primeng/popover';
import { ModalConfirmationComponent } from '../modal-confirmation/modal-confirmation';
import { TaskService } from '../../services/task-service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ToastService } from '../../services/toast-message-service';

@Component({
  selector: 'app-task-card',
  imports: [
    SharedTaskModule,
    CardModule,
    DatePipe,
    ChipModule,
    PopoverModule,
    ModalConfirmationComponent,
    DragDropModule,
  ],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})
export class TaskCardComponent {
  @Input() lista: Task[] = [];
  @ViewChild('op') op!: any;
  public openModalConfirmation = signal(false);
  public conteudoModal!: ModalConfirmationInterface;

  private id!: number;
  public taskRemoved = output<number>();
  public taskToDone = output<number>();
  private toast = inject(ToastService);

  constructor(private taskService: TaskService) {}

  getPrioridade(prioridade: string): string {
    switch (prioridade) {
      case 'baixa':
        return 'Baixa';
        break;
      case 'media':
        return 'Média';
        break;
      case 'alta':
        return 'Alta';
        break;
      case 'urgente':
        return 'Urgente';
        break;
    }
    return prioridade;
  }

  edit(id: number) {
    console.log('Editar');
    this.op.hide();
  }

  remove(id: number, event: any) {
    this.id = id;
    this.op.hide();

    this.conteudoModal = {
      target: event?.target,
      message: 'Deseja remover essa task ?',
      header: 'Remoção de task',
      rejectLabel: 'Cancelar',
      acceptLabel: 'Deletar',
      icon: 'pi pi-info-circle',
    };
    this.openModalConfirmation.set(true);
  }

  deleteTask() {
    this.taskService.deleteTask(this.id).subscribe({
      next: (data) => {
        this.toast.success(`Task ${this.id} removida com sucesso.`);
        this.taskRemoved.emit(this.id);
      },
      error: (err) => {
        console.error('Erro ao deletar task', err);
        this.toast.error('Erro ao deletar task.');
      },
    });
  }

  actionReceived(event: string) {
    if (event == 'sucess') {
      this.deleteTask();
    }
    this.openModalConfirmation.set(false);
  }

  moveToDone(id: number) {
    this.taskToDone.emit(id);
  }
}
