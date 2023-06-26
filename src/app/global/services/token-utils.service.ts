import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { TokenExpiredDialogComponent } from '../components/token-expired-dialog/token-expired-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class TokenUtilsService {
  jwtDecode = jwtDecode;

  constructor(private dialog: MatDialog) { }

  setToken(token: string): void {
   localStorage.setItem('token', token);
  }

  getToken(): string | null{
    return localStorage.getItem('token');
  }

  getDecodedToken(): any {
    return <any>this.jwtDecode(localStorage.getItem('token') || "");
  }

  checkTokenExpiration(): void {  
    const decodedToken = <any>this.jwtDecode(localStorage.getItem('token') || "");
    if (decodedToken) {
      const expirationTime = new Date(decodedToken.exp);
      const currentTime = new Date();

      if (expirationTime.getTime() < currentTime.getTime()) {
        this.openTokenExpiredDialog();
      }
    } 
  }

  private openTokenExpiredDialog(): void {
    this.dialog.open(TokenExpiredDialogComponent, {
      width: '400px',
      disableClose: true
    });
  } 
}
