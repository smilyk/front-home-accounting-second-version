import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {SharedModule} from './shared/shared.module';
import { UserUniqueDirective } from './directives/user-unique.directive';
import { ConfirmPasswordDirective } from './directives/confirm-password.directive';
import { EmailValidDirective } from './directives/email-valid.directive';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {HttpConfigInterceptor} from './interseptor/httpconfig.interceptor';
import {ErrorDialogComponent} from './error-dialog/error-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ErrorDialogService} from './services/error-dialog.service';
import {UsersModule} from './users/users/users.module';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [
    AppComponent,
    ErrorDialogComponent,
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
    SharedModule,
    MatRadioModule,
    UsersModule,
    MatCheckboxModule,
    MatCardModule,
  ],
  providers: [
    ErrorDialogService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    ],
  exports: [
    ConfirmPasswordDirective,
    EmailValidDirective,
    UserUniqueDirective,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
