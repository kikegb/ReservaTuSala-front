import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() menuIsOpen: boolean = true;
  @Output() menuIsOpenChange = new EventEmitter<boolean>();

  changeMenuState() {
    this.menuIsOpen = !this.menuIsOpen;
  }
}
