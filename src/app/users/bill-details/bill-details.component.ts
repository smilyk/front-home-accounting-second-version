import {Component, OnInit} from '@angular/core';
import {Bill} from '../../model/Bill';
import {BillService} from '../../services/bill.service';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {Redirect} from '../../model/Redirect';

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.css']
})
export class BillDetailsComponent implements OnInit {
  bill: Bill = {
    userUuid: '',
    billName: '',
    description: '',
    sumIsr: 0.0,
    sumUsa: 0.0,
    sumUkr: 0.0,
    currencyName: '',
    mainBill: false
  };
  private thisIsMainBill: false;

  constructor(private billService: BillService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    const isbn = this.route.snapshot.paramMap.get('id');
    const billName = this.route.snapshot.paramMap.get('id');
    console.log(this.route.snapshot.paramMap);
    this.billService.getBillByNameAndUserUuid(billName).pipe(map(bill => bill))
      .subscribe(bill => {
          this.bill = bill;
      });
  }

  return() {
    this.router.navigate([Redirect.BILL_LIST]);
  }

  trasfer() {

  }
}
