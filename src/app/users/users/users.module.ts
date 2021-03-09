import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {BillComponent} from '../bill/bill.component';
import {MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import {HttpClientModule} from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {BillUniqueDirective} from '../../directives/bill-unique.directive';
import {MatPaginatorModule} from '@angular/material/paginator';
import {BillListComponent} from '../bill-list/bill-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {Redirect} from '../../model/Redirect';
import {BillDetailsComponent} from '../bill-details/bill-details.component';
import {TransferResourcesComponent} from '../transfer-resources/transfer-resources.component';
import {MatListModule} from '@angular/material/list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FinancialExpensesComponent} from '../financial-expences/financial-expenses.component';
import {FinancialIncomesComponent} from '../financial-incomes/financial-incomes.component';
import {IncomesListComponent} from '../incomes-list/incomes-list.component';
import {ExpencesListComponent} from '../expences-list/expences-list.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {CategoryComponent} from '../category/category.component';
import {AddCategoryComponent} from '../add-category/add-category.component';
import {CategoryNameUniqueDirective} from '../../directives/category-name-unique.directive';
import {AddSubcategoryComponent} from '../add-subcategory/add-subcategory.component';
import {SubcategoryListComponent} from '../subcategory-list/subcategory-list.component';
import {SubcategoryNameUniqueDirective} from '../../directives/subcategory-name-unique.directive';
import {TransfereService} from '../../services/transfereService';

const routes: Routes = [
  {path: Redirect.BILL_DETAILS + ':id', component: BillDetailsComponent},
  {path: Redirect.TRANSFER_RESOURCES + ':id', component: TransferResourcesComponent}
];

@NgModule({
  declarations: [BillComponent, BillUniqueDirective, BillListComponent,
    TransferResourcesComponent, BillDetailsComponent, TransferResourcesComponent,
    FinancialExpensesComponent, FinancialIncomesComponent, IncomesListComponent,
    ExpencesListComponent, CategoryComponent, AddCategoryComponent, CategoryNameUniqueDirective,
    AddSubcategoryComponent, SubcategoryListComponent, SubcategoryNameUniqueDirective,
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
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatTooltipModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
  ],
  providers: [
    {provide: TransfereService},
    {provide: MatDialogRef, useValue: {}},
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {provide: MAT_DIALOG_DATA, useValue: []},
  ],
  exports: [BillComponent, BillUniqueDirective, BillListComponent,
    TransferResourcesComponent, BillDetailsComponent, TransferResourcesComponent, FinancialExpensesComponent,
    FinancialIncomesComponent, IncomesListComponent,
    ExpencesListComponent, CategoryComponent, AddCategoryComponent, CategoryNameUniqueDirective,
    AddSubcategoryComponent, SubcategoryListComponent, SubcategoryNameUniqueDirective,
  ]
})
export class UsersModule {
}
