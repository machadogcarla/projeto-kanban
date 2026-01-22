import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { TaskCard } from '../core/task-card/task-card';
import { Task } from '../interface/task';
import { TaskService } from '../services/task-service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-list-tasks',
  standalone: true,
  imports: [CommonModule, TaskCard, ProgressSpinnerModule, PanelModule, DragDropModule],
  templateUrl: './list-tasks.html',
  styleUrl: './list-tasks.css',
})
export class ListTasks {
  private taskService = inject(TaskService);

  // Usar Signals para estado reativo
  public loading = signal(true);
  public tasks = signal<Task[]>([]);
  public todo = signal<Task[]>([]);
  public inProgress = signal<Task[]>([]);
  public done = signal<Task[]>([]);

  constructor() {
    this.carregarTarefas();
  }

  private carregarTarefas() {
    this.loading.set(true);

    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks.set(data);
        this.todo.set(data.filter((t) => t.status === 'a-fazer'));
        this.inProgress.set(data.filter((t) => t.status === 'em-andamento'));
        this.done.set(data.filter((t) => t.status === 'concluido'));
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erro ao carregar tarefas', err);
        this.loading.set(false);
      },
    });
  }

  onTaskRemoved(id: number) {
    const updated = this.tasks().filter((t) => t.id !== id);

    this.tasks.set(updated);
    this.todo.set(updated.filter((t) => t.status === 'a-fazer'));
    this.inProgress.set(updated.filter((t) => t.status === 'em-andamento'));
    this.done.set(updated.filter((t) => t.status === 'concluido'));
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

      this.taskService.editTask(task.id, task).subscribe({
        next: (data) => {
          console.log(data);
          console.log(this.tasks());
          
        },
        error: (err) => {
          console.error('Erro ao editar tarefas', err);
        },
      });
    }
  }
}
