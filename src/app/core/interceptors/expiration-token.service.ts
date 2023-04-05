import {
  HttpErrorResponse,
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { SessionService } from '../services/session.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class ExpirationTokenService implements HttpInterceptor {
  constructor(private userS:UserService, private router:Router) { }

  // eslint-disable-next-line class-methods-use-this
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(

      catchError(ExpirationTokenService.listenErrors),
    );
  }

  static listenErrors(error:HttpErrorResponse) {
    if (error.error.code === 401) {
      SessionService.destroyToken();
      SessionService.destroyUser();

      window.location.reload();
    }
    return throwError(() => 'error custom');
  }
}
