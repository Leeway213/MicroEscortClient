import { UserService } from '../../../services/user.service';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';

export function isUsernameExistsValidator(
  userService: UserService
): AsyncValidatorFn {
  const stack: any[] = [];
  return async (control: AbstractControl): Promise<{ [key: string]: any }> => {
    console.log(control.pending);
    return null;
  };
}
