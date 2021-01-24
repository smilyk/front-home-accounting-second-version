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
  static readonly TOKEN_STORAGE_KEY = 'token';
  static readonly EMAIL = 'email';
  static email;
  redirectToUrl = Redirect.HOME;

  login(credentials: Credentials): void {
    AuthService.email = credentials.email;
    this.logout();
    this.tokenService.getResponseHeaders(credentials)
      .subscribe((res: HttpResponse<any>) => {
        this.saveEmail(AuthService.email);
        this.saveUserUuid(res.headers.get('useruuid'));
        this.saveToken(res.headers.get('authorization'));
        this.router.navigate([this.redirectToUrl]);
        // tslint:disable-next-line:no-unused-expression
    });
  }

  // tslint:disable-next-line:typedef
  private saveToken(token: string) {
    localStorage.setItem(AuthService.TOKEN_STORAGE_KEY, token);
    console.log(token + ' token');
  }

  private saveUserUuid(useruuid: string) {
    localStorage.setItem(AuthService.USERUUID_STORAGE_KEY, useruuid);
  }

  private saveEmail(email) {
    localStorage.setItem(AuthService.EMAIL, email);
  }

  public getToken(): string {
    return localStorage.getItem(AuthService.TOKEN_STORAGE_KEY);
  }

  public getEmail(): string {
    return localStorage.getItem(AuthService.EMAIL);
  }

  public logout(): void {
    localStorage.removeItem(AuthService.TOKEN_STORAGE_KEY);
    localStorage.removeItem(AuthService.EMAIL);
    localStorage.removeItem(AuthService.USERUUID_STORAGE_KEY);
    this.router.navigate([this.redirectToUrl]);
  }

  public isAuth(): boolean {
    return !!this.getToken();
  }

  public isUser(): boolean {
    if (!this.isAuth()) {
      return undefined;
    }
  }

}
