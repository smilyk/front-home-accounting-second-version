import {Injectable} from '@angular/core';

import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {ErrorDialogService} from '../services/error-dialog.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(public errorDialogService: ErrorDialogService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('token');
    if (token) {
      request = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + token)});
    }

    if (!request.headers.has('Content-Type')) {
      // request = request.clone({headers: request.headers.set('Content-Type', '*/*')});
    }
    request = request.clone({headers: request.headers.set('Accept', '*/*')});

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        let data = {};
        if (error.status === 403 || error.status === 0) {
          data = {
            name: error.name,
            reason: error && error.error && error.error.reason ? error.error.reason : '',
            status: error.status,
            message: error.message
          };
        } else {
          data = {
            name: error.name,
            reason: error && error.error && error.error.reason ? error.error.reason : '',
            status: error.status,
            message: error.error.message,
            message2: error.message
          };
        }
        // data = {
        //   name: error.name,
        //   reason: error && error.error && error.error.reason ? error.error.reason : '',
        //   status: error.status,
        //   message: error.error.message,
        //   message2: error.message
        // };
        this.errorDialogService.openDialog(data);
        return throwError(error);
      }));
  }
}

