import { AbstractControl, ValidationErrors } from '@angular/forms';

export function palavraProibidaValidator(palavras: string[]) {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const valor = control.value.toLowerCase();
    const encontrada = palavras.some(p => valor.includes(p));

    return encontrada ? { palavraProibida: true } : null;
  };
}
