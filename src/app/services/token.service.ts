import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Path} from '../model/Path';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
  observe: 'response' as 'response'
};

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private httpClient: HttpClient) {
  }

  public getUserByEmail(email: string): Observable<any> {
      const loginUrl = apiUrl + Path.GET_USER_BY_EMAIL;
      return this.httpClient.get(loginUrl  + `${email}`);
    }
}
