import { Component, inject, OnInit, output } from '@angular/core';
import { Select } from 'primeng/select';
import { Prioridade } from '../../interface/task';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TaskStateService } from '../../services/task-state';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'app-filters',
  imports: [
    Select,
    FormsModule,
    ReactiveFormsModule,
    DatePickerModule,
    InputTextModule,
    FloatLabelModule,
    IconFieldModule,
    InputIconModule,
  ],
  templateUrl: './filters.html',
  styleUrl: './filters.css',
})
export class FiltersComponent implements OnInit {
  priorityList: Prioridade[] = [
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
      this.emitFilters();
    });

    this.formulario.get('busca')?.valueChanges.subscribe((data) => {
      this.emitFilters();
    });

    this.formulario.get('intervalo_datas')?.valueChanges.subscribe((data) => {
      this.emitFilters();
    });
  }

  emitFilters() {
    let start!: Date;
    let end!: Date;

    const range = this.formulario.get('intervalo_datas')?.value;

    if (range?.[0]) {
      start = range[0];
      end = range[1] ?? new Date();
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
