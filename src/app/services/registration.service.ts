import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Path} from '../model/Path';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpClient: HttpClient) {

  }

  registerUser(userCredentials): Observable<any> {
    return this.httpClient.post(apiUrl + Path.USER_CONTROLLER, userCredentials);
  }
}
