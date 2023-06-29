import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { SidenavService } from '../../services/sidenav.service';
import { TokenUtilsService } from '../../services/token-utils.service';
import { UsersService } from '../../services/users.service';
import { tap } from 'rxjs';
import { User } from '../../interfaces/user.interface';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {     
  token: string = "";
  isLogin = false;
  isSignup = false;
  userName = '';
  userEmail = '';

  constructor(
    private sidenav: SidenavService,
    private router: Router,
    private tokenSvc: TokenUtilsService,
    private userSvc: UsersService,
    private snackbarSvc: SnackBarService) {}
  
  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event && event.url) {
        this.isLogin = (event.url === '/login');
        this.isSignup = (event.url === '/signup');
      }
      if (event instanceof NavigationEnd) {
        this.token = this.tokenSvc.getToken() || "";
        if (this.token) {
          const decodedToken = this.tokenSvc.getDecodedToken();
          this.userSvc.getById(decodedToken.id)
          .pipe(
              tap( (user: User) => {
                this.userName = user.name;
                this.userEmail = user.email;;
              })
          )
          .subscribe();
        }

        if (!this.isLogin && !this.isSignup && this.token) {
          this.tokenSvc.checkTokenExpiration();
        }
      }
    });
  }
  
  toggleSidenav() {
      this.sidenav.toggle();
  }

  logOut() {
    localStorage.removeItem('token');
    this.tokenSvc.setToken('');
    this.router.navigate(['/login']);
    this.snackbarSvc.openSuccess('messages.logoutSuccessful');
  }

  logIn() {
    this.router.navigate(['/login']);
  }

  signUp() {
    this.router.navigate(['/signup']);
  }

  editUser() {
    this.router.navigate(['/edit-user']);
  }

  setLanguage(lang: string) {
    localStorage.setItem('language', lang);
    window.location.reload();
  }
}
