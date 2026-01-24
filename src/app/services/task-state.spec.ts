import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { TaskStateService } from './task-state';
import { Task } from '../interface/task';

describe('TaskStateService (Signals)', () => {
  let service: TaskStateService;

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskStateService],
    });

    service = TestBed.inject(TaskStateService);
    service.tasks.set(mockTasks);
  });

  it('deve iniciar com lista de tasks', () => {
    expect(service.tasks().length).toBe(3);
  });

  it('deve filtrar por prioridade', () => {
    service.filters.set({
      prioridade: 'alta',
      busca: null,
      intervalo_datas: null,
    });

    const result = service.filteredTasks();
    expect(result.length).toBe(2);
    expect(result.every((t) => t.prioridade === 'alta')).toBe(true);
  });

  it('deve filtrar no campo busca (título ou tags)', () => {
    service.filters.set({
      prioridade: null,
      busca: 'node',
      intervalo_datas: null,
    });

    const result = service.filteredTasks();
    expect(result.length).toBe(1);
  });

  it('deve filtrar por intervalo de datas', () => {
    service.filters.set({
      prioridade: null,
      busca: null,
      intervalo_datas: {
        start: '2025-01-01',
        end: '2025-01-31',
      },
    });

    const result = service.filteredTasks();
    expect(result.length).toBe(2);
  });

  it('deve aplicar filtros combinados', () => {
    service.filters.set({
      prioridade: 'alta',
      busca: 'deploy',
      intervalo_datas: {
        start: '2025-02-01',
        end: '2025-02-10',
      },
    });

    const result = service.filteredTasks();
    expect(result.length).toBe(1);
    expect(result[0].titulo).toBe('Deploy app');
  });

  it('deve retornar todas as tasks sem filtros', () => {
    service.filters.set({
      prioridade: null,
      busca: null,
      intervalo_datas: null,
    });

    const result = service.filteredTasks();
    expect(result.length).toBe(3);
  });

  it('deve contar apenas tasks urgentes não concluídas', () => {
    expect(service.urgentCount()).toBe(1);
  });
});
