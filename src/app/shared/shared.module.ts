import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavHomeaccComponent} from './nav-homeacc/nav-homeacc.component';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogRef} from '@angular/material/dialog';
import {RegisterComponent} from './register/register.component';
import {Redirect} from '../model/Redirect';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {UserUniqueDirective} from '../directives/user-unique.directive';
import {ConfirmPasswordDirective} from '../directives/confirm-password.directive';
import {EmailValidDirective} from '../directives/email-valid.directive';
import {LoginComponent} from './login/login.component';
import {BillComponent} from '../users/bill/bill.component';
import {BillListComponent} from '../users/bill-list/bill-list.component';
import {FinancialExpensesComponent} from '../users/financial-expences/financial-expenses.component';
import {FinancialIncomesComponent} from '../users/financial-incomes/financial-incomes.component';
import {IncomesListComponent} from '../users/incomes-list/incomes-list.component';
import {ExpencesListComponent} from '../users/expences-list/expences-list.component';
import {CategoryComponent} from '../users/category/category.component';
import {AddCategoryComponent} from '../users/add-category/add-category.component';

const routes: Routes = [
  // LOGIN AND REGISTRATION
  {path: Redirect.REGISTER, component: RegisterComponent},
  {path: Redirect.LOGIN, component: LoginComponent},
// bill
  {path: Redirect.BILL, component: BillComponent},
  {path: Redirect.BILL_LIST, component: BillListComponent},
//  financial
  {path: Redirect.EXPENSES, component: FinancialExpensesComponent},
  {path: Redirect.INCOMES, component: FinancialIncomesComponent},
  {path: Redirect.INCOME_LIST, component: IncomesListComponent},
  {path: Redirect.EXPENSES_LIST, component: ExpencesListComponent},
//  Categories
  {path: Redirect.CATEGORY_LIST, component: CategoryComponent},
  {path: Redirect.CATEGORY, component: AddCategoryComponent},
];

@NgModule({
  declarations: [NavHomeaccComponent, RegisterComponent, ConfirmPasswordDirective,
    EmailValidDirective, UserUniqueDirective,
    LoginComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatTabsModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    {provide: MatDialogRef, useValue: {}},
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {provide: MAT_DIALOG_DATA, useValue: []},
  ],
  exports: [NavHomeaccComponent, RouterModule, RegisterComponent, UserUniqueDirective,
    EmailValidDirective,
    ConfirmPasswordDirective, LoginComponent]
})
export class SharedModule {
}
