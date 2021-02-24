import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Bill} from '../model/Bill';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Path} from '../model/Path';
import {AuthService} from './auth.service';
import {TransferMoney} from '../model/TransferMoney';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private httpClient: HttpClient,
              private authService: AuthService) {
  }

  private userUuid = this.authService.getUserUuid();

  addBill(bill): Observable<any> {
    return this.httpClient.post(apiUrl + Path.BILL_CONTROLLER, bill);
  }

  getBillByName(name: string): Observable<any> {
    return this.httpClient.get(apiUrl + Path.BILL_CONTROLLER + Path.VALID
      + name + '/' + this.userUuid);
  }

  getAllBill(): Observable<any> {
    return this.httpClient.get(apiUrl + Path.BILL_CONTROLLER + Path.ALL_BILLS + this.userUuid);
  }

  deleteBill(name: string): Observable<any> {
    return this.httpClient.delete(apiUrl + Path.BILL_CONTROLLER + name + '/' + this.userUuid);
  }

  getBillByNameAndUserUuid(billName: string): Observable<any> {
    return this.httpClient.get(apiUrl + Path.BILL_CONTROLLER + billName + '/' + this.userUuid);
  }

  transferMoney(data: TransferMoney): Observable<any> {
    data.userUuid = this.userUuid;
    return this.httpClient.put(apiUrl + Path.BILL_CONTROLLER, data);
  }

  getBillByUserUuid(): Observable<any> {
    return this.httpClient.get(apiUrl + Path.BILL_CONTROLLER + Path.BILL_BY_USER_UUID + this.userUuid);
  }
}

