import { Component, Inject, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs';
import { Room } from 'src/app/global/interfaces/room.interface';
import { User } from 'src/app/global/interfaces/user.interface';
import { LocationsService } from 'src/app/global/services/locations.service';
import { UsersService } from 'src/app/global/services/users.service';
import { Location } from 'src/app/global/interfaces/location.interface';
import { Material } from 'src/app/global/interfaces/material.interface';
import { MatTable } from '@angular/material/table';
import { MaterialsService } from 'src/app/global/services/materials.service';
import { Schedule } from 'src/app/global/interfaces/schedule.interface';
import { SchedulesService } from 'src/app/global/services/schedules.service';
import { LocationFormDialogComponent } from '../../../locations/components/location-form-dialog/location-form-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackBarService } from 'src/app/global/services/snack-bar.service';

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
  materials: Material[] = [];
  schedules: Schedule[] = [];
  @ViewChild(MatTable) table!: MatTable<any>;
  week: string[] = [];
  hours = [...Array(24).keys()]

  constructor(
    public dialogRef: MatDialogRef<RoomFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, room: Room },
    private formBuilder: FormBuilder,
    private usersSvc: UsersService,
    private locationSvc: LocationsService,
    private materialSvc: MaterialsService,
    private scheduleSvc: SchedulesService,
    public dialog: MatDialog,
    private translate: TranslateService,
    private snackbarSvc: SnackBarService)
  {
    this.title = data.title;
    this.room = data.room;
    if (this.room) {
      this.materials = this.room.materials;
      this.schedules = this.room.schedules;
    }
    this.roomForm = this.formBuilder.group({
      'name': [data.room?.name || null, Validators.required],
      'business': [data.room?.business || null, Validators.required],
      'location': [data.room?.location || null, Validators.required],
      'size': [data.room?.size || null, [Validators.required, Validators.min(0)]],
      'capacity': [data.room?.capacity || null, [Validators.required, Validators.min(0)]],
      'price': [data.room?.price || null, [Validators.required, Validators.min(0)]],
      'material': [null],
      'quantity': [null],
      'weekday': [null],
      'start': [null],
      'end': [null],
    });

    this.translate.get(['weekDays']).subscribe(translations => {
      this.week = <string[]>translations['weekDays'];
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

  addNewMaterial(): void {
    if (this.roomForm.value.material && this.roomForm.value.quantity && this.roomForm.value.quantity > 0) {
      const material = {
        material: this.roomForm.value.material,
        quantity: this.roomForm.value.quantity
      };

      this.materialSvc.addMaterial(<Material>material).subscribe( m => {
        this.snackbarSvc.openSuccess('messages.addSuccess');
        this.materials = [...this.materials, m];
        this.table.renderRows();
      }, (e: HttpErrorResponse) => {
        console.log(e.status);
        if (e.error) {
          this.snackbarSvc.openErrorByCode(e.error.code);
        } else {
          this.snackbarSvc.openError('messages.addError');
        }
      });
    }
    this.roomForm.get('material')?.reset();
    this.roomForm.get('quantity')?.reset();
  }

  deleteMaterial(id: number): void {
    this.materialSvc.deleteMaterial(id).subscribe(() => {
      this.snackbarSvc.openSuccess('messages.deleteSuccess');
      this.materials = this.materials.filter(m => m.id !== id);
      this.table.renderRows();
    }, (e: HttpErrorResponse) => {
      console.log(e.status);
      if (e.error) {
        this.snackbarSvc.openErrorByCode(e.error.code);
      } else {
        this.snackbarSvc.openError('messages.deleteError');
      }
    });
  }

  addNewSchedule(): void {
    if (this.roomForm.value.start && this.roomForm.value.end && this.roomForm.value.weekday) {
      const start = new Date('1970-01-01T00:00:00');
      start.setHours(this.roomForm.value.start);
      const end = new Date('1970-01-01T00:00:00');
      end.setHours(this.roomForm.value.end);
      const schedule = {
        weekDay: this.roomForm.value.weekday,
        start: start,
        end: end,
      };

      this.scheduleSvc.addSchedule(<Schedule>schedule).subscribe( s => {
        this.snackbarSvc.openSuccess('messages.addSuccess');
        this.schedules = [...this.schedules, s];
        this.table.renderRows();
      }, (e: HttpErrorResponse) => {
        console.log(e.status);
        if (e.error) {
          this.snackbarSvc.openErrorByCode(e.error.code);
        } else {
          this.snackbarSvc.openError('messages.addError');
        }
      });
    }
    this.roomForm.get('weekday')?.reset();
    this.roomForm.get('start')?.reset();
    this.roomForm.get('end')?.reset();
  }

  deleteSchedule(id: number): void {
    this.scheduleSvc.deleteSchedule(id).subscribe(() => {
      this.snackbarSvc.openSuccess('messages.deleteSuccess');
      this.schedules = this.schedules.filter(s => s.id !== id);
      this.table.renderRows();
    }, (e: HttpErrorResponse) => {
      console.log(e.status);
      if (e.error) {
        this.snackbarSvc.openErrorByCode(e.error.code);
      } else {
        this.snackbarSvc.openError('messages.deleteError');
      }
    });
  }

  compareById(a: any, b: any): boolean {
    return a && b ? a.id === b.id : a === b;
  }


  onCancel(): void {
    this.dialogRef.close(undefined);
  }

  onSave(): void {
    if(!this.room) {
      let newRoom = {
        name: this.roomForm.value.name,
        business: this.roomForm.value.business,
        location: this.roomForm.value.location,
        size: this.roomForm.value.size,
        capacity: this.roomForm.value.capacity,
        price: this.roomForm.value.price,
        materials: this.materials,
        schedules: this.schedules
      };
      this.dialogRef.close(newRoom);
    } else {
      let updatedRoom: Room = {
        ...this.room,
        name: this.roomForm.value.name,
        business: this.roomForm.value.business,
        location: this.roomForm.value.location,
        size: this.roomForm.value.size,
        capacity: this.roomForm.value.capacity,
        price: this.roomForm.value.price,
        materials: this.materials,
        schedules: this.schedules
      };
      this.dialogRef.close(updatedRoom);
    }
  }

  addLocation(location: Location): void {
    this.locationSvc.addLocation(location).subscribe( newLocation => {
      this.snackbarSvc.openSuccess('messages.addSuccess');
      this.locations = [...this.locations, newLocation];
      this.roomForm.get('location')?.setValue(newLocation);
      this.table.renderRows();
    }, (e: HttpErrorResponse) => {
      console.log(e.status);
      if (e.error) {
        this.snackbarSvc.openErrorByCode(e.error.code);
      } else {
        this.snackbarSvc.openError('messages.addError');
      }
    });
  }

  showAddLocationDialog(): void {
    const dialogRef = this.dialog.open(LocationFormDialogComponent, { data: { title: 'New location', location: undefined} });

    dialogRef.afterClosed().subscribe( newLocation => {
      if(newLocation) {
        this.addLocation(newLocation);
      }
    });
  }
}
