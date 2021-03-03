import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {OutputCard} from '../../model/OutputCard';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {CardService} from '../../services/cardService';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {CategoriesService} from '../../services/categories.service';
import {Categories} from '../../model/Categories';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class CategoryComponent implements OnInit {
  displayedColumns: any;
  dataSource: MatTableDataSource<Categories>;
  array: Categories[];
  filter: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private categoryService: CategoriesService,
              private router: Router,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.categoryService.getCategoriesByUserUuid().pipe(map(
      value => this.array = value
    )).subscribe(cat => {
      this.dataSource = new MatTableDataSource<Categories>(cat);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filter = this.filter;
    });
    this.displayedColumns = ['name', 'description', 'type', 'details', 'delete'];
  }

  // tslint:disable-next-line:typedef
  addCategory() {
    //  TODO
  }

  // tslint:disable-next-line:typedef
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  details(outputcardUuid: any) {

  }

  openDialog(outputcardUuid: any) {

  }
}
