import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  pages: string[] = [];
  refs: string[] = ['admin/users', 'admin/operations', 'admin/rooms', 'admin/locations'];
  icons: string[] = ['people', 'event', 'door_front', 'location_on'];

  constructor(private router: Router,
    private translate: TranslateService) 
  {
    this.translate.get(['adminPages']).subscribe(translations => {
      this.pages = <string[]>translations['adminPages'].slice(1);
    });
  }

  navigateTo(index: number) {
    this.router.navigate([this.refs[index]]);
  }

}
