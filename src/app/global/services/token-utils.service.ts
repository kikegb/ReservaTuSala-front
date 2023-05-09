import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenUtilsService {

  constructor() { }

  setToken(token: string): void {
   localStorage.setItem('token', token);
  }

  getToken(): string | null{
    return localStorage.getItem('token');
  }

  getDecodedToken(): any {
    return jwtDecode(localStorage.getItem('token') || "");
  }
}
