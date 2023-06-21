import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenUtilsService {
  jwtDecode = jwtDecode;

  constructor() { }

  setToken(token: string): void {
   localStorage.setItem('token', token);
  }

  getToken(): string | null{
    return localStorage.getItem('token');
  }

  getDecodedToken(): any {
    return this.jwtDecode(localStorage.getItem('token') || "");
  }
}
