import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, NgForm} from '@angular/forms';
import {Bill} from '../../model/Bill';
import {BillService} from '../../services/bill.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BillComponent implements OnInit {
  mainBill = false;
  x: any;
  hi = 'an';


  constructor(
    private billService: BillService,
    private authService: AuthService,
    private httpClient: HttpClient,
    private router: Router) {
  }

  ngOnInit(): void {
  }

  saveBill(form: NgForm) {
    const bill = form.value as Bill;
    bill.userUuid = this.authService.getUserUuid();
    this.billService.addBill(bill).subscribe(() => this.cancel());
  }

  cancel() {

  }

  currencyNameAll() {
    if (this.x === 'ALL') {
      return true;
    }
    return false;
  }

  currencyNameUSA() {
    if (this.x === 'USA') {
      return true;
    }
    return false;
  }

  currencyNameISR() {
    if (this.x === 'ISR') {
      return true;
    }
    return false;
  }

  currencyNameUKR() {
    if (this.x === 'UKR') {
      return true;
    }
    return false;
  }

  chooseCurrenct(value: any) {
    console.log(this.x + " x");
    this.x = value;
  }
}
