import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Subcategories} from '../../model/Subcategories';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {SubcategoriesService} from '../../services/subcategories.service';
import {map} from 'rxjs/operators';
import {Redirect} from '../../model/Redirect';
import {UpdateSubcategoryComponent} from '../../dialogs/update-subcategory/update-subcategory.component';
import {DeleteSubcategoryComponent} from '../../dialogs/delete-subcategory/delete-subcategory.component';

@Component({
  selector: 'app-subcategory-list',
  templateUrl: './subcategory-list.component.html',
  styleUrls: ['./subcategory-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SubcategoryListComponent implements OnInit {
  displayedColumns: any;
  dataSource: MatTableDataSource<Subcategories>;
  array: Subcategories[];
  filter: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private subcategoryService: SubcategoriesService,
              private router: Router,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.subcategoryService.getSubcategoriesByUserUuid().pipe(map(
      value => this.array = value
    )).subscribe(subcat => {
      this.dataSource = new MatTableDataSource<Subcategories>(subcat);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filter = this.filter;
    });
    this.displayedColumns = ['name', 'description', 'details', 'delete'];
  }
  // tslint:disable-next-line:typedef
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // tslint:disable-next-line:typedef
  addSubcategory() {
    this.router.navigate([Redirect.SUBCATEGORY]);
  }

  // tslint:disable-next-line:typedef
  updateSubcategory(row) {
    const dialogRef = this.dialog.open(UpdateSubcategoryComponent, {
      data: row
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog was closed');
      this.ngOnInit();
    });
    this.ngOnInit();
  }

  // tslint:disable-next-line:typedef
  deleteSubcategory(row) {
    const dialogRef = this.dialog.open(DeleteSubcategoryComponent, {
      data: row
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog was closed');
      this.ngOnInit();
    });
    this.ngOnInit();
  }
}
