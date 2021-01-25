import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Bill} from '../model/Bill';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Path} from '../model/Path';

const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private httpClient: HttpClient) { }

  addBill(bill): Observable<any>{
    return this.httpClient.post(apiUrl + Path.BILL_CONTROLLER, bill);
  }
}
