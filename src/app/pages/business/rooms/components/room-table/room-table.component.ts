import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { tap } from 'rxjs';
import { DeleteDialogComponent } from 'src/app/global/components/delete-dialog/delete-dialog.component';
import { Room } from 'src/app/global/interfaces/room.interface';
import { RoomsService } from 'src/app/global/services/rooms.service';
import { RoomFormDialogComponent } from '../room-form-dialog/room-form-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import jwtDecode from 'jwt-decode';
import { UsersService } from 'src/app/global/services/users.service';
import { User } from 'src/app/global/interfaces/user.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackBarService } from 'src/app/global/services/snack-bar.service';

@Component({
  selector: 'app-room-table',
  templateUrl: './room-table.component.html',
  styleUrls: ['./room-table.component.scss']
})
export class RoomTableComponent {
  rooms: Room[] = [];
  week: string[] = [];
  columnsToDisplay = ['name', 'location', 'size', 'capacity', 'material', 'schedule', 'price', 'actions'];
  @ViewChild(MatTable) table!: MatTable<any>;
  jwtDecode = jwtDecode;

  constructor(private roomSvc: RoomsService, 
    public dialog: MatDialog,
    private translate: TranslateService,
    private userSvc: UsersService,
    private snackbarSvc: SnackBarService) 
    {
      this.translate.get(['weekDays']).subscribe(translations => {
        this.week = <string[]>translations['weekDays'];
      });
    }
  
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = <any>this.jwtDecode(token);
      const id = decodedToken.id;
      this.userSvc.getById(id).subscribe((user: User) => {
        this.rooms = user.rooms;
      });
    }
  }

  addRoom(room: Room): void {
    this.roomSvc.addRoom(room).subscribe(newRoom => {
      this.snackbarSvc.openSuccess('messages.addSuccess');
      this.rooms = [...this.rooms, newRoom];
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

  updateRoom(updatedRoom: Room): void {
    this.roomSvc.updateRoom(updatedRoom).subscribe(() => {
      this.snackbarSvc.openSuccess('messages.updateSuccess');
      let index = this.rooms.findIndex( room => room.id == updatedRoom.id );
      this.rooms[index] = updatedRoom;
      this.rooms = [...this.rooms];
      this.table.renderRows();
    }, (e: HttpErrorResponse) => {
      console.log(e.status);
      if (e.error) {
        this.snackbarSvc.openErrorByCode(e.error.code);
      } else {
        this.snackbarSvc.openError('messages.updateError');
      }
    });
  }

  deleteRoom(id: number): void {
    this.roomSvc.deleteRoom(id).subscribe(() => {
      this.snackbarSvc.openSuccess('messages.deleteSuccess');
      this.rooms = this.rooms.filter(room => room.id !== id);
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

  showDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, { data: { elementName: this.translate.instant('elements.room') } });

    dialogRef.afterClosed().subscribe( result => {
      if(result) {
        this.deleteRoom(id);
      }
    });
  }

  showEditRoomDialog(room: Room): void {
    const dialogRef = this.dialog.open(RoomFormDialogComponent, { data: { title: this.translate.instant('edit.room'), room: room } });

    dialogRef.afterClosed().subscribe( updatedRoom => {
      if(updatedRoom) {
        this.updateRoom(updatedRoom);
      }
    });
  }

  showAddRoomDialog(): void {
    const dialogRef = this.dialog.open(RoomFormDialogComponent, { data: { title: this.translate.instant('new.room'), room: undefined} });

    dialogRef.afterClosed().subscribe( newRoom => {
      if(newRoom) {
        this.addRoom(newRoom);
      }
    });
  }
}
