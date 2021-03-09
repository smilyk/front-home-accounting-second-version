import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Subscription} from 'rxjs';
import {Bill} from '../../model/Bill';
import {Currency} from '../../model/Currency';
import {BillService} from '../../services/bill.service';
import {map} from 'rxjs/operators';
import {LastOperation} from '../../model/LastOperation';
import {ReportService} from '../../services/report.service';
import {Period} from '../../model/Period';
import * as moment from 'moment';
import {Redirect} from '../../model/Redirect';
import {Router} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  displayedColumns: any;
  dataSource: MatTableDataSource<Bill>;
  dataSourceLastOperToday: MatTableDataSource<LastOperation>;
  dataSourceLastOperWeek: MatTableDataSource<LastOperation>;
  dataSourceLastOperMonth: MatTableDataSource<LastOperation>;
  dataSourceLastOperYear: MatTableDataSource<LastOperation>;
  displayedColumnsOper: any;
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
  bill: Bill = {
    userUuid: '-',
    billName: ' ',
    description: '-',
    sumIsr: ' ',
    sumUsa: ' ',
    sumUkr: ' ',
    currencyName: '-',
    mainBill: false,
    billUuid: '-'
  };
  operations: LastOperation[] = [{
    date: '',
    billName: '',
    category: '',
    subcategory: '',
    type: '',
    description: '',
    sum: 0,
    operationUuid: '',
    currency: ''
  }];
  oper: LastOperation = {
    date: '',
    billName: '',
    category: '',
    subcategory: '',
    type: '',
    description: '',
    sum: '',
    operationUuid: '',
    currency: ''
  };
  currency: Currency[] = [{
    currencyName: ''
  }];
  date: Period = {
    period: ''
  };
  choosingCurrency = '';
  bills$: Subscription;
  operations$: Subscription;
  encryptedPassword = true;
  chageLength = false;

  constructor(private billService: BillService,
              private reportService: ReportService,
              private router: Router) {
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
    });
    this.date.period = 'DAY';
    this.operations$ = this.reportService.getLastOperationsByUserAndDate(this.date).pipe(map(
      value => this.operations = value
    )).subscribe(lastOperations => {
      lastOperations = this.changeType(this.operations);
      lastOperations = this.changeDate(this.operations);
      lastOperations = this.changeArrayLength(this.operations);
      this.dataSourceLastOperToday = new MatTableDataSource<LastOperation>(lastOperations);
    });
    this.date.period = 'WEEK';
    this.operations$ = this.reportService.getLastOperationsByUserAndDate(this.date).pipe(map(
      value => this.operations = value
    )).subscribe(lastOperations => {
      lastOperations = this.changeType(this.operations);
      lastOperations = this.changeDate(this.operations);
      lastOperations = this.changeArrayLength(this.operations);
      this.dataSourceLastOperWeek = new MatTableDataSource<LastOperation>(lastOperations);
    });
    this.date.period = 'MONTH';
    this.operations$ = this.reportService.getLastOperationsByUserAndDate(this.date).pipe(map(
      value => this.operations = value
    )).subscribe(lastOperations => {
      lastOperations = this.changeType(this.operations);
      lastOperations = this.changeDate(this.operations);
      lastOperations = this.changeArrayLength(this.operations);
      this.dataSourceLastOperMonth = new MatTableDataSource<LastOperation>(lastOperations);

    });
    this.date.period = 'YEAR';
    this.operations$ = this.reportService.getLastOperationsByUserAndDate(this.date).pipe(map(
      value => this.operations = value
    )).subscribe(lastOperations => {
      lastOperations = this.changeType(this.operations);
      lastOperations = this.changeDate(this.operations);
      lastOperations = this.changeArrayLength(this.operations);
      this.dataSourceLastOperYear = new MatTableDataSource<LastOperation>(lastOperations);
    });
    this.displayedColumns = ['billName', 'sumIsr', 'sumUkr', 'sumUsa'];
    this.displayedColumnsOper = ['date', 'bill', 'category', 'sum', 'currency', 'type', 'detail'];
  }

  // tslint:disable-next-line:typedef
  private changeType(op: LastOperation[]) {
    for (const o of op) {
      if (o.type === 'OUTPUT') {
        o.type = 'call_received';
      } else {
        o.type = 'call_made';
      }
    }
    return op;
  }

  // tslint:disable-next-line:typedef
  private changeDate(operations: LastOperation[]) {
    for (const o of operations) {
      o.date = moment(o.date).format('MMMM Do');
    }
    return operations;
  }

  // tslint:disable-next-line:typedef
  private changeArrayLength(operations: LastOperation[]) {
    while (this.operations.length < 4){
      this.operations.push(this.oper);
    }
    this.addLength();
    return operations;
  }

  // tslint:disable-next-line:typedef
  setValue() {
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
      while (this.bills.length < 4){
        this.bills.push(this.bill);
      }
      this.dataSource = new MatTableDataSource<Bill>(bill);
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

  // tslint:disable-next-line:typedef
  addBill() {
    this.router.navigate([Redirect.BILL]);
  }

  // tslint:disable-next-line:typedef
  addIncome() {
    this.router.navigate([Redirect.INCOMES]);
  }

  // tslint:disable-next-line:typedef
  addOutcome() {
    this.router.navigate([Redirect.EXPENSES]);
  }

  // tslint:disable-next-line:typedef
  addCategory() {
    this.router.navigate([Redirect.CATEGORY]);
  }

  // tslint:disable-next-line:typedef
  addSubcategory() {
    this.router.navigate([Redirect.SUBCATEGORY]);
  }

  // tslint:disable-next-line:typedef
  addLength() {
    console.log(this.chageLength);
    this.chageLength = true;
    console.log(this.chageLength);
    return this.chageLength;
  }
}
