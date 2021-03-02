import {Component, Inject, OnInit} from '@angular/core';
import {CardService} from '../../services/cardService';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Redirect} from '../../model/Redirect';

@Component({
  selector: 'app-delete-expense-card',
  templateUrl: './delete-expense-card.component.html',
  styleUrls: ['./delete-expense-card.component.css']
})
export class DeleteExpenseCardComponent implements OnInit {

  constructor(private expenseCardService: CardService,
              private router: Router,
              public dialogRef: MatDialogRef<DeleteExpenseCardComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  remove(cardUuid: any) {
    this.expenseCardService.deleteOutcomeCard(cardUuid).subscribe(() => this.ngOnInit());
    this.dialogRef.close();
    this.toOutcomeCardList();
  }

  private toOutcomeCardList() {
    this.router.navigate([Redirect.EXPENSES_LIST]);
  }
}
