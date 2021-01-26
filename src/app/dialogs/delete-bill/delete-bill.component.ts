import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BillService} from '../../services/bill.service';
import {Redirect} from '../../model/Redirect';
import {Router} from '@angular/router';

@Component({
  selector: 'app-delete-bill',
  templateUrl: './delete-bill.component.html',
  styleUrls: ['./delete-bill.component.css']
})
export class DeleteBillComponent implements OnInit {

  constructor(    private billService: BillService,
                  private router: Router,
                  public dialogRef: MatDialogRef<DeleteBillComponent>,
                  @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  remove(billName: string) {
    this.billService.deleteBill(billName).subscribe(() => this.ngOnInit());
    this.dialogRef.close();
    this.loBillList();
  }

  // tslint:disable-next-line:typedef
  private loBillList() {
    this.router.navigate([Redirect.BILL_LIST]);
  }
}
