import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { SidenavService } from '../../services/sidenav.service';
import { TokenUtilsService } from '../../services/token-utils.service';
import jwtDecode from 'jwt-decode';
import { UsersService } from '../../services/users.service';
import { tap } from 'rxjs';
import { User } from '../../interfaces/user.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {     
  token?: string;
  isLogin = false;
  userName = '';
  userEmail = '';

  constructor(
    private sidenav: SidenavService,
    private router: Router,
    private tokenSvc: TokenUtilsService,
    private userSvc: UsersService,
    private translate: TranslateService) {}
  
  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event && event.url) {
        this.isLogin = (event.url == '/login');
      }
      if (event instanceof NavigationEnd) {
        this.token = localStorage.getItem('token') || "";
        if (this.token) {
          const decodedToken = <any>jwtDecode(this.token);
          this.userSvc.getById(decodedToken.id)
          .pipe(
              tap( (user: User) => {
                this.userName = user.name;
                this.userEmail = user.email;;
              })
          )
          .subscribe();
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
  }

  logIn() {
    this.router.navigate(['/login']);
  }

  editUser() {
    this.router.navigate(['/edit-user']);
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }
}
