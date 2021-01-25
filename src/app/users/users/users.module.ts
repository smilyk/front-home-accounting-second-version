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
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {AppModule} from '../../app.module';
import {BillUniqueDirective} from '../../directives/bill-unique.directive';
import {MatPaginatorModule} from '@angular/material/paginator';
import {BillListComponent} from '../bill-list/bill-list.component';
import {MatTableModule} from '@angular/material/table';
const routes: Routes =  [

];

@NgModule({
  declarations: [BillComponent, BillUniqueDirective, BillListComponent
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
  ],
  providers: [
    {provide: MatDialogRef, useValue: {}},
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {provide: MAT_DIALOG_DATA, useValue: []},
  ],
  exports: [BillComponent, BillUniqueDirective, BillListComponent]
})
export class UsersModule { }
