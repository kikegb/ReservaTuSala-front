import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  jwtDecode = jwtDecode;
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = <any>this.jwtDecode(token);
      const role = decodedToken.role;
      if (role == "ADMIN") {
        return true;
      }
      this.router.navigate(['/unauthorized']);
      return false;
    }
    this.router.navigate(['/login']);
    return false;
  }
  
}
