import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTasksComponent } from './form-tasks';
import { MessageService } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/task-service';
import { of } from 'rxjs';

describe('FormTasksComponent', () => {
  let component: FormTasksComponent;
  let fixture: ComponentFixture<FormTasksComponent>;

  const taskServiceMock = {
    postTask: vi.fn().mockReturnValue(of({})),
    editTask: vi.fn().mockReturnValue(of({})),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTasksComponent, ReactiveFormsModule],
      providers: [MessageService, { provide: TaskService, useValue: taskServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(FormTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    await fixture.whenStable();
  });

  it('deve criar o componente e o formulario no OnInit', () => {
    expect(component).toBeTruthy();
    expect(component.formulario).toBeTruthy();
  });

  it('deve conter os campos principais', () => {
    expect(component.formulario.get('titulo')).toBeTruthy();
    expect(component.formulario.get('prioridade')).toBeTruthy();
    expect(component.formulario.get('status')).toBeTruthy();
  });

  it('não deve salvar/editar se formulário inválido', () => {
    component.formulario.get('titulo')?.setValue('');
    component.submit();

    expect(component.formulario.invalid).toBeTruthy();
    expect(taskServiceMock.postTask).not.toHaveBeenCalled();
    expect(taskServiceMock.editTask).not.toHaveBeenCalled();
  });

  it('deve formatar data corretamente na funcao formatDatas', () => {
    const date = new Date('2025-01-01');
    const result = component.formatDatas(date);

    expect(result).toBe('2025-01-01');
  });

  it('deve validar o titulo', () => {
    const control = component.formulario.get('titulo');
    component.formulario.get('titulo')?.setValue('Sou ');
    control?.markAsDirty();

    expect(control?.invalid).toBe(true);
  });

  it('deve invalidar titulo com palavra proibida', () => {
    const control = component.formulario.get('titulo');
    control?.setValue('task: bug atividade 8121');

    expect(control?.invalid).toBe(true);
  });

  it('deve exigir prazo se prioridade for urgente', () => {
    //Ex: status: urgente é obrigatorório ter prazo
    const prioridadeUrgente = { nome: 'Urgente', id_externo: 'urgente' };

    component.formulario.get('prioridade')?.setValue(prioridadeUrgente);
    component.formulario.get('prazo')?.setValue(null);

    expect(component.formulario.get('prazo')?.hasError('required')).toBe(true);
  });

  it('deve adicionar tag', () => {
    const input = document.createElement('input');
    input.value = 'frontend';

    component.addTag(input);

    const tags = component.formulario.get('tags')?.value;
    expect(tags.length).toBe(1);
    expect(tags[0]).toBe('frontend');
  });

  it('deve remover tag', () => {
    component.formulario.get('tags')?.setValue(['ux', 'frontend']);
    component.removeTag(0);

    const tags = component.formulario.get('tags')?.value;
    expect(tags).toEqual(['frontend']);
  });

  it('deve ter até 5 tags no formulário', () => {
    component.formulario.get('tags')?.setValue(['ux', 'frontend', 'backend', 'mobile', 'devops']);
    const tags = component.formulario.get('tags')?.value;
    expect(tags.length).toBeLessThanOrEqual(5);
  });

  it('tags deve ser um array', () => {
    component.formulario.get('tags')?.setValue('ux');
    const tags = component.formulario.get('tags')?.value;
    expect(Array.isArray(tags)).toBe(false);
  });

  it('deve retornar um controle inválido (isInvalid)', () => {
    component.formulario.get('status')?.setValue([]);
    component.formulario.get('prioridade')?.setValue([]);
    
    expect(component.formulario.get('status')?.hasError('required')).toBe(true);
    expect(component.formulario.get('prioridade')?.hasError('required')).toBe(true);

  });
});
