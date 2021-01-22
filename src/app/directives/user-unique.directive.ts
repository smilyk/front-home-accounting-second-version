import { Directive } from '@angular/core';
import {AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {TokenService} from '../services/token.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Directive({
  selector: '[appUserUnique]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS, useExisting: UserUniqueDirective,
      multi: true
    }]
})
export class UserUniqueDirective implements Validator{

  constructor(private tokenService: TokenService) { }

  registerOnValidatorChange(fn: () => void): void {
  }

  validate(control: AbstractControl): Observable<ValidationErrors> | null {
    const email = control.value as string;
    const rez = this.tokenService.getUserByEmail(email)
      .pipe(map(m => m ? {unique: true} : null));
    return rez;
  }

}
