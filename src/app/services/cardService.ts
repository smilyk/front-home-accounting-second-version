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
export class CardService {

  constructor(private httpClient: HttpClient,
              private authService: AuthService) {
  }

  private userUuid = this.authService.getUserUuid();


  addOutputCars(outputCard): Observable<any> {
    return this.httpClient.post(apiUrl + Path.OUTPUT_CARD_CONTROLLER, outputCard);
  }

  addInputCard(inputCard): Observable<any> {
    return this.httpClient.post(apiUrl + Path.INPUT_CARD_CONTROLLER, inputCard);
  }

  getAllIncomesCard(): Observable<any> {
    return this.httpClient.get(apiUrl + Path.INPUT_CARD_CONTROLLER + '/' + this.userUuid);
  }

  getAllOutputCard(): Observable<any> {
    return this.httpClient.get(apiUrl + Path.OUTPUT_CARD_CONTROLLER + '/' + this.userUuid);

  }

  deleteIncomeCard(cardUuid): Observable<any> {
    return this.httpClient.delete((apiUrl + Path.INPUT_CARD_CONTROLLER + '/' + cardUuid));
  }

  deleteOutcomeCard(cardUuid): Observable<any> {
    return this.httpClient.delete((apiUrl + Path.OUTPUT_CARD_CONTROLLER + '/' + cardUuid));

  }

  getOutputCardByUuid(cardUuid): Observable<any> {
    return this.httpClient.get(apiUrl + Path.OUTPUT_CARD_CONTROLLER + '/' + this.userUuid +
    '/' + cardUuid);

  }

  getInputCardByUuid(cardUuid): Observable<any> {
    return this.httpClient.get(apiUrl + Path.INPUT_CARD_CONTROLLER + '/' + this.userUuid +
      '/' + cardUuid);
  }
}

