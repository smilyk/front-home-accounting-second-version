import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {SharedModule} from './shared/shared.module';
import {UserUniqueDirective} from './directives/user-unique.directive';
import {ConfirmPasswordDirective} from './directives/confirm-password.directive';
import {EmailValidDirective} from './directives/email-valid.directive';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {HttpConfigInterceptor} from './interseptor/httpconfig.interceptor';
import {ErrorDialogComponent} from './error-dialog/error-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ErrorDialogService} from './services/error-dialog.service';
import {UsersModule} from './users/users/users.module';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {BillUniqueDirective} from './directives/bill-unique.directive';
import {DeleteBillComponent} from './dialogs/delete-bill/delete-bill.component';
import {TransferComponent} from './dialogs/transfer/transfer.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { DeleteIncomeCardComponent } from './dialogs/delete-income-card/delete-income-card.component';
import { DeleteExpenseCardComponent } from './dialogs/delete-expense-card/delete-expense-card.component';


@NgModule({
  declarations: [
    AppComponent,
    ErrorDialogComponent,
    DeleteBillComponent,
    TransferComponent,
    DeleteIncomeCardComponent,
    DeleteExpenseCardComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    MatTabsModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    HttpClientModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    SharedModule,
    UsersModule,
    MatDatepickerModule,
    FormsModule,
    MatSelectModule,
  ],
  providers: [
    ErrorDialogService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    ],
  exports: [
    ConfirmPasswordDirective,
    EmailValidDirective,
    UserUniqueDirective,
    BillUniqueDirective,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
