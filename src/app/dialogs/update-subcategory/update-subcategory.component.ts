import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Subcategories} from '../../model/Subcategories';
import {Redirect} from '../../model/Redirect';
import {SubcategoriesService} from '../../services/subcategories.service';

@Component({
  selector: 'app-update-subcategory',
  templateUrl: './update-subcategory.component.html',
  styleUrls: ['./update-subcategory.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UpdateSubcategoryComponent implements OnInit {

  constructor(private subcategoryService: SubcategoriesService,
              private router: Router,
              public dialogRef: MatDialogRef<UpdateSubcategoryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Subcategories) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  updateSubcategory() {
      this.subcategoryService.updateSubcategory(this.data).subscribe(() => this.ngOnInit());
      this.dialogRef.close();
      this.toSubcategoryCardList();
    }

    // tslint:disable-next-line:typedef
  private toSubcategoryCardList() {
      this.router.navigate([Redirect.SUBCATEGORY_LIST]);
    }
}
