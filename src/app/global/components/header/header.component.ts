import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { SidenavService } from '../../services/sidenav.service';
import { TokenUtilsService } from '../../services/token-utils.service';
import jwtDecode from 'jwt-decode';

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
    private tokenSvc: TokenUtilsService) {}
  
  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event && event.url) {
        this.isLogin = (event.url == '/login');
      }
      if (event instanceof NavigationEnd) {
        this.token = localStorage.getItem('token') || "";
        if (this.token) {
          const decodedToken = <any>jwtDecode(this.token);
          this.userName = decodedToken.name;
          this.userEmail = decodedToken.sub;
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
}
