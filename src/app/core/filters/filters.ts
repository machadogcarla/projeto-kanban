import { Component, inject, OnInit, output } from '@angular/core';
import { Select } from 'primeng/select';
import { Prioridade } from '../../interface/task';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TaskStateService } from '../../services/task-state';

@Component({
  selector: 'app-filters',
  imports: [
    Select,
    FormsModule,
    ReactiveFormsModule,
    DatePickerModule,
    InputTextModule,
    FloatLabelModule,
  ],
  templateUrl: './filters.html',
  styleUrl: './filters.css',
})
export class FiltersComponent implements OnInit {
  priorityList: Prioridade[] = [
    { nome: '   ', id_externo: '' },
    { nome: 'Urgente', id_externo: 'urgente' },
    { nome: 'Alta', id_externo: 'alta' },
    { nome: 'Média', id_externo: 'media' },
    { nome: 'Baixa', id_externo: 'baixa' },
  ];
  private taskState = inject(TaskStateService);

  public formulario!: FormGroup;
  // filtersEmit = output<any>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      prioridade: [null],
      busca: [null],
      intervalo_datas: [null],
    });

    this.formulario.get('prioridade')?.valueChanges.subscribe((data) => {
      if (data) this.emitFilters();
    });

    this.formulario.get('busca')?.valueChanges.subscribe((data) => {
      if (data) this.emitFilters();
    });

    this.formulario.get('intervalo_datas')?.valueChanges.subscribe((data) => {
      if (data) this.emitFilters();
    });
  }

  emitFilters() {
    let start!: Date;
    let end!: Date;

    if (this.formulario.get('intervalo_datas')?.value) {
      [start, end] = this.formulario.get('intervalo_datas')?.value;
    }

    // this.filtersEmit.emit({
    //   prioridade: this.formulario.get('prioridade')?.value?.id_externo,
    //   busca: this.formulario.get('busca')?.value,
    //   intervalo_datas: { start: this.formatDatas(start), end: this.formatDatas(end) },
    // });

    this.taskState.filters.set({
      prioridade: this.formulario.get('prioridade')?.value?.id_externo,
      busca: this.formulario.get('busca')?.value,
      intervalo_datas: {
        start: this.formatDatas(start),
        end: this.formatDatas(end),
      },
    });
  }

  formatDatas(data: Date) {
    if (data) return new Date(data).toISOString().slice(0, 10);

    return null;
  }
}
