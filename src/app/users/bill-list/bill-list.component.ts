import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Bill} from '../../model/Bill';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {BillService} from '../../services/bill.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BillListComponent implements OnInit {
  displayedColumns: any;
  dataSource: MatTableDataSource<Bill>;
  bills$: Subscription;
  filter: string;
  private array1: Bill[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private billService: BillService,
              private router: Router,
              public dialog: MatDialog) {
  }

  // tslint:disable-next-line:typedef
  private isAuth() {
    return true;
  }

  ngOnInit(): void {
    this.bills$ = this.billService.getAllBill().pipe(map(
      value => this.array1 = value
    )).subscribe(bill => {
      this.array1.sort((a, b) => {
        if (a.billNAme < b.billNAme) {
          return -1;
        } else {
          return 0;
        }
      });
      this.dataSource = new MatTableDataSource<Bill>(bill);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filter = this.filter;
    });
    // if (this.isAuth()) {
    this.displayedColumns = ['billName', 'currencyName', 'description', 'isr_money',
      'usa_money', 'ukr_money', 'delete'];
    // }
  }

  // tslint:disable-next-line:typedef
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // tslint:disable-next-line:typedef
  addBill() {
  }

  // tslint:disable-next-line:typedef
  openDialog(name) {
  }
}
