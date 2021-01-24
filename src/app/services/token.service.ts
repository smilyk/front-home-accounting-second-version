import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Path} from '../model/Path';
import {Credentials} from '../model/Credentials';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
  observe: 'response' as 'response'
};

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  static rez: HttpResponse<any>;

  constructor(private httpClient: HttpClient) {
  }

  public getUserByEmail(email: string): Observable<any> {
    const loginUrl = apiUrl + Path.GET_USER_BY_EMAIL;
    return this.httpClient.get(loginUrl + `${email}`);
  }

  public getResponseHeaders(credentials: Credentials): Observable<any> {

    const loginUrl = apiUrl + Path.USER_CONTROLLER + Path.LOGIN;
    this.httpClient.post<Credentials>(loginUrl, credentials, {observe: 'response'})
      .subscribe((res: HttpResponse<any>) => {
      });
    return this.httpClient.post<Credentials>(loginUrl, credentials, httpOptions);
  }
}
