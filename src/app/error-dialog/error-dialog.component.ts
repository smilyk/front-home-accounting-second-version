import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {Redirect} from '../model/Redirect';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent implements OnInit {

  title = 'Angular-Interceptor';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  goToLogin() {
    this.router.navigate([Redirect.HOME]);
  }
}
