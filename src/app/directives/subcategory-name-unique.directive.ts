import {Directive} from '@angular/core';
import {AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {map} from 'rxjs/operators';
import {SubcategoriesService} from '../services/subcategories.service';

@Directive({
  selector: '[appSubcategoryNameUnique]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS, useExisting: SubcategoryNameUniqueDirective,
      multi: true
    }]
})
export class SubcategoryNameUniqueDirective implements Validator{

  constructor(private subcategoryService: SubcategoriesService) { }

  registerOnValidatorChange(fn: () => void): void {
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const categoryName = control.value as string;
    return  this.subcategoryService.getSubcategoryValidByUserUuidAndCategoryUuid(categoryName)
      .pipe(map(m => m ? {unique: true} : null));
  }
}
