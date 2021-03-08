import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Subscription} from 'rxjs';
import {Bill} from '../../model/Bill';
import {Currency} from '../../model/Currency';
import {MatSort} from '@angular/material/sort';
import {BillService} from '../../services/bill.service';
import {map} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {LastOperation} from '../../model/LastOperation';
import {ReportService} from '../../services/report.service';
import {Period} from '../../model/Period';

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
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatPaginator) paginatorToday: MatPaginator;
  // @ViewChild(MatPaginator) paginatorWeek: MatPaginator;
  @ViewChild(MatPaginator) paginator: MatPaginator;



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
  operations: LastOperation[] = [{
    date: '',
    billName: '',
    category: '',
    subcategory: '',
    type: '',
    description: '',
    sum: 0,
    operationUuid: ''
  }];
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

  constructor(private billService: BillService,
              private reportService: ReportService) {
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
      this.dataSourceLastOperToday = new MatTableDataSource<LastOperation>(lastOperations);
    });
    this.date.period = 'WEEK';
    this.operations$ = this.reportService.getLastOperationsByUserAndDate(this.date).pipe(map(
      value => this.operations = value
    )).subscribe(lastOperations => {
      this.dataSourceLastOperWeek = new MatTableDataSource<LastOperation>(lastOperations);
    });
    this.date.period = 'MONTH';
    this.operations$ = this.reportService.getLastOperationsByUserAndDate(this.date).pipe(map(
      value => this.operations = value
    )).subscribe(lastOperations => {
      this.dataSourceLastOperMonth = new MatTableDataSource<LastOperation>(lastOperations);

    });
    this.date.period = 'YEAR';
    this.operations$ = this.reportService.getLastOperationsByUserAndDate(this.date).pipe(map(
      value => this.operations = value
    )).subscribe(lastOperations => {
      this.dataSourceLastOperYear = new MatTableDataSource<LastOperation>(lastOperations);
    });
    this.displayedColumns = ['billName', 'sumIsr', 'sumUkr', 'sumUsa'];
    this.displayedColumnsOper = ['date', 'bill', 'category', 'sum', 'currency', 'type', 'detail'];
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
  getPeriod() {
return this.date.period;
  }

}
