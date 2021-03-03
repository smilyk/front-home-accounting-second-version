import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgForm} from '@angular/forms';
import {BillService} from '../../services/bill.service';
import {AuthService} from '../../services/auth.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {CategoriesService} from '../../services/categories.service';
import {Categories} from '../../model/Categories';
import {Redirect} from '../../model/Redirect';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddCategoryComponent implements OnInit {

  constructor( private categoryService: CategoriesService,
               private authService: AuthService,
               private router: Router
               ) { }

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  saveCategory(form: NgForm) {
  const category = form.value as Categories;
  category.userUuid = this.authService.getUserUuid();
  this.categoryService.addCategory(category).subscribe(() => this.cancel());
  }

  // tslint:disable-next-line:typedef
  cancel() {
    this.router.navigate([Redirect.CATEGORY_LIST]);
  }
}
