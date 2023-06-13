import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Room } from 'src/app/global/interfaces/room.interface';
import { RoomsService } from 'src/app/global/services/rooms.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  searchForm: FormGroup;
  rooms: Room[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private roomSvc: RoomsService,
    private router: Router) 
  {
    this.searchForm = this.formBuilder.group({
      'search': [null]
    });
  }

  ngOnInit(): void {
    this.roomSvc.getRooms()
    .pipe(
        tap( (rooms: Room[]) => this.rooms = rooms )
    )
    .subscribe();

    this.searchForm.get("search")?.valueChanges.subscribe(newValue => {
      if (newValue) {
        this.rooms = this.rooms.filter((room: Room) => room.name.toLowerCase().includes(newValue) 
          || room.business.name.toLowerCase().includes(newValue));
      } else {
        this.roomSvc.getRooms()
        .pipe(
            tap( (rooms: Room[]) => this.rooms = rooms )
        )
        .subscribe();
      }
    });
  }

  navigateDetails(id: number): void {
    this.router.navigate(['customer/room-detail', id]);
  }

}
