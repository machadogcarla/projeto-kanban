import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
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
import { MessageErrorForm } from "../message-error-form/message-error-form";

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
    MessageErrorForm
],
  templateUrl: './form-tasks.html',
  styleUrl: './form-tasks.css',
})
export class FormTasksComponent implements OnInit, AfterViewInit {
  formulario!: FormGroup;
  formSubmitted: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
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
      prioridade: [''],
      tags: [[]],
      status: [''],
    });
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
    return control?.invalid && (control.dirty);
  }

  submit() {
    this.formSubmitted = true;

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    // salvar...
  }
}
