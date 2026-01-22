import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { TaskCard } from '../core/task-card/task-card';
import { Task } from '../interface/task';
import { TaskService } from '../services/task-service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-list-tasks',
  standalone: true,
  imports: [CommonModule, TaskCard, ProgressSpinnerModule, PanelModule],
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
}
