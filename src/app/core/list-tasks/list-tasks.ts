import { Component, signal, inject, computed } from '@angular/core';
import { MessageEdit, Task } from '../../interface/task';
import { TaskService } from '../../services/task-service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { ColumnKanbanComponent } from '../column-kanban/column-kanban';
import { ButtonModule } from 'primeng/button';
import { FiltersComponent } from '../filters/filters';
import { TaskStateService } from '../../services/task-state';
import { UrgentTasksBadgeComponent } from '../urgent-tasks-badge/urgent-tasks-badge';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { FormTasksComponent } from '../form-tasks/form-tasks';
import { LogService } from '../../services/log-service';

@Component({
  selector: 'app-list-tasks',
  standalone: true,
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    ButtonModule,
    ColumnKanbanComponent,
    FiltersComponent,
    UrgentTasksBadgeComponent,
    Drawer,
    DrawerModule,
    FormTasksComponent,
  ],
  templateUrl: './list-tasks.html',
  styleUrl: './list-tasks.css',
})
export class ListTasksComponent {
  private taskService = inject(TaskService);
  private taskState = inject(TaskStateService);

  public loading = signal(true);

  public tasks = this.taskState.filteredTasks;

  public todo = computed(() => this.tasks().filter((t) => t.status === 'a-fazer'));

  public inProgress = computed(() => this.tasks().filter((t) => t.status === 'em-andamento'));

  public done = computed(() => this.tasks().filter((t) => t.status === 'concluido'));

  public openDrawer: boolean = false;
  public titleDrawer: string = '';
  public taskSelecionada: Task | null = null;

  constructor(private logService: LogService) {
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
        this.logService.log('Erro ao carregar listagem de tarefas',  'error');
      },
    });
  }

  private editTask(task: Task, messageToast: string) {
    this.taskService.editTask(<number>task?.id, task).subscribe({
      next: (data) => {
        this.taskState.tasks.set(this.taskState.tasks().map((t) => (t.id === task.id ? task : t)));
        this.logService.log(messageToast, 'success');
      },
      error: (err) => {
        this.logService.log(`Erro ao editar task [ID: ${task?.id}]`,  'error');
      },
    });
  }

  public onTaskMoviment(data: MessageEdit) {
    this.editTask(data?.task, data?.message);
  }

  public openDrawerTask(title?: string) {
    this.openDrawer = !this.openDrawer;
    if (title && this.openDrawer) {
      this.titleDrawer = title;

      if (title == 'Nova task') {
        this.taskSelecionada = null;
      }
    }
  }

  public onTaskToEdit(task: Task) {
    this.taskSelecionada = task;
    this.openDrawerTask('Editar task');
  }
}
