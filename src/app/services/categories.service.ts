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
export class CategoriesService {

  constructor(private httpClient: HttpClient,
              private authService: AuthService) {
  }
  private userUuid = this.authService.getUserUuid();

  getCategoriesByUserUuid(): Observable<any> {
    return this.httpClient.get(apiUrl + Path.CATEGORIES_CONTROLLER + Path.USER + this.userUuid)
  }
}

