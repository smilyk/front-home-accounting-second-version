import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Bill} from '../model/Bill';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Path} from '../model/Path';
import {AuthService} from './auth.service';

const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private httpClient: HttpClient,
              private authService: AuthService) { }
  private userUuid = this.authService.getUserUuid();
  addBill(bill): Observable<any>{
    return this.httpClient.post(apiUrl + Path.BILL_CONTROLLER, bill);
  }

  getBillByName(name: string): Observable<any> {
    return this.httpClient.get(apiUrl + Path.BILL_CONTROLLER + Path.VALID
      + name + '/' + this.userUuid);
  }

  getAllBill(): Observable<any> {
    return this.httpClient.get(apiUrl + Path.BILL_CONTROLLER + Path.ALL_BILLS + this.userUuid);
  }
}

