import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {Observable} from 'rxjs';

@Directive({
  selector: '[appEmailValid]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS, useExisting: EmailValidDirective,
      multi: true
    }]
})
export class EmailValidDirective  implements Validator{
@Input() useremail: string;
  constructor() { }

  registerOnValidatorChange(fn: () => void): void {
  }

  validate(control: AbstractControl): ValidationErrors | null {
    // const useremail = control.value as string;
    return this.useremail.includes('@') ? null : {mismatch:true};


    // const rez = checkingEmail.includes( '@' ) ?  null : {mismatch: true};
    // return rez;
  }

}
