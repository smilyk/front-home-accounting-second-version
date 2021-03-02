import {Component, Inject, OnInit} from '@angular/core';
import {BillService} from '../../services/bill.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CardService} from '../../services/cardService';
import {Redirect} from '../../model/Redirect';

@Component({
  selector: 'app-delete-income-card',
  templateUrl: './delete-income-card.component.html',
  styleUrls: ['./delete-income-card.component.css']
})
export class DeleteIncomeCardComponent implements OnInit {

  constructor(private incomeCardService: CardService,
              private router: Router,
              public dialogRef: MatDialogRef<DeleteIncomeCardComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  remove(cardUuid: any) {
    this.incomeCardService.deleteIncomeCard(cardUuid).subscribe(() => this.ngOnInit());
    this.dialogRef.close();
    this.toIncomeCardList();
  }

  // tslint:disable-next-line:typedef
   toIncomeCardList() {
    this.router.navigate([Redirect.INCOME_LIST]);
  }
}
