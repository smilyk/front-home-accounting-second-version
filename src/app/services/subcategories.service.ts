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
export class SubcategoriesService {

  constructor(private httpClient: HttpClient,
              private authService: AuthService) {
  }
  private userUuid = this.authService.getUserUuid();


  getSubcategoriesByUserUuid(): Observable<any> {
    return this.httpClient.get(apiUrl + Path.SUBCATEGORIES_CONTROLLER + this.userUuid);
  }
}

