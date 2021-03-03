import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddCategoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  saveCategory(form: NgForm) {

  }

  cancel() {

  }
}
