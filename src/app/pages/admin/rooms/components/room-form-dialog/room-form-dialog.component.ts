import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tap } from 'rxjs';
import { Room } from 'src/app/global/interfaces/room.interface';
import { User } from 'src/app/global/interfaces/user.interface';
import { LocationsService } from 'src/app/global/services/locations.service';
import { UsersService } from 'src/app/global/services/users.service';
import { Location } from 'src/app/global/interfaces/location.interface';

@Component({
  selector: 'app-room-form-dialog',
  templateUrl: './room-form-dialog.component.html',
  styleUrls: ['./room-form-dialog.component.scss']
})
export class RoomFormDialogComponent {
  title: string;
  room: Room;
  roomForm: FormGroup;
  businesses: User[] = [];
  locations: Location[] = [];

  constructor(
    public dialogRef: MatDialogRef<RoomFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, room: Room },
    private formBuilder: FormBuilder,
    private usersSvc: UsersService,
    private locationSvc: LocationsService)
  {
    this.title = data.title;
    this.room = data.room;
    this.roomForm = this.formBuilder.group({
      'name': [data.room?.name || null, Validators.required],
      'business': [data.room?.business || null, Validators.required],
      'location': [data.room?.location || null, Validators.required],
      'size': [data.room?.size || null, Validators.required],
      'capacity': [data.room?.capacity || null, Validators.required],
      'price': [data.room?.price || null, Validators.required],
      'deleted': [data.room?.deleted || false, Validators.required],
    });
  }

  ngOnInit(): void {
    this.usersSvc.getUsers()
    .pipe(
        tap( (users: User[]) => {
          for (let user of users) {
             if (user.role === "BUSINESS") {
              this.businesses.push(user)
            }
          }
        } )
    )
    .subscribe();

    this.locationSvc.getLocations()
    .pipe(
        tap( (locations: Location[]) => this.locations = locations )
    )
    .subscribe();
  }

  onCancel(): void {
    this.dialogRef.close(undefined);
  }

  onSave(): void {
    if(!this.room) {
      this.dialogRef.close(<Room>this.roomForm.value);
    } else {
      let updatedRoom: Room = {
        ...this.room,
        name: this.roomForm.value.name,
        business: this.roomForm.value.business,
        location: this.roomForm.value.location,
        size: this.roomForm.value.size,
        capacity: this.roomForm.value.capacity,
        price: this.roomForm.value.price,
        deleted: this.roomForm.value.deleted
      };
      this.dialogRef.close(updatedRoom);
    }
  }
}
