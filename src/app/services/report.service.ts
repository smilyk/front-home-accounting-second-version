import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Path} from '../model/Path';
import {AuthService} from './auth.service';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private httpClient: HttpClient,
              private authService: AuthService) {
  }

  private userUuid = this.authService.getUserUuid();


  getLastOperationsByUserAndDate(date): Observable<any> {
    return this.httpClient.post(apiUrl + Path.REPORT_CONTROLLER + Path.LAST + this.userUuid, date);
  }
}

