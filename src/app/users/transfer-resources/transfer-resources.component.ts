import {Component, OnInit} from '@angular/core';
import {BillService} from '../../services/bill.service';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {Bill} from '../../model/Bill';
import {Observable} from 'rxjs';
import {TransferMoney} from '../../model/TransferMoney';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-transfer-resources',
  templateUrl: './transfer-resources.component.html',
  styleUrls: ['./transfer-resources.component.css']
})
export class TransferResourcesComponent implements OnInit {
  billTmp: Bill[];
  data: TransferMoney = {
    billNameFrom: '',
    billNameTo: '',
    userUuid: '',
    sum: 0.0,
    currency: ''
  };
  billFrom: Bill = {
    userUuid: '',
    billName: '',
    description: '',
    sumIsr: 0.0,
    sumUsa: 0.0,
    sumUkr: 0.0,
    currencyName: '',
    mainBill: false
  };
  billTo: Bill = {
    userUuid: '',
    billName: '',
    description: '',
    sumIsr: 0.0,
    sumUsa: 0.0,
    sumUkr: 0.0,
    currencyName: '',
    mainBill: false
  };

  billToName: any;
  billToArray: Bill[];
  currencyFrom = '';
  currencyTo = 'ALL';
  currencies: any;
  currencyAll = [
    'israel shekel', 'ukrainian hryvna', 'american dollar'
  ];
  currencyILS = ['israel shekel'];
  currencyUKR = ['ukrainian hryvna'];
  currencyUSA = ['american dollar'];
  billNameFrom: string;
  israelCurrencyBillFrom = 0;
  americanCurrencyBillFrom = 0;
  ukrainianCurrencyBillFrom = 0;
  sumForTransfer = 0;


  constructor(private billService: BillService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    const billName = this.route.snapshot.paramMap.get('id');
    this.billService.getBillByNameAndUserUuid(billName).pipe(map(billFrom => billFrom))
      .subscribe(billFrom => {
        this.billFrom = billFrom;
        this.billNameFrom = this.billFrom.billName;
        this.israelCurrencyBillFrom = this.billFrom.sumIsr;
        this.americanCurrencyBillFrom = this.billFrom.sumUsa;
        this.ukrainianCurrencyBillFrom = this.billFrom.sumUkr;
        if (this.billFrom.currencyName === 'ALL') {
          this.currencies = this.currencyAll;
        } else if (this.billFrom.currencyName === 'ISR') {
          this.currencies = this.currencyILS;
        } else if (this.billFrom.currencyName === 'USA') {
          this.currencies = this.currencyUSA;
        } else if (this.billFrom.currencyName === 'UKR') {
          this.currencies = this.currencyUKR;
        }
      });
    this.billService.getAllBill().pipe(map(billTo => billTo)).subscribe(
      bill => {
        this.billToArray = bill;
      });
    console.log(this.sumForTransfer + ' 1');
  }

  // tslint:disable-next-line:typedef
  onBlurMethodTo(billToName: any) {
    this.billToName = billToName;
    // tslint:disable-next-line:label-position
    this.billTmp = this.billToArray.filter(bill => {
      return bill.billName === billToName;
    });
    this.currencyTo = this.billTmp[0].currencyName;
  }

  // tslint:disable-next-line:typedef
  onBlurMethodBillFrom(currencyName: string) {
    this.currencyFrom = currencyName;
  }


// tslint:disable-next-line:typedef
  currencyChosen() {
    return this.currencyFrom === '';
  }

// tslint:disable-next-line:typedef
  currencyIsr() {
    return this.currencyFrom === 'israel shekel';
  }

  // tslint:disable-next-line:typedef
  currencyUkr() {
    return this.currencyFrom === 'ukrainian hryvna';
  }

  // tslint:disable-next-line:typedef
  currencyUsa() {
    return this.currencyFrom === 'american dollar';
  }


  // tslint:disable-next-line:typedef
  checkSumm() {
    if (this.currencyFrom === 'israel shekel' && this.israelCurrencyBillFrom < this.sumForTransfer) {
      return false;
    }
    if (this.currencyFrom === 'ukrainian hryvna' && this.ukrainianCurrencyBillFrom < this.sumForTransfer) {
      return false;
    }
    if (this.currencyFrom === 'american dollar' && this.americanCurrencyBillFrom < this.sumForTransfer) {
      return false;
    }
    return true;
  }

  // tslint:disable-next-line:typedef
  checkCurrency() {
    if (this.currencyTo === 'ALL') {
      return true;
    }
    if (this.currencyFrom === 'israel shekel' && this.currencyTo !== 'ISR') {
      return false;
    }
    if (this.currencyFrom === 'ukrainian hryvna' && this.currencyTo !== 'UKR') {
      return false;
    }
    if (this.currencyFrom === 'american dollar' && this.currencyTo !== 'USA') {
      return false;
    }
    return true;
  }

  // tslint:disable-next-line:typedef
  transferCurrency() {
    this.data.billNameFrom = this.billNameFrom;
    this.data.billNameTo = this.billToName;
    if (this.currencyFrom === 'american dollar') {
      this.data.currency = 'USA';
    }
    if (this.currencyFrom === 'ukrainian hryvna') {
      this.data.currency = 'UKR';
    }
    if (this.currencyFrom === 'israel shekel') {
      this.data.currency = 'ISR';
    }
    this.data.sum = this.sumForTransfer;
    this.billService.transferMoney(this.data).subscribe();
  }
}
