import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CategoriesService} from '../../services/categories.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {Redirect} from '../../model/Redirect';
import {Subcategories} from '../../model/Subcategories';

@Component({
  selector: 'app-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddSubcategoryComponent implements OnInit {

  constructor(private categoryService: CategoriesService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  saveSubcategory(form: NgForm) {
    const subcategory = form.value as Subcategories;
    subcategory.userUuid = this.authService.getUserUuid();
    this.categoryService.addSubcategory(subcategory).subscribe(() => this.cancel());
  }

  // tslint:disable-next-line:typedef
  cancel() {
    this.router.navigate([Redirect.SUBCATEGORY_LIST]);
  }
}
