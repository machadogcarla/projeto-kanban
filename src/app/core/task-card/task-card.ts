import { Component, Input } from '@angular/core';
import { Task } from '../../interface/task';
import { CdkDragDrop, DragDropModule, transferArrayItem } from '@angular/cdk/drag-drop';
import { DatePipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { SharedTaskModule } from '../../shared.module';

@Component({
  selector: 'app-task-card',
  imports: [SharedTaskModule, DragDropModule, CardModule, DatePipe],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})
export class TaskCard {

  @Input() lista: Task[]  = [];

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      const tarefa = event.container.data[event.currentIndex];
      tarefa.status = event.container.id;

      // this.tarefaService.editTarefa(tarefa.id, tarefa).subscribe();
    }
  }
}
