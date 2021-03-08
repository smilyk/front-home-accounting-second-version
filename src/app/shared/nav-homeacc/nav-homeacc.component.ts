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
  private firstName: string;
  private secondName: string;

  constructor(private authService: AuthService,
  ) {
  }

  mainLink: NavLink[] = [
    {path: Redirect.MAIN, label: 'главная страница', icon: 'home'},
  ];
  loginLink: NavLink = {path: Redirect.LOGIN, label: 'Login', icon: 'person'};
  homeLink: NavLink = {path: Redirect.HOME, label: 'Login', icon: 'person'};

  registerLink: NavLink = {path: Redirect.REGISTER, label: 'registration', icon: 'library_books'};
  menuItems: NavLink[] = [
    {path: Redirect.BILL_LIST, label: 'my bills', icon: 'payments'},
    {path: Redirect.CATEGORY_LIST, label: 'my categories', icon: 'payment'},
    {path: Redirect.SUBCATEGORY_LIST, label: 'my subcategories', icon: 'payment'},
    {path: Redirect.INCOME_LIST, label: 'my incomes', icon: 'payments'},
    {path: Redirect.EXPENSES_LIST, label: 'my expenses', icon: 'payments'},
  ];
  addMenuItems: NavLink[] = [
    {path: Redirect.BILL, label: 'add bill', icon: 'account_balance_wallet'},
    {path: Redirect.EXPENSES, label: 'add financial expenses', icon: 'paid'},
    {path: Redirect.INCOMES, label: 'add financial incomes', icon: 'paid'},
    {path: Redirect.CATEGORY, label: 'add category', icon: 'category'},
    {path: Redirect.SUBCATEGORY, label: 'add subcategory', icon: 'category'},
  ];
  logoutLinks: NavLink = {path: Redirect.LOGOUT, label: 'Logout', icon: 'person_outline'};


  ngOnInit(): void {
  }


  // tslint:disable-next-line:typedef
  isAuth() {
    return this.authService.isAuth();
  }

  // tslint:disable-next-line:typedef
  getUserName() {
    this.firstName = this.authService.getFirstName();
    if (this.firstName === null) {
      this.firstName = '';
    }
    this.secondName = this.authService.getSecondName();
    if (this.secondName === null) {
      this.secondName = '';
    }
    return this.firstName + ' ' + this.secondName;
  }

  // tslint:disable-next-line:typedef
  logout() {
    return this.authService.logout();
  }
}

