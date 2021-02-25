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
import {SubcategoriesService} from '../../services/subcategories.service';
import {Subcategories} from '../../model/Subcategories';
import {OutputCard} from '../../model/OutputCard';
import {AuthService} from '../../services/auth.service';

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
  note: any;
  bills: Bill[];
  bills$: Observable<Bill[]>;
  categories$: Observable<Categories[]>;
  subcategories$: Observable<Subcategories[]>;
  isNewCategory = false;
  isNewSubcategory = false;
  billCurrency: string;
  currency: any;
  billUuid: string;
  currencyArray = [];
  allCurrencyArray = ['USA', 'ISR', 'UKR'];
  b: Bill;
  billName: any;
  categoryName: any;
  subcategoryName: any;
  categoryUuid: string;
  subcategoryUuid: string;

  constructor(private billService: BillService,
              private categoriesService: CategoriesService,
              private subcategoriesService: SubcategoriesService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private httpClient: HttpClient,
  ) {
  }

  ngOnInit(): void {
    this.bills$ = this.billService.getBillByUserUuid().pipe(map(bill => bill));
    this.categories$ = this.categoriesService.getCategoriesByUserUuid()
      .pipe(map(cat => cat));
    this.subcategories$ = this.subcategoriesService.getSubcategoriesByUserUuid()
      .pipe(map(subcat => subcat));
  }

  // tslint:disable-next-line:typedef
  saveCard(form: NgForm) {
    console.log(this.serializedDate);
    const outputCard = form.value as OutputCard;
    outputCard.userUuid = this.authService.getUserUuid();
    outputCard.billUuid = this.billUuid;
    outputCard.categoryUuid = this.categoryUuid;
    outputCard.subcategoryUuid = this.subcategoryUuid;
    console.log(outputCard);
  }

  // tslint:disable-next-line:typedef
  newCategory() {
    return this.isNewCategory;
  }

  // tslint:disable-next-line:typedef
  private newSubcategory() {
    return this.isNewSubcategory;
  }

  // tslint:disable-next-line:typedef
  check(checked: boolean) {
    this.isNewCategory = checked;
    this.newCategory();
  }

// tslint:disable-next-line:typedef
  checksub(checked: boolean) {
    this.isNewSubcategory = checked;
    this.newSubcategory();
  }

  // tslint:disable-next-line:typedef



  getBill(billUuid: string) {
    this.currencyArray.length = 0;
    this.billUuid = billUuid;
    this.bills$.subscribe(bill => {
      for (this.b of bill) {
        if (this.b.billUuid === billUuid) {
          if (this.b.currencyName === 'ALL') {
            this.currencyArray.push('UKR');
            this.currencyArray.push('ISR');
            this.currencyArray.push('USA');
          } else {
            this.currencyArray.push(this.b.currencyName);
          }
        }
      }
    });
  }

  getCategory(categoryUuid: string) {
    this.categoryUuid = categoryUuid;
  }

  getSubcategory(subcategoriesUuid: string) {
    this.subcategoryUuid = subcategoriesUuid;
  }
}
