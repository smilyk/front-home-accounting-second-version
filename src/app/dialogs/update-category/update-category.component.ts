import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {BillService} from '../../services/bill.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CategoriesService} from '../../services/categories.service';
import {Categories} from '../../model/Categories';
import {Redirect} from '../../model/Redirect';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UpdateCategoryComponent implements OnInit {

  constructor(private categoryService: CategoriesService,
              private router: Router,
              public dialogRef: MatDialogRef<UpdateCategoryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Categories) {
  }

  ngOnInit(): void {

  }

  // tslint:disable-next-line:typedef
  updateCategory() {
    this.categoryService.updateCategory(this.data).subscribe(() => this.ngOnInit());
    this.dialogRef.close();
    this.toCategoryCardList();
  }

  // tslint:disable-next-line:typedef
  private toCategoryCardList() {
    this.router.navigate([Redirect.CATEGORY_LIST]);
  }
}
