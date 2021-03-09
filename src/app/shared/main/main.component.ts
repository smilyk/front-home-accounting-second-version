import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Redirect} from '../../model/Redirect';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  // tslint:disable-next-line:typedef
  login() {
    this.router.navigate([Redirect.LOGIN]);
  }

  // tslint:disable-next-line:typedef
  register() {
    this.router.navigate([Redirect.REGISTER]);
  }
}
