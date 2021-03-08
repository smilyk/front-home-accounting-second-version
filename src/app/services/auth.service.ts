import {Injectable} from '@angular/core';
import {Credentials} from '../model/Credentials';
import {Router} from '@angular/router';
import {TokenService} from './token.service';
import {HttpResponse} from '@angular/common/http';
import {Path} from '../model/Path';
import {Redirect} from '../model/Redirect';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private tokenService: TokenService) {
  }

  private static USERUUID_STORAGE_KEY = 'userUuid';
  private static USER_FIRST_NAME_STORAGE_KEY = 'userFirstName';
  private static USER_SECOND_NAME_STORAGE_KEY = 'userSecondName';
  static readonly TOKEN_STORAGE_KEY = 'token';
  static readonly EMAIL = 'email';
  static email;
  redirectToUrl = Redirect.HOME;
  logoutUrl = Redirect.MAIN;

  login(credentials: Credentials): void {
    AuthService.email = credentials.email;
    this.logout();
    this.tokenService.getResponseHeaders(credentials)
      .subscribe((res: HttpResponse<any>) => {
        this.saveEmail(AuthService.email);
        this.saveUserUuid(res.headers.get('useruuid'));
        this.saveFirstName(res.headers.get('userfirstname'));
        this.saveSecondName(res.headers.get('usersecondname'));
        this.saveToken(res.headers.get('authorization'));
        this.router.navigate([this.redirectToUrl]);
        // tslint:disable-next-line:no-unused-expression
    });
  }

  // tslint:disable-next-line:typedef
  private saveToken(token: string) {
    localStorage.setItem(AuthService.TOKEN_STORAGE_KEY, token);
  }

  // tslint:disable-next-line:typedef
  private saveUserUuid(useruuid: string) {
    localStorage.setItem(AuthService.USERUUID_STORAGE_KEY, useruuid);
  }

  // tslint:disable-next-line:typedef
  private saveFirstName(userfirstname: string) {
    localStorage.setItem(AuthService.USER_FIRST_NAME_STORAGE_KEY, userfirstname);
  }
  // tslint:disable-next-line:typedef
  private saveSecondName(usersecondname: string) {
    localStorage.setItem(AuthService.USER_SECOND_NAME_STORAGE_KEY, usersecondname);

  }
  // tslint:disable-next-line:typedef
  private saveEmail(email) {
    localStorage.setItem(AuthService.EMAIL, email);
  }
  // tslint:disable-next-line:typedef
  public getToken(): string {
    return localStorage.getItem(AuthService.TOKEN_STORAGE_KEY);
  }

  public getEmail(): string {
    return localStorage.getItem(AuthService.EMAIL);
  }

  public getFirstName(): string {
    return localStorage.getItem(AuthService.USER_FIRST_NAME_STORAGE_KEY);
  }

  public getSecondName(): string {
    return localStorage.getItem(AuthService.USER_SECOND_NAME_STORAGE_KEY);
  }

  public getUserUuid(): string {
    return localStorage.getItem(AuthService.USERUUID_STORAGE_KEY);
  }

  public logout(): void {
    localStorage.removeItem(AuthService.TOKEN_STORAGE_KEY);
    localStorage.removeItem(AuthService.EMAIL);
    localStorage.removeItem(AuthService.USERUUID_STORAGE_KEY);
    localStorage.removeItem(AuthService.USER_FIRST_NAME_STORAGE_KEY);
    localStorage.removeItem(AuthService.USER_SECOND_NAME_STORAGE_KEY);
    this.router.navigate([this.logoutUrl]);
  }
  public isAuth(): boolean {
    return !!this.getToken();
  }
}
