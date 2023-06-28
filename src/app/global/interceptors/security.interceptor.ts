import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenUtilsService } from '../services/token-utils.service';

@Injectable()
export class SecurityInterceptor implements HttpInterceptor {

  constructor(private tokenutilsSvc: TokenUtilsService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.tokenutilsSvc.checkTokenExpiration();
    return next.handle(this.addAuthToken(request));
  }

  addAuthToken(request: HttpRequest<unknown>) {
    const token = <string>localStorage.getItem('token');

    if (token) {
      return request.clone({
          setHeaders: {
            Authorization: token
          }
      })
    } else {
      return request;
    }
  }
}
