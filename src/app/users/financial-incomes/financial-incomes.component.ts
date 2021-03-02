import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Bill} from '../../model/Bill';
import {BillService} from '../../services/bill.service';
import {CategoriesService} from '../../services/categories.service';
import {SubcategoriesService} from '../../services/subcategories.service';
import {AuthService} from '../../services/auth.service';
import {CardService} from '../../services/cardService';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Categories} from '../../model/Categories';
import {Subcategories} from '../../model/Subcategories';
import {InputCard} from '../../model/InputCard';

@Component({
  selector: 'app-financial-incomes',
  templateUrl: './financial-incomes.component.html',
  styleUrls: ['./financial-incomes.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FinancialIncomesComponent implements OnInit {
  // TODO
  // add new bill - create logic
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  categories: any;
  subcategories: any;

  bills$: Observable<Bill[]>;
  categories$: Observable<Categories[]>;
  subcategories$: Observable<Subcategories[]>;

  isNewBill = false;
  isNewCategory = false;
  isNewSubcategory = false;

  currencyArray = [];
  allCurrencyArray = ['USA', 'ISR', 'UKR'];
  b: Bill;
  billUuid: string;

  billName: any;
  categoryName: any;
  categoryUuid: string;
  subcategoryUuid: string;
  currency: any;
  note: any;

  inputCard: InputCard = {
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

  constructor(private billService: BillService,
              private categoriesService: CategoriesService,
              private subcategoriesService: SubcategoriesService,
              private authService: AuthService,
              private cardService: CardService,
              private route: ActivatedRoute,
              private router: Router,
              private httpClient: HttpClient, ) {
  }

  ngOnInit(): void {
    this.bills$ = this.billService.getBillByUserUuid()
      .pipe(map(bill => bill));
    this.categories$ = this.categoriesService.getCategoriesByUserUuid()
      .pipe(map(cat => cat));
    this.subcategories$ = this.subcategoriesService.getSubcategoriesByUserUuid()
      .pipe(map(subcat => subcat));
  }

  // tslint:disable-next-line:typedef
  saveCard(form: any) {
    console.log(this.serializedDate);
    const inputCard = form.value as InputCard;
    inputCard.userUuid = this.authService.getUserUuid();
    inputCard.billUuid = this.billUuid;
    inputCard.categoryUuid = this.categoryUuid;
    inputCard.subcategoryUuid = this.subcategoryUuid;
    inputCard.createCardDate = this.serializedDate.value;
    console.log(inputCard);
    this.cardService.addInputCard(inputCard).subscribe(() => this.cancel());
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
  checkCateg(checked: boolean) {
    this.isNewCategory = checked;
    this.newCategory();
  }

  // tslint:disable-next-line:typedef
  checksub(checked: boolean) {
    this.isNewSubcategory = checked;
    this.newSubcategory();
  }

  // tslint:disable-next-line:typedef
  checkBill(checked: boolean) {
    this.isNewBill = checked;
    this.newBill();
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
   newBill() {
    return this.isNewBill;
  }

  // tslint:disable-next-line:typedef
  getSubcategory(subcategoryUuid: string) {
    this.subcategoryUuid = subcategoryUuid;
  }

  // tslint:disable-next-line:typedef
  getCategory(categoryUuid: any) {
    this.categoryUuid = categoryUuid;
  }

  // tslint:disable-next-line:typedef
   cancel() {
  //  TODO
  }
}
