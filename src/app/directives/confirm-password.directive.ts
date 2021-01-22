import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

@Directive({
  selector: '[appConfirmPassword]',
  providers: [
    {
      provide: NG_VALIDATORS, useExisting: ConfirmPasswordDirective,
      multi: true
    }

]
})
export class ConfirmPasswordDirective implements Validator {

  @Input() password: string;
  @Input() confirmPassword: string;
  constructor() { }

  registerOnValidatorChange(fn: () => void): void {
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.password || !this.confirmPassword) {
      return null;
    }
    return this.password === this.confirmPassword ? null : {mismatch: true};
  }

}
