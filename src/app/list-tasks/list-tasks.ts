import { Component, signal, inject, computed } from '@angular/core';
import { Task } from '../interface/task';
import { TaskService } from '../services/task-service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ColumnKanban } from '../column-kanban/column-kanban';
import { ButtonModule } from 'primeng/button';
import { Filters } from '../core/filters/filters';
import { TaskStateService } from '../services/task-state';

@Component({
  selector: 'app-list-tasks',
  standalone: true,
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    PanelModule,
    DragDropModule,
    ColumnKanban,
    ButtonModule,
    Filters,
  ],
  templateUrl: './list-tasks.html',
  styleUrl: './list-tasks.css',
})
export class ListTasks {
  private taskService = inject(TaskService);
  private taskState = inject(TaskStateService);

  public loading = signal(true);

  public tasks = this.taskState.filteredTasks;

  public todo = computed(() => this.tasks().filter((t) => t.status === 'a-fazer'));

  public inProgress = computed(() => this.tasks().filter((t) => t.status === 'em-andamento'));

  public done = computed(() => this.tasks().filter((t) => t.status === 'concluido'));

  constructor() {
    this.carregarTarefas();
  }

  private carregarTarefas() {
    this.loading.set(true);

    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.taskState.tasks.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erro ao carregar tarefas', err);
        this.loading.set(false);
      },
    });
  }

  onTaskRemoved(id: number) {
    this.taskState.tasks.set(this.taskState.tasks().filter((t) => t.id !== id));
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      const task = event.container.data[event.currentIndex];
      task.status = event.container.id;

      this.taskState.tasks.set(
        this.taskState.tasks().map((t) => (t.id === task.id ? { ...task } : t)),
      );

      this.editTask(task);
    }
  }

  private editTask(task: Task, id?: number) {
    this.taskService.editTask(task.id, task).subscribe({
      next: (data) => {
        console.log(data);
        console.log(this.tasks());
        this.taskState.tasks.set(this.taskState.tasks().map((t) => (t.id === task.id ? task : t)));
      },
      error: (err) => {
        console.error('Erro ao editar tarefas', err);
      },
    });
  }

  public onTaskToDone(id: number) {
    this.taskState.tasks.set(
      this.taskState.tasks().map((t) => (t.id === id ? { ...t, status: 'concluido' } : t)),
    );
  }
}
