import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  pages = ['Users', 'Operations', 'Rooms', 'Locations'];

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate(['/admin/' + route.toLowerCase()]);
  }

}
