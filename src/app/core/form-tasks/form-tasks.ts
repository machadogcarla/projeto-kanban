import { AfterViewInit, Component, inject, Input, OnInit, output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { palavraProibidaValidator } from '../../validators/palavra-proibida.validator';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { Select } from 'primeng/select';
import { MessageErrorForm } from '../message-error-form/message-error-form';
import { TextareaModule } from 'primeng/textarea';
import { Prioridade, Task } from '../../interface/task';
import { ChipModule } from 'primeng/chip';
import { Button } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { maxArrayLength } from '../../validators/max-array-length/max-array-length';
import { TaskService } from '../../services/task-service';
import { ToastService } from '../../services/toast-message-service';
import { TaskStateService } from '../../services/task-state';

@Component({
  selector: 'app-form-tasks',
  imports: [
    Select,
    FormsModule,
    ReactiveFormsModule,
    DatePickerModule,
    InputTextModule,
    FloatLabelModule,
    MessageErrorForm,
    MessageErrorForm,
    TextareaModule,
    ChipModule,
    Button,
    Tag,
  ],
  templateUrl: './form-tasks.html',
  styleUrl: './form-tasks.css',
})
export class FormTasksComponent implements OnInit, AfterViewInit {
  formulario!: FormGroup;
  dataAtual = new Date();
  values: string[] | undefined;
  private taskService = inject(TaskService);
  private toast = inject(ToastService);
  private taskState = inject(TaskStateService);
  closeDrawer = output<boolean>();
  @Input() taskSelecionada: Task | null = null;

  priorityList: Prioridade[] = [
    { nome: 'Urgente', id_externo: 'urgente' },
    { nome: 'Alta', id_externo: 'alta' },
    { nome: 'Média', id_externo: 'media' },
    { nome: 'Baixa', id_externo: 'baixa' },
  ];

  statusList: Prioridade[] = [
    { nome: 'A fazer', id_externo: 'a-fazer' },
    { nome: 'Em andamento', id_externo: 'em-andamento' },
    { nome: 'Concluído', id_externo: 'concluido' },
  ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      id: [null],
      titulo: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(80),
          palavraProibidaValidator(['bug', 'problema']),
        ],
      ],
      descricao: [''],
      prazo: [''],
      prioridade: ['', [Validators.required]],
      tags: new FormControl<string[] | []>([], [maxArrayLength(5)]),
      status: ['', [Validators.required]],
    });

    if (this.taskSelecionada) {
      const prioridadeObj = this.priorityList.find(
        (p) => p.id_externo === this.taskSelecionada?.prioridade,
      );

      const statusObj = this.statusList.find((s) => s.id_externo === this.taskSelecionada?.status);

      this.formulario.patchValue({
        ...this.taskSelecionada,
        prazo: this.taskSelecionada.prazo ? new Date(this.taskSelecionada.prazo) : null,
        prioridade: prioridadeObj,
        status: statusObj,
      });
    }
  }

  ngAfterViewInit(): void {
    this.formulario.get('prioridade')?.valueChanges.subscribe((data) => {
      if (data?.id_externo == 'urgente') {
        this.formulario.get('prazo')?.setValidators(Validators.required);
      } else {
        this.formulario.get('prazo')?.setValidators(null);
      }
      this.formulario.get('prazo')?.updateValueAndValidity({ emitEvent: false });
    });
  }

  isInvalid(controlName: string) {
    const control = this.formulario.get(controlName);
    return control?.invalid && control.dirty;
  }

  submit() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const { id, titulo, descricao, prazo, prioridade, tags, status } = this.formulario.value;

    let prazoFormatado = prazo ? this.formatDatas(prazo) : undefined;

    const request: Task = {
      id: id ? id : this.getNextId(),
      titulo: titulo,
      descricao: descricao,
      prazo: prazoFormatado,
      prioridade: prioridade?.id_externo,
      tags: tags,
      status: status?.id_externo,
    };

    console.log(request);

    if (this.taskSelecionada) {
      this.editTask(request);
    } else {
      this.saveTask(request);
    }
  }

  private saveTask(request: Task) {
    this.taskService.postTask(request).subscribe({
      next: (data) => {
        this.taskState.tasks.set([...this.taskState.tasks(), request]);
        this.closeDrawer.emit(true);
        this.toast.info(`Task criada com sucesso.`);
      },
      error: (err) => {
        console.error('Erro ao criar task', err);
        this.toast.error('Erro ao criar task.');
      },
    });
  }

  private editTask(request: Task) {
    this.taskService.editTask(<number>request?.id, request).subscribe({
      next: (data) => {
        this.taskState.tasks.set(
          this.taskState.tasks().map((t) => (t.id === request.id ? request : t)),
        );
        this.closeDrawer.emit(true);
        this.toast.info(`Task editada com sucesso.`);
      },
      error: (err) => {
        console.error('Erro ao editar task', err);
        this.toast.error('Erro ao editar task.');
      },
    });
  }

  addTag(input: HTMLInputElement): void {
    const value = input.value.trim();
    if (!value) return;

    const currentTags = this.formulario.get('tags')?.value || [];
    const newTags = [...currentTags, value];

    this.formulario.get('tags')?.setValue(newTags);
    this.formulario.get('tags')?.markAsTouched();
    this.formulario.get('tags')?.markAsDirty();
    this.formulario.get('tags')?.updateValueAndValidity();
    input.value = '';
  }

  removeTag(index: number): void {
    const currentTags = [...(this.formulario.get('tags')?.value || [])];
    currentTags.splice(index, 1);
    this.formulario.get('tags')?.setValue(currentTags);
  }

  formatDatas(data: Date) {
    if (data) return new Date(data).toISOString().slice(0, 10);

    return undefined;
  }

  getNextId(): number {
    const tasks = this.taskState.tasks();

    if (!tasks.length) return 1;

    const maxId = Math.max(...tasks.map((t) => <number>t.id));
    return maxId + 1;
  }
}
