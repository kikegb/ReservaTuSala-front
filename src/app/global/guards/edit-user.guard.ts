import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenUtilsService } from '../services/token-utils.service';

@Injectable({
  providedIn: 'root'
})
export class EditUserGuard implements CanActivate {

  constructor(private router: Router, private tokenutilsSvc: TokenUtilsService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = this.tokenutilsSvc.getToken();
      if (token) {
        const decodedToken = this.tokenutilsSvc.getDecodedToken();
        const role = decodedToken.role;
        if (role == "ADMIN" || role == "BUSINESS" || role == "CUSTOMER") {
          return true;
        }
        this.router.navigate(['/unauthorized']);
        return false;
      }
      this.router.navigate(['/login']);
      return false;
    }
}
