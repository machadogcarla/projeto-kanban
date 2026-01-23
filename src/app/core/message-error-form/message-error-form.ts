import { Component, Input } from '@angular/core';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-message-error-form',
  imports: [Message],

  templateUrl: './message-error-form.html',
  styleUrl: './message-error-form.css',
})
export class MessageErrorForm {
  @Input() control!: any;

  errorMessages: Record<string, (error: any) => string> = {
    required: () => 'Campo é obrigatório',
    minlength: (error) => `Mínimo de ${error.requiredLength} caracteres`,
    maxlength: (error) => `Máximo de ${error.requiredLength} caracteres`,
    palavraProibida: () => 'O título contém palavras proibidas (bug, problema)',
    maxArrayLength: () =>  `Você pode adicionar no máximo 5 tags`,
  };

  get mensagemErro(): string | null {
    const control = this.control; 

    if (!control || !control.errors) return null;

    const firstErrorKey = Object.keys(control.errors)[0];
    const errorValue = control.errors[firstErrorKey];

    const messageFn = this.errorMessages[firstErrorKey];

    return messageFn ? messageFn(errorValue) : 'Campo inválido';
  }
}
