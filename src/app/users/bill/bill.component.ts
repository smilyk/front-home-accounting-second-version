import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Bill} from '../../model/Bill';
import {BillService} from '../../services/bill.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Redirect} from '../../model/Redirect';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BillComponent implements OnInit {
  mainBill = false;
  schoosenCurrency: any;


  constructor(
    private billService: BillService,
    private authService: AuthService,
    private httpClient: HttpClient,
    private router: Router) {
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  saveBill(form: NgForm) {
    const bill = form.value as Bill;
    bill.userUuid = this.authService.getUserUuid();
    this.billService.addBill(bill).subscribe(() => this.cancel());
  }

  // tslint:disable-next-line:typedef
  cancel() {
    this.router.navigate([Redirect.BILL_LIST]);
  }

  // tslint:disable-next-line:typedef
  currencyNameAll() {
    return this.schoosenCurrency === 'ALL';

  }

  // tslint:disable-next-line:typedef
  currencyNameUSA() {
    return this.schoosenCurrency === 'USA';

  }

  // tslint:disable-next-line:typedef
  currencyNameISR() {
    return this.schoosenCurrency === 'ISR';

  }

  // tslint:disable-next-line:typedef
  currencyNameUKR() {
    return this.schoosenCurrency === 'UKR';

  }

  // tslint:disable-next-line:typedef
  chooseCurrenct(value: any) {
    this.schoosenCurrency = value;
  }
}
