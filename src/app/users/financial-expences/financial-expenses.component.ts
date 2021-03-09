import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, NgForm, NgModel} from '@angular/forms';
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
import {CardService} from '../../services/cardService';
import {Redirect} from '../../model/Redirect';

@Component({
  selector: 'app-financial-expences',
  templateUrl: './financial-expenses.component.html',
  styleUrls: ['./financial-expenses.component.css'],
  encapsulation: ViewEncapsulation.None
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
  currency: any;
  billUuid: string;
  currencyArray = [];
  allCurrencyArray = ['USA', 'ISR', 'UKR'];
  b: Bill;
  billName: any;
  categoryName: any;
  categoryUuid: string;
  subcategoryUuid: string;
  outputCard: OutputCard = {
    outputCardUuid: '',
    userUuid: '',
    billName: '',
    billUuid: '',
    subcategoryName: '',
    subcategoryUuid: '',
    categoryName: '',
    categoryUuid: '',
    note: '',
    currency: '',
    sum: 0,
    discount: 0,
    count: 1,
    unit: '',
    createCardDate: ''
  };
  defaultDiscount: number;
  defaultSum: number;
  defaultCount: 1;


  constructor(private billService: BillService,
              private categoriesService: CategoriesService,
              private subcategoriesService: SubcategoriesService,
              private authService: AuthService,
              private cardService: CardService,
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
    this.defaultCount = 1;
    this.defaultDiscount = 0;
    this.defaultSum = 0;
  }

  // tslint:disable-next-line:typedef
  saveCard(form: NgForm) {
    console.log(this.serializedDate);
    const outputCard = form.value as OutputCard;
    outputCard.userUuid = this.authService.getUserUuid();
    outputCard.billUuid = this.billUuid;
    outputCard.categoryUuid = this.categoryUuid;
    outputCard.subcategoryUuid = this.subcategoryUuid;
    outputCard.createCardDate = this.serializedDate.value;
    console.log(outputCard);
    this.cardService.addOutputCars(outputCard).subscribe(() => this.cancel());
  }

  // tslint:disable-next-line:typedef
  newCategory() {
    return this.isNewCategory;
  }

  // tslint:disable-next-line:typedef
  newSubcategory() {
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

  // tslint:disable-next-line:typedef
  getCategory(categoryUuid: string) {
    this.categoryUuid = categoryUuid;
  }

  // tslint:disable-next-line:typedef
  getSubcategory(subcategoriesUuid: string) {
    this.subcategoryUuid = subcategoriesUuid;
  }

  // tslint:disable-next-line:typedef
  changeSumWithCount(count: NgModel) {
    this.defaultCount = count.model;
    this.outputCard.sum = this.outputCard.sum * count.model;
  }

  // tslint:disable-next-line:typedef
  changeSumWithDiscount(discount: NgModel) {
    const sumByCount = this.defaultSum * this.defaultCount;
    const pers = sumByCount * discount.model / 100;
    this.outputCard.sum = sumByCount - pers;
    this.defaultDiscount = discount.model;
  }

  // tslint:disable-next-line:typedef
  getSumForDefault(sum: NgModel) {
    this.defaultSum = sum.model;
  }

  // tslint:disable-next-line:typedef
  private cancel() {
    this.router.navigate([Redirect.EXPENSES_LIST]);
  }
}
