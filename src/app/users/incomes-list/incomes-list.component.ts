import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Subscription} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {CardService} from '../../services/cardService';
import {map} from 'rxjs/operators';
import {InputCard} from '../../model/InputCard';

@Component({
  selector: 'app-incomes-list',
  templateUrl: './incomes-list.component.html',
  styleUrls: ['./incomes-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IncomesListComponent implements OnInit {
  @Input('matTooltip')
  message: 'string';
  displayedColumns: any;
  dataSource: MatTableDataSource<InputCard>;
  incomes$: Subscription;
  filter: string;
  array: InputCard[];
  array2: string[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private cardService: CardService,
              private router: Router,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.incomes$ = this.cardService.getAllIncomesCard().pipe(map(
      value => this.array = value
    )).subscribe(card => {
      this.array.sort((a, b) => {
        if (a.billName < b.billName) {
          return -1;
        } else {
          return 0;
        }
      });
      let dateArrayTmp;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.array.length; i++) {
        dateArrayTmp = this.array[i].createCardDate.split('T');
        this.array[i].createCardDate = dateArrayTmp[0];
      }
      this.dataSource = new MatTableDataSource<InputCard>(card);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filter = this.filter;
    });
    this.displayedColumns = ['note', 'billName', 'categoryName', 'subcategoryName', 'currency',
      'sum', 'discount', 'count', 'createCardDate', 'details', 'delete'];
  }

  // tslint:disable-next-line:typedef
  addIncomeCard() {
    //   TODO
  }

  // tslint:disable-next-line:typedef
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // tslint:disable-next-line:typedef
  details(billName: any) {
    //  TODO
  }

  // tslint:disable-next-line:typedef
  openDialog(billName: any) {
    //  TODO
  }
}
