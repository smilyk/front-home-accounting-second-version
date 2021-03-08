import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {OutputCard} from '../../model/OutputCard';
import {Subscription} from 'rxjs';
import {Bill} from '../../model/Bill';
import {Currency} from '../../model/Currency';
import {MatSort} from '@angular/material/sort';
import {BillService} from '../../services/bill.service';
import {map} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  displayedColumns: any;
  dataSource: MatTableDataSource<Bill>;
  filter: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  bills: Bill[] = [{
    userUuid: '',
    billName: '',
    description: '',
    sumIsr: 0,
    sumUsa: 0,
    sumUkr: 0,
    currencyName: '',
    mainBill: false,
    billUuid: ''
  }];
  currency: Currency[] = [{
    currencyName: ''
  }];
  choosingCurrency = '';
  bills$: Subscription;
  encryptedPassword = true;

  constructor(private billService: BillService,
              private authSerice: AuthService) {
  }

  ngOnInit(): void {
    this.bills$ = this.billService.getBillByUserAndCurrency(this.choosingCurrency).pipe(map(
      value => this.bills = value
    )).subscribe(bill => {
      this.bills.sort((a, b) => {
        if (a.billName < b.billName) {
          return -1;
        } else {
          return 0;
        }
      });
      this.dataSource = new MatTableDataSource<Bill>(bill);
      this.dataSource.sort = this.sort;
    });
    this.displayedColumns = ['billName', 'sumIsr', 'sumUkr', 'sumUsa'];
  }

  // tslint:disable-next-line:typedef
  setValue() {
    this.ngOnInit();
    console.log(this.choosingCurrency + ' 9');
    this.bills$ = this.billService.getBillByUserAndCurrency(this.choosingCurrency).pipe(map(
      value => this.bills = value
    )).subscribe(bill => {
      this.bills.sort((a, b) => {
        if (a.billName < b.billName) {
          return -1;
        } else {
          return 0;
        }
      });
      this.dataSource = new MatTableDataSource<Bill>(bill);
      this.dataSource.sort = this.sort;
    });
    this.displayedColumns = ['billName', 'sumIsr', 'sumUkr', 'sumUsa'];
  }

  // tslint:disable-next-line:typedef
  getTotalCost() {
    let rez = 0;
    if (this.choosingCurrency === 'ISR') {
      rez = 0;
      rez = this.bills.map(t => t.sumIsr).reduce((acc, value) => acc + value, 0);
    } else if (this.choosingCurrency === 'UKR') {
      rez = 0;
      rez = this.bills.map(t => t.sumUkr).reduce((acc, value) => acc + value, 0);
    } else if (this.choosingCurrency === 'USA') {
      rez = 0;
      rez = this.bills.map(t => t.sumUsa).reduce((acc, value) => acc + value, 0);
    }
    return rez;
  }
}
