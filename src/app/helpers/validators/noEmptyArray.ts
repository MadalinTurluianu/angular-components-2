import { AbstractControl, ValidationErrors } from '@angular/forms';

export function noEmptyArray(
  control: AbstractControl
): ValidationErrors | null {
  return control.value?.length > 0 ? null : { empty: true };
}
