import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {     
  constructor(
    private sidenav: SidenavService) { }
    
    toggleSidenav() {
       this.sidenav.toggle();
    }
}
