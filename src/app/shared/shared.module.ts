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
import {AddSubcategoryComponent} from '../users/add-subcategory/add-subcategory.component';
import {SubcategoryListComponent} from '../users/subcategory-list/subcategory-list.component';
import { HomeComponent } from './home/home.component';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import { MainComponent } from './main/main.component';
import {UsersModule} from '../users/users/users.module';
import {MatPaginatorModule} from '@angular/material/paginator';

const routes: Routes = [
  // HOME
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: Redirect.MAIN, component: MainComponent},
  {path: Redirect.HOME, component: HomeComponent},
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
//  Subcategories
  {path: Redirect.SUBCATEGORY, component: AddSubcategoryComponent},
  {path: Redirect.SUBCATEGORY_LIST, component: SubcategoryListComponent},
];

@NgModule({
  declarations: [NavHomeaccComponent, RegisterComponent, ConfirmPasswordDirective,
    EmailValidDirective, UserUniqueDirective,
    LoginComponent,
    HomeComponent,
    MainComponent
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
    MatSelectModule,
    MatRadioModule,
    MatTableModule,
    UsersModule,
    MatPaginatorModule,
  ],
  providers: [
    {provide: MatDialogRef, useValue: {}},
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {provide: MAT_DIALOG_DATA, useValue: []},
  ],
  exports: [NavHomeaccComponent, RouterModule, RegisterComponent, UserUniqueDirective,
    EmailValidDirective,
    ConfirmPasswordDirective, LoginComponent,   HomeComponent]
})
export class SharedModule {
}
