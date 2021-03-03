import {Component, Inject, OnInit} from '@angular/core';
import {BillService} from '../../services/bill.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CategoriesService} from '../../services/categories.service';
import {Redirect} from '../../model/Redirect';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent implements OnInit {

  constructor(private categoryServer: CategoriesService,
              private router: Router,
              public dialogRef: MatDialogRef<DeleteCategoryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  remove(categoryUuid: any) {
    this.categoryServer.deleteCategoryFromDB(categoryUuid).subscribe(() => this.ngOnInit());
    this.dialogRef.close();
    this.toCategoryList();
  }

  // tslint:disable-next-line:typedef
  private toCategoryList() {
    this.router.navigate([Redirect.CATEGORY_LIST]);
  }
}
