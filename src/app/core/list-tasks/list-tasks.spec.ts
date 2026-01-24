import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListTasksComponent } from './list-tasks';
import { TaskService } from '../../services/task-service';
import { TaskStateService } from '../../services/task-state';
import { LogService } from '../../services/log-service';
import { of } from 'rxjs';
import { Task } from '../../interface/task';

describe('ListTasksComponent (Signals)', () => {
  let component: ListTasksComponent;
  let fixture: ComponentFixture<ListTasksComponent>;

  const mockTasks: Task[] = [
    {
      id: 1,
      titulo: 'Estudar Angular',
      descricao: 'Estudar Angular',
      prioridade: 'alta',
      prazo: '2025-01-10',
      tags: ['frontend', 'angular'],
      status: 'a-fazer',
    },
    {
      id: 2,
      titulo: 'Aprender Node',
      descricao: 'Estudar Angular',
      prioridade: 'urgente',
      prazo: '2025-01-20',
      tags: ['backend'],
      status: 'em-andamento',
    },
    {
      id: 3,
      titulo: 'Deploy app',
      descricao: 'Estudar Angular',
      prioridade: 'alta',
      prazo: '2025-02-01',
      tags: ['devops'],
      status: 'concluido',
    },
  ];

  const taskServiceMock = {
    getTasks: vi.fn().mockReturnValue(of(mockTasks)),
    editTask: vi.fn().mockReturnValue(of({})),
  };

  const logServiceMock = {
    log: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTasksComponent],
      providers: [
        TaskStateService,
        { provide: TaskService, useValue: taskServiceMock },
        { provide: LogService, useValue: logServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // dispara constructor
  });

  it('deve carregar tarefas e desativar loading', () => {
    expect(taskServiceMock.getTasks).toHaveBeenCalled();
    expect(component.loading()).toBe(false);
  });

  it('deve separar corretamente tarefas por status', () => {
    expect(component.todo().length).toBe(1);
    expect(component.inProgress().length).toBe(1);
    expect(component.done().length).toBe(1);
  });

  it('deve mudar automaticamente quando tasks mudarem', () => {
    const taskState = TestBed.inject(TaskStateService);

    const mockAlterado = [
      {
        id: 1,
        titulo: 'Estudar Angular',
        descricao: 'Estudar Angular',
        prioridade: 'alta',
        prazo: '2025-01-10',
        tags: ['frontend', 'angular'],
        status: 'a-fazer',
      },
      {
        id: 2,
        titulo: 'Aprender Node',
        descricao: 'Estudar Angular',
        prioridade: 'urgente',
        prazo: '2025-01-20',
        tags: ['backend'],
        status: 'a-fazer',
      },
      {
        id: 3,
        titulo: 'Deploy app',
        descricao: 'Estudar Angular',
        prioridade: 'alta',
        prazo: '2025-02-01',
        tags: ['devops'],
        status: 'concluido',
      },
    ];
    taskState.tasks.set(mockAlterado);

    expect(component.todo().length).toBe(2);
    expect(component.inProgress().length).toBe(0);
    expect(component.done().length).toBe(1);
  });

  it('deve abrir drawer para nova task', () => {
    component.openDrawerTask('Nova task');

    expect(component.openDrawer).toBe(true);
    expect(component.taskSelecionada).toBeNull();
  });

  it('deve abrir drawer para edição', () => {
    const task = mockTasks[0];
    component.onTaskToEdit(task);

    expect(component.openDrawer).toBe(true);
    expect(component.taskSelecionada).toEqual(task);
  });
});
