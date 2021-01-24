import {Component, OnInit} from '@angular/core';
import {Redirect} from '../../model/Redirect';
import {AuthService} from '../../services/auth.service';

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

  constructor(private authService: AuthService,
  ) {
  }

  homeLink: NavLink[] = [
    {path: Redirect.HOME, label: 'главная страница', icon: 'home'},
  ];
  loginLink: NavLink = {path: Redirect.LOGIN, label: 'Login', icon: 'person'};

  registerLink: NavLink = {path: Redirect.REGISTER, label: 'registration', icon: 'library_books'};
  menuItems: NavLink[] = [
    {path: Redirect.BILLS, label: 'bills', icon: 'library_books'},
    {path: Redirect.USERS, label: 'users', icon: 'library_books'}
  ];
  logoutLinks: NavLink =    {path: Redirect.LOGOUT, label: 'Logout', icon: 'person_outline'};



  ngOnInit(): void {
  }


  isAuth() {
    return this.authService.isAuth();
  }

  getUserName() {
    const firstName = this.authService.getFirstName();
    const secondName  = this.authService.getSecondName();
    return firstName + ' ' + secondName;
  }

  logout() {
    return this.authService.logout();
  }
}

