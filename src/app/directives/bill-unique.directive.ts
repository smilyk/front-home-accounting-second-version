import { Directive } from '@angular/core';
import {AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BillService} from '../services/bill.service';

@Directive({
  selector: '[appBillUnique]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS, useExisting: BillUniqueDirective,
      multi: true
    }]
})
export class BillUniqueDirective implements Validator{

  constructor(private billService: BillService) { }
  registerOnValidatorChange(fn: () => void): void {
  }

  validate(control: AbstractControl): Observable<ValidationErrors> | null {
    const billName = control.value as string;
    const rez = this.billService.getBillByName(billName)
      .pipe(map(m => m ? {unique: true} : null));
    return rez;
  }

}
