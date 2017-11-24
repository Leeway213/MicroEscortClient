import { AbstractControl, ValidatorFn, Validators } from "@angular/forms";

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (control.value && control.value !== "") {
      return Validators.email(control);
    } else {
      return null;
    }
  };
}
