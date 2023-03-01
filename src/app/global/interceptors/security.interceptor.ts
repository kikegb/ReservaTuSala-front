import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class SecurityInterceptor implements HttpInterceptor {

  constructor(private storageSvc: LocalStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.addAuthToken(request));
  }

  addAuthToken(request: HttpRequest<unknown>) {
    const token = <string>this.storageSvc.get('token');

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
