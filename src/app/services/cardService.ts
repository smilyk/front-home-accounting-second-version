import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Path} from '../model/Path';
import {AuthService} from './auth.service';
import {TransferMoney} from '../model/TransferMoney';
import {OutputCard} from '../model/OutputCard';

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
}

