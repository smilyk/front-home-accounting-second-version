import {Component, OnInit} from '@angular/core';
import {Redirect} from '../../model/Redirect';

interface NavLink {
  path: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-nav-homeacc',
  templateUrl: './nav-homeacc.component.html',
  styleUrls: ['./nav-homeacc.component.css']
})
export class NavHomeaccComponent implements OnInit {
    homeLinks: NavLink[] = [
      {path: Redirect.HOME, label: 'главная страница', icon: 'home'},
    ];
    loginLinks: NavLink[] = [
      {path: Redirect.REGISTER, label: 'registration',  icon: 'library_books'},
      {path: Redirect.LOGIN, label: 'login', icon: 'library_books'}
    ];


  ngOnInit(): void {
  }
  constructor() { }
}

