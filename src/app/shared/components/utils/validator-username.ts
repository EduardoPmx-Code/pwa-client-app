import { AbstractControl } from '@angular/forms';

export function userNameValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const value = control.value;
  if (!value || typeof value !== 'string') {
    return null;
  }
  const valid = value.startsWith('@') && value.length <= 7;
  return valid ? null : { userNameInvalid: true };
}