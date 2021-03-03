import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SubcategoriesService} from '../../services/subcategories.service';
import {Redirect} from '../../model/Redirect';

@Component({
  selector: 'app-delete-subcategory',
  templateUrl: './delete-subcategory.component.html',
  styleUrls: ['./delete-subcategory.component.css']
})
export class DeleteSubcategoryComponent implements OnInit {

  constructor(private subcategoryServer: SubcategoriesService,
              private router: Router,
              public dialogRef: MatDialogRef<DeleteSubcategoryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  remove(subcategoryUuid: any) {
    this.subcategoryServer.deleteSubcategoryFromDB(subcategoryUuid).subscribe(() => this.ngOnInit());
    this.dialogRef.close();
    this.toSubcategoryList();
  }

  // tslint:disable-next-line:typedef
  private toSubcategoryList() {
    this.router.navigate([Redirect.SUBCATEGORY_LIST]);
  }
}
