import { AbstractControl, ValidationErrors } from '@angular/forms';

export function maxArrayLength(max: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as any[];

    if (!value) return null;

    return value.length > max
      ? { maxArrayLength: { max, actual: value.length } }
      : null;
  };
}
