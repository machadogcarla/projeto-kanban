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
import { TagModule } from 'primeng/tag';
import { LogService } from '../../services/log-service';

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
    TagModule,
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
  public taskToDone = output<Task>();
  public taskEdit = output<Task>();

  constructor(
    private taskService: TaskService,
    private logService: LogService,
  ) {}

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

  edit(task: Task) {
    this.op.hide();
    this.taskEdit.emit(task);
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
        this.logService.log(`Task [ID: ${this.id}; removida com sucesso.`, 'success');

        this.taskRemoved.emit(this.id);
      },
      error: (err) => {
        this.logService.log(`Erro ao deletar task. [ID: ${this.id};`, 'error');
      },
    });
  }

  actionReceived(event: string) {
    if (event == 'sucess') {
      this.deleteTask();
    }
    this.openModalConfirmation.set(false);
  }

  moveToDone(task: Task) {
    this.taskToDone.emit(task);
  }
}
