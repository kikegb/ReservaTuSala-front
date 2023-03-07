import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { SidenavService } from '../../services/sidenav.service';
import { TokenUtilsService } from '../../services/token-utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {     
  token?: string;
  isLogin = false;

  constructor(
    private sidenav: SidenavService,
    private router: Router,
    private location: Location,
    private tokenSvc: TokenUtilsService) {}
  
  ngOnInit(): void {
    this.tokenSvc.getToken().subscribe((token) => {
      this.token = token;
      this.isLogin = (this.location.path() == '/login')
    });

    this.router.events.subscribe((event: any) => {
      if (event && event.url) {
        this.isLogin = (event.url == '/login');
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
