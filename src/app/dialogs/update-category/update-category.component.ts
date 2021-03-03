import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {BillService} from '../../services/bill.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CategoriesService} from '../../services/categories.service';
import {Categories} from '../../model/Categories';

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

  update() {
    console.log(this.data.categoryName);
    console.log(this.data.description);
    console.log(this.data.type)
  }

  chooseReg(value) {

  }

  updateCategory() {
    console.log(this.data.categoryName);
    console.log(this.data.description);
    console.log(this.data.type)
  }
}
