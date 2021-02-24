import {Component, OnInit} from '@angular/core';
import {FormControl, NgForm} from '@angular/forms';
import {Bill} from '../../model/Bill';
import {Observable} from 'rxjs';
import {BillService} from '../../services/bill.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Categories} from '../../model/Categories';
import {CategoriesService} from '../../services/categories.service';

@Component({
  selector: 'app-financial-expences',
  templateUrl: './financial-expenses.component.html',
  styleUrls: ['./financial-expenses.component.css']
})
export class FinancialExpensesComponent implements OnInit {
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  categories: any;
  subcategories: any;
  text: any;
  bills: Bill[];
  bills$: Observable<Bill[]>;
  categories$: Observable<Categories[]>;
  isNewCategory = false;

  constructor(private billService: BillService,
              private categoriesService: CategoriesService,
              private route: ActivatedRoute,
              private router: Router,
              private httpClient: HttpClient,
  ) {
  }

  ngOnInit(): void {
    this.bills$ = this.billService.getBillByUserUuid().pipe(map(bill => bill));
    this.categories$ = this.categoriesService.getCategoriesByUserUuid()
      .pipe(map(cat => cat));
  }

  saveCard(form: NgForm) {
    console.log(this.serializedDate);
  }

  // tslint:disable-next-line:typedef
  newCategory() {
    return this.isNewCategory;
  }

  // tslint:disable-next-line:typedef
  // changeNewCategory() {
  //   console.log(this.newCategory());
  //   return this.isNewCategory = true;
  // }
  // tslint:disable-next-line:typedef
  check(checked: boolean) {
    this.isNewCategory = checked;
    this.newCategory();
  }
}
