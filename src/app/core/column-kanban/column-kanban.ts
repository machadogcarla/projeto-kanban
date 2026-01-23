import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, Input, output } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card';
import { Task } from '../../interface/task';

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

  dropped = output<CdkDragDrop<Task[]>>();
  taskRemoved = output<number>();
  taskToDone = output<Task>();
  taskEdit = output<Task>();

  drop(event: CdkDragDrop<Task[]>) {
    this.dropped.emit(event);
  }
}
