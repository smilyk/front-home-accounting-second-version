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
    return this.httpClient.get(apiUrl + Path.SUBCATEGORIES_CONTROLLER + Path.USER + this.userUuid);
  }

  getSubcategoryValidByUserUuidAndCategoryUuid(categoryName): Observable<any> {
    return this.httpClient.get(apiUrl + Path.SUBCATEGORIES_CONTROLLER + Path.VALID + categoryName + '/' + this.userUuid);
  }

  deleteSubcategoryFromDB(subcategoryUuid): Observable<any> {
    return this.httpClient.delete(apiUrl + Path.SUBCATEGORIES_CONTROLLER + subcategoryUuid +
    '/' + this.userUuid);
  }

  updateSubcategory(data): Observable<any> {
    return this.httpClient.put(apiUrl + Path.SUBCATEGORIES_CONTROLLER, data);
  }
}

