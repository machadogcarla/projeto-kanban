import { Component, signal, inject, computed } from '@angular/core';
import { Task } from '../../interface/task';
import { TaskService } from '../../services/task-service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ColumnKanbanComponent } from '../column-kanban/column-kanban';
import { ButtonModule } from 'primeng/button';
import { FiltersComponent } from '../filters/filters';
import { TaskStateService } from '../../services/task-state';
import { ToastService } from '../../services/toast-message-service';
import { UrgentTasksBadgeComponent } from '../urgent-tasks-badge/urgent-tasks-badge';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { FormTasksComponent } from '../form-tasks/form-tasks';

@Component({
  selector: 'app-list-tasks',
  standalone: true,
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    PanelModule,
    DragDropModule,
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
  private toast = inject(ToastService);

  public loading = signal(true);

  public tasks = this.taskState.filteredTasks;

  public todo = computed(() => this.tasks().filter((t) => t.status === 'a-fazer'));

  public inProgress = computed(() => this.tasks().filter((t) => t.status === 'em-andamento'));

  public done = computed(() => this.tasks().filter((t) => t.status === 'concluido'));

  public openDrawer: boolean = false;
  public titleDrawer: string = '';
  public taskSelecionada: Task | null = null;

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

      const previousStatus = event.container.data[event.currentIndex].status;
      const task = event.container.data[event.currentIndex];
      task.status = event.container.id;

      this.editTask(
        task,
        `Task ${task.id} movida de ${this.getLabelStatus(previousStatus)} para ${this.getLabelStatus(task.status)} com sucesso.`,
      );
    }
  }

  private editTask(task: Task, messageToast: string) {
    this.taskService.editTask(<number>task?.id, task).subscribe({
      next: (data) => {
        console.log(task);
        console.log(this.tasks());

        this.taskState.tasks.set(this.taskState.tasks().map((t) => (t.id === task.id ? task : t)));

        this.toast.success(messageToast);
      },
      error: (err) => {
        console.error('Erro ao editar task', err);
        this.toast.error('Erro ao editar task.');
      },
    });
  }

  public onTaskToDone(task: Task) {
    this.taskState.tasks.set(
      this.taskState.tasks().map((t) => (t.id === task?.id ? { ...t, status: 'concluido' } : t)),
    );
    this.editTask(task, `Task ${task?.id} movida para concluído.`);
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

  getLabelStatus(status: string) : string{
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
