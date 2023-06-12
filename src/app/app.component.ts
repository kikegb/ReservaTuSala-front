import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from './global/services/sidenav.service';
import jwtDecode from 'jwt-decode';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'reservatusala-front';
  adminPages: String[] = ['Home', 'Users', 'Operations', 'Rooms', 'Location'];
  adminRefs: String[] = ['admin/home', 'admin/users', 'admin/operations', 'admin/rooms', 'admin/location'];
  businessPages: String[] = ['Home', 'Operations', 'Rooms'];
  businessRefs: String[] = ['business/home', 'business/operations', 'business/rooms'];
  customerPages: String[] = ['Home', 'Operations'];
  customerRefs: String[] = ['customer/home', 'customer/operations'];

  pages: String[] = [];
  refs: String[] = []

  @ViewChild('sidenav') public sidenav!: MatSidenav;

  constructor(
    private sidenavService: SidenavService,
    private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = <any>jwtDecode(token);
      const role = decodedToken.role;
      if (role == "ADMIN") {
        this.pages = this.adminPages;
        this.refs = this.adminRefs;
      }
      if (role == "BUSINESS") {
        this.pages = this.businessPages;
        this.refs = this.businessRefs;
      }
      if (role == "CUSTOMER") {
        this.pages = this.customerPages;
        this.refs = this.customerRefs;
      }
    }
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = <any>jwtDecode(token);
          const role = decodedToken.role;
          if (role == "ADMIN") {
            this.pages = this.adminPages;
            this.refs = this.adminRefs;
          }
          if (role == "BUSINESS") {
            this.pages = this.businessPages;
            this.refs = this.businessRefs;
          }
          if (role == "CUSTOMER") {
            this.pages = this.customerPages;
            this.refs = this.customerRefs;
          }
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }
}
