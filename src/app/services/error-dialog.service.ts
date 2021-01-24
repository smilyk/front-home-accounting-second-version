import {Injectable} from '@angular/core';

import {MatDialog} from '@angular/material/dialog';
import {ErrorDialogComponent} from '../error-dialog/error-dialog.component';


@Injectable()
export class ErrorDialogService {
  public isDialogOpen = false;

  constructor(public dialog: MatDialog) {
  }

  openDialog(data): any {
    if (this.isDialogOpen) {
      return false;
    }
    this.isDialogOpen = true;
    if (data.status === 403) {
      data.reason = 'Authorization is failed. Check your email and password';
    }
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.isDialogOpen = false;
      let animal;
      animal = result;
    });
  }
}
