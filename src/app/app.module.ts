import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavHomeaccComponent } from './shared/nav-homeacc/nav-homeacc.component';
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

@NgModule({
  declarations: [
    AppComponent,
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
    SharedModule
  ],
  providers: [],
  exports: [
    ConfirmPasswordDirective,
    EmailValidDirective,
    UserUniqueDirective,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
