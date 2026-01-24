import { CdkDragDrop, DragDropModule, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, Input, output } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card';
import { MessageEdit, Task } from '../../interface/task';

@Component({
  selector: 'app-column-kanban',
  imports: [CommonModule, DragDropModule, TaskCardComponent],
  templateUrl: './column-kanban.html',
  styleUrl: './column-kanban.css',
})
export class ColumnKanbanComponent {
  @Input() titulo!: string;
  @Input() status!: string;
  @Input() lista: Task[] = [];
  @Input() statusList: string[] = [];

  taskEdit = output<Task>();
  taskMoviment = output<MessageEdit>();

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      const previousStatus = event.container.data[event.currentIndex].status;
      const task = event.container.data[event.currentIndex];
      task.status = event.container.id;

      this.taskMoviment.emit({
        task: task,
        message: `Task [ID: ${task.id}] movida de ${this.getLabelStatus(previousStatus)} para ${this.getLabelStatus(task.status)} com sucesso.`,
      });
    }
  }

  getLabelStatus(status: string): string {
    switch (status) {
      case 'a-fazer':
        return 'A fazer';
        break;
      case 'em-andamento':
        return 'Em andamento';
        break;
      case 'concluido':
        return 'Concluído';
        break;
    }

    return '';
  }
  
}
