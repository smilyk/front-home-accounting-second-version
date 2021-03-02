import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {InputCard} from '../../model/InputCard';
import {Subscription} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {CardService} from '../../services/cardService';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {map} from 'rxjs/operators';
import {OutputCard} from '../../model/OutputCard';
import {Redirect} from '../../model/Redirect';
import {DeleteIncomeCardComponent} from '../../dialogs/delete-income-card/delete-income-card.component';
import {DeleteExpenseCardComponent} from '../../dialogs/delete-expense-card/delete-expense-card.component';

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
  details(billName: any) {
    //  TODO
  }

  // tslint:disable-next-line:typedef
  openDialog(cardUuid: any) {
    console.log(cardUuid)
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

}
