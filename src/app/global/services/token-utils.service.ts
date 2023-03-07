import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenUtilsService {
  private token =  new BehaviorSubject<string>('');

  constructor() { }

  setToken(token: string): void {
    this.token.next(token);
  }

  getToken(): Observable<string> {
    return this.token.asObservable();
  }

  getDecodedToken(): Observable<any> {
    return of(jwtDecode(this.token.value));
  }
}
