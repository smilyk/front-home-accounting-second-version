import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Subscription} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {CardService} from '../../services/cardService';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {map} from 'rxjs/operators';
import {OutputCard} from '../../model/OutputCard';
import {Redirect} from '../../model/Redirect';
import {DeleteExpenseCardComponent} from '../../dialogs/delete-expense-card/delete-expense-card.component';
import {PlanningOutputCardComponent} from '../../dialogs/planning-output-card/planning-output-card.component';

export interface Tile {
  cols: number;
  rows: number;
  text: string;
  color: string;

}


@Component({
  selector: 'app-expences-list',
  templateUrl: './expences-list.component.html',
  styleUrls: ['./expences-list.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ExpencesListComponent implements OnInit {
  @Input('matTooltip')
  message: 'string';
  displayedColumns: any;
  dataSource: MatTableDataSource<OutputCard>;
  incomes$: Subscription;
  filter: string;
  array: OutputCard[];
  array2: string[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
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
  x: any;
  det = false;
  tiles: Tile[];

  constructor(private cardService: CardService,
              private router: Router,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.incomes$ = this.cardService.getAllOutputCard().pipe(map(
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
      this.dataSource = new MatTableDataSource<OutputCard>(card);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filter = this.filter;
    });
    this.displayedColumns = ['note', 'billName', 'categoryName', 'subcategoryName', 'currency',
      'sum', 'discount', 'count', 'createCardDate', 'details', 'delete'];
  }

  // tslint:disable-next-line:typedef
  addExpencesCard() {
    this.router.navigate([Redirect.EXPENSES]);
  }

  // tslint:disable-next-line:typedef
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // tslint:disable-next-line:typedef
  details(cardUuid: any) {
    this.cardService.getOutputCardByUuid(cardUuid).pipe(map(
      value => {
        this.outputCard = value;
        const dateArrayTmp = this.outputCard.createCardDate.split('T');
        this.outputCard.createCardDate = dateArrayTmp[0];
        this.tiles = [
          {text: '', cols: 1, rows: 1, color: '#e7e39b'},
          {text: 'create date:', cols: 1, rows: 1, color: '#e7e39b'},
          {text: this.outputCard.createCardDate, cols: 2, rows: 1, color: '#9be7ad'},
          {text: '', cols: 1, rows: 1, color: '#e7e39b'},
          {text: 'category: ', cols: 2, rows: 1, color: '#e7e39b'},
          {text: this.outputCard.categoryName, cols: 2, rows: 1, color: '#9be7ad'},
          {text: '', cols: 1, rows: 1, color: '#e7e39b'},
          {text: 'sum: ', cols: 1, rows: 1, color: '#e7e39b'},
          {
            text: this.outputCard.count + '' + this.outputCard.unit + '*' + this.outputCard.sum + ' ' + this.outputCard.currency,
            cols: 3, rows: 1, color: '#9be7ad'
          },
          {text: '', cols: 1, rows: 1, color: '#e7e39b'},
          {text: '', cols: 1, rows: 1, color: '#e7e39b'},
          {text: '', cols: 1, rows: 1, color: '#e7e39b'},
          {text: 'bill: ', cols: 1, rows: 1, color: '#e7e39b'},
          {text: this.outputCard.billName, cols: 2, rows: 1, color: '#9be7ad'},
          {text: '', cols: 1, rows: 1, color: '#e7e39b'},
          {text: 'subcategory:', cols: 2, rows: 1, color: '#e7e39b'},
          {text: this.outputCard.subcategoryName, cols: 2, rows: 1, color: '#9be7ad'},
          {text: '', cols: 1, rows: 1, color: '#e7e39b'},
          {text: 'discount:', cols: 1, rows: 1, color: '#e7e39b'},
          // {text: '', cols: 1, rows: 1, color: '#e7e39b'},
          {text: this.outputCard.discount + ' %', cols: 3, rows: 1, color: '#9be7ad'},
          {text: '', cols: 1, rows: 1, color: '#e7e39b'},
          {text: '', cols: 1, rows: 1, color: '#e7e39b'},
          {text: 'notes: ', cols: 1, rows: 1, color: '#e7e39b'},
          {text: this.outputCard.note, cols: 7, rows: 1, color: '#e7e39b'}
        ];
      }
    )).subscribe(
    )
    ;
    this.det = true;
  }

  // tslint:disable-next-line:typedef
  openDialog(cardUuid: any) {
    const dialogRef = this.dialog.open(DeleteExpenseCardComponent, {
      data: {
        cardUuid
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog was closed');
      this.ngOnInit();
    });
    this.ngOnInit();
  }

  // tslint:disable-next-line:typedef
  changeDet() {
    return this.det = false;
  }


  // tslint:disable-next-line:typedef
  planOutput() {
    const dialogRef = this.dialog.open(PlanningOutputCardComponent, {
      data: {
        outputCardUuid: this.outputCard.outputCardUuid
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog was closed');
      this.ngOnInit();
    });
    this.ngOnInit();
  }
}
