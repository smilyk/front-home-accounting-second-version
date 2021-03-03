import { Directive } from '@angular/core';
import {AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {CategoriesService} from '../services/categories.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Directive({
  selector: '[appCategoryNameUnique]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS, useExisting: CategoryNameUniqueDirective,
      multi: true
    }]
})
export class CategoryNameUniqueDirective implements Validator{

  constructor(private categoryService: CategoriesService) { }

  registerOnValidatorChange(fn: () => void): void {
  }

  validate(control: AbstractControl): Observable<ValidationErrors> | null {
    const categoryName = control.value as string;
    return this.categoryService.getCategoriesValidByUserUuidAndCategoryUuid(categoryName)
      .pipe(map(m => m ? {unique: true} : null));
  }
}
