import {Component, OnInit, ViewEncapsulation} from '@angular/core';
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
  styleUrls: ['./nav-homeacc.component.css'],
  encapsulation: ViewEncapsulation.None
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
    {path: Redirect.BILL_LIST, label: 'my bills', icon: 'payments'},
    {path: Redirect.CATEGORY_LIST, label: 'my categories',  icon: 'payment'},
    {path: Redirect.INCOME_LIST, label: 'my incomes', icon: 'payments'},
    {path: Redirect.EXPENSES_LIST, label: 'my expenses', icon: 'payments'},
    {path: Redirect.BILL, label: 'add bill', icon: 'account_balance_wallet'},
    {path: Redirect.EXPENSES, label: 'add financial expenses', icon: 'paid'},
    {path: Redirect.INCOMES, label: 'add financial incomes', icon: 'paid'},
    {path: Redirect.CATEGORY, label: 'add category', icon: 'category'},
  ];
  logoutLinks: NavLink =    {path: Redirect.LOGOUT, label: 'Logout', icon: 'person_outline'};



  ngOnInit(): void {
  }


  // tslint:disable-next-line:typedef
  isAuth() {
    return this.authService.isAuth();
  }

  // tslint:disable-next-line:typedef
  getUserName() {
    const firstName = this.authService.getFirstName();
    const secondName  = this.authService.getSecondName();
    return firstName + ' ' + secondName;
  }

  // tslint:disable-next-line:typedef
  logout() {
    return this.authService.logout();
  }
}

