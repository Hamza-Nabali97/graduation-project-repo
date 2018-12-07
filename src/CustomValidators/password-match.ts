import {FormControl} from '@angular/forms';

export function passwordMatchValidator (otherControlName: string) {

  let confirmPasswordControl: FormControl;
  let passwordControl: FormControl;

  return function matchOtherValidate (control: FormControl) {

    if (!control.parent) {
      return null;
    }

    // Initializing the validator.
    if (!confirmPasswordControl) {
      confirmPasswordControl = control;
      passwordControl = control.parent.get(otherControlName) as FormControl;
      if (!passwordControl) {
        throw new Error('matchOtherValidator(): other control is not found in parent group');
      }
      passwordControl.valueChanges.subscribe(() => {
        confirmPasswordControl.updateValueAndValidity();
      });
    }

    if (!passwordControl) {
      return null;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      return {
        passwordMismatch: true
      };
    }

    return null;

  }

}
