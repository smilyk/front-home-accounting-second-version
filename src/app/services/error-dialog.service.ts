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
      data.message = 'Authorization is failed. Check your email and password';
    }
    if (data.status === 0){
      data.message = 'Something wrong with server. Try one more time';
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
//   public handleAuthError(error: any) {
//     console.log("error ", error);
//     let msg = "";
//     if (error !== undefined && typeof error === "string") {
//       msg = error;
//     } else if (error.error !== undefined && typeof error.error === "string") {
//       msg = error.error;
//     } else if (
//       error.error.error !== undefined &&
//       typeof error.error.error === "string"
//     ) {
//       msg = error.error.error;
//     } else {
//       msg = error.error.error.errors
//         ? error.error.error.errors[0].errorMessage
//         : "Something went wrong";
//     }
//     this.toastr.error(msg, "", {
//       timeOut: 3000,
//       positionClass: "toast-bottom-center",
//     });
//   }
// }
}
