import { TestBed } from '@angular/core/testing';

import { TaskService } from './task-service';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Task } from '../interface/task';
import { environment } from './../../environments/environment';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  const apiUrl = environment.apiUrl;

  const mockListTasks: Task[] = [
    {
      id: 1,
      titulo: 'Criar layout do sistema',
      descricao: 'Definir estrutura visual do Kanban',
      prazo: '2026-01-25',
      prioridade: 'media',
      tags: ['frontend'],
      status: 'em-andamento',
    } as Task,
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TaskService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve listar todas as tasks - GET /tasks', () => {
    service.getTasks().subscribe({
      next: (tasks) => {
        //se o array recebido em req.flush(mockTasks); o tamanho é 1, pq só tem 1 dado;
        expect(tasks.length).toBe(1);
      },
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockListTasks);
  });

  it('deve listar uma task por ID - GET /tasks/id', () => {
    const id = 1;

    service.getTaskById(id).subscribe({
      next: (task) => {
        expect(task.id).toBe(1);
        expect(task.titulo).toBe('Criar layout do sistema');
      },
    });

    const req = httpMock.expectOne(`${apiUrl}/${id}`);
    expect(req.request.method).toBe('GET');

    req.flush(mockListTasks[0]);
  });
});
