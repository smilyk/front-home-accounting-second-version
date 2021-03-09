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
import {Redirect} from '../../model/Redirect';
import {DeleteIncomeCardComponent} from '../../dialogs/delete-income-card/delete-income-card.component';
import {PlanningInputCardComponent} from '../../dialogs/planning-input-card/planning-input-card.component';
import {TransfereService} from '../../services/transfereService';

export interface Tile {
  cols: number;
  rows: number;
  text: string;
  color: string;

}

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
  inputCard: InputCard = {
    inputCardUuid: '',
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
  data = this.transferService.getData();
  constructor(private cardService: CardService,
              private router: Router,
              private transferService: TransfereService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (!(this.data == 'undefined')) {
      this.details(this.data);
    }
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
    this.router.navigate([Redirect.INCOMES]);
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
    this.cardService.getInputCardByUuid(cardUuid).pipe(map(
      value => {
        this.inputCard = value;
        console.log(this.inputCard.unit + ' ooo');
        const dateArrayTmp = this.inputCard.createCardDate.split('T');
        this.inputCard.createCardDate = dateArrayTmp[0];
        this.tiles = [
          {text: '', cols: 1, rows: 1, color: '#e7e39b'},
          {text: 'create date:', cols: 1, rows: 1, color: '#e7e39b'},
          {text: this.inputCard.createCardDate, cols: 2, rows: 1, color: '#9be7ad'},
          {text: '', cols: 1, rows: 1, color: '#e7e39b'},
          {text: 'category: ', cols: 2, rows: 1, color: '#e7e39b'},
          {text: this.inputCard.categoryName, cols: 2, rows: 1, color: '#9be7ad'},
          {text: '', cols: 1, rows: 1, color: '#e7e39b'},
          {text: 'sum: ', cols: 1, rows: 1, color: '#e7e39b'},
          {
            text: this.inputCard.count + '' + this.inputCard.unit + '*' + this.inputCard.sum + ' ' +
              this.inputCard.currency,
            cols: 3, rows: 1, color: '#9be7ad'
          },
          {text: '', cols: 1, rows: 1, color: '#e7e39b'},
          {text: '', cols: 1, rows: 1, color: '#e7e39b'},
          {text: '', cols: 1, rows: 1, color: '#e7e39b'},
          {text: 'bill: ', cols: 1, rows: 1, color: '#e7e39b'},
          {text: this.inputCard.billName, cols: 2, rows: 1, color: '#9be7ad'},
          {text: '', cols: 1, rows: 1, color: '#e7e39b'},
          {text: 'subcategory:', cols: 2, rows: 1, color: '#e7e39b'},
          {text: this.inputCard.subcategoryName, cols: 2, rows: 1, color: '#9be7ad'},
          {text: '', cols: 1, rows: 1, color: '#e7e39b'},
          {text: 'discount:', cols: 1, rows: 1, color: '#e7e39b'},
          // {text: '', cols: 1, rows: 1, color: '#e7e39b'},
          {text: this.inputCard.discount + ' %', cols: 3, rows: 1, color: '#9be7ad'},
          {text: '', cols: 1, rows: 1, color: '#e7e39b'},
          {text: '', cols: 1, rows: 1, color: '#e7e39b'},
          {text: 'notes: ', cols: 1, rows: 1, color: '#e7e39b'},
          {text: this.inputCard.note, cols: 7, rows: 1, color: '#e7e39b'}
        ];
      }
    )).subscribe(
    )
    ;
    this.det = true;
  }

  // tslint:disable-next-line:typedef
  openDialog(cardUuid: any) {
    const dialogRef = this.dialog.open(DeleteIncomeCardComponent, {
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
    const dialogRef = this.dialog.open(PlanningInputCardComponent, {
      data: {
        outputCardUuid: this.inputCard.inputCardUuid
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog was closed');
      this.ngOnInit();
    });
    this.ngOnInit();
  }
}
