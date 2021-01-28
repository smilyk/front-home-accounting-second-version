import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Redirect} from '../../model/Redirect';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  valute: string;
  constructor(private router: Router,
              public dialogRef: MatDialogRef<TransferComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

  }

  // tslint:disable-next-line:typedef
  okMethod() {
    this.router.navigate([Redirect.BILL_LIST]);
  }
}
