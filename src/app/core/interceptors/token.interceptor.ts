import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionService } from '../services/session.service';
import { UserService } from '../services/user.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private sessionService: SessionService,
    private userService: UserService,
  ) {}

  // eslint-disable-next-line class-methods-use-this
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Only add headers in requests made to our API
    //this.userService.checkTokenExp();
    if (request.url.search(environment.api_url) !== -1) {
      const re = 'api/auth/login';
      if (request.url.search(re) === -1) {
        const loggedInRequest: HttpRequest<any> = request.clone({
          setHeaders: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${SessionService.getToken()}`,
            // 'Accept': 'application/json',
          },
        });
        return next.handle(loggedInRequest);
      }
    }
    return next.handle(request);
  }
}
