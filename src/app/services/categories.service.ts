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
    return this.httpClient.get(apiUrl + Path.CATEGORIES_CONTROLLER + Path.USER + this.userUuid);
  }

  updateCategory(data): Observable<any> {
    return this.httpClient.put(apiUrl + Path.CATEGORIES_CONTROLLER, data);
  }

  deleteCategoryFromDB(categoryUuid): Observable<any> {
    return this.httpClient.delete(apiUrl + Path.CATEGORIES_CONTROLLER + categoryUuid + '/'
      + this.userUuid);
  }

  addCategory(category): Observable<any> {
    return this.httpClient.post(apiUrl + Path.CATEGORIES_CONTROLLER, category);
  }

  getCategoriesValidByUserUuidAndCategoryUuid(categoryName): Observable<any> {
    return this.httpClient.get(apiUrl + Path.CATEGORIES_CONTROLLER +
      Path.VALID + categoryName + '/' + this.userUuid);
  }

  addSubcategory(subcategory): Observable<any> {
    return this.httpClient.post(apiUrl + Path.SUBCATEGORIES_CONTROLLER, subcategory);
  }
}

