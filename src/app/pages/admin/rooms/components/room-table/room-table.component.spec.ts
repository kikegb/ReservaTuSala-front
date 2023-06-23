import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { DeleteDialogComponent } from 'src/app/global/components/delete-dialog/delete-dialog.component';
import { MaterialModule } from 'src/app/material.module';
import { MatDialogRefMock } from 'src/test-helpers/mocks/mat-dialog-ref-mock';
import { RoomsServiceMock } from 'src/test-helpers/mocks/rooms-service-mock';
import { Room } from 'src/app/global/interfaces/room.interface';
import { RoomFormDialogComponent } from '../room-form-dialog/room-form-dialog.component';
import { Location } from 'src/app/global/interfaces/location.interface';
import { RoomTableComponent } from './room-table.component';
import { RoomsService } from 'src/app/global/services/rooms.service';
import { TranslateModule } from '@ngx-translate/core';
import { User } from 'src/app/global/interfaces/user.interface';

describe('Admin RoomTableComponent', () => {
  let component: RoomTableComponent;
  let fixture: ComponentFixture<RoomTableComponent>;
  let service: RoomsService;

  const roomsList = <Room[]>[
    {
      "id": 1,
      "business": <User>{},
      "location": <Location>{},
      "name": "Room 1",
      "size": 25,
      "capacity": 20,
      "price": 20.99,
      "operations": [],
      "schedules": [],
      "materials": []
    },
    {
      "id": 2,
      "business": <User>{},
      "location": <Location>{},
      "name": "Room 2",
      "size": 40,
      "capacity": 40,
      "price": 30.50,
      "operations": [],
      "schedules": [],
      "materials": []
    },
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        TranslateModule.forRoot()
      ],
      declarations: [ RoomTableComponent ],
      providers: [
        { provide: RoomsService, useValue: RoomsServiceMock },
        { provide: MatDialog, useValue: MatDialogRefMock }
      ],
    })
    .compileComponents();

    service = TestBed.inject(RoomsService);
    fixture = TestBed.createComponent(RoomTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get rooms from api on init', () => {
    let spyServiceGet = spyOn(service, 'getRooms').and.returnValue(of(roomsList));
    component.ngOnInit();
    expect(spyServiceGet).toHaveBeenCalled();
    expect(component.rooms.length).toBe(2);
  });

  it('should add new rooms to the list', () => {
    let newRoom = <Room>{
      "id": 3,
      "business": <User>{},
      "location": <Location>{},
      "name": "Room 3",
      "size": 40,
      "capacity": 30,
      "price": 15.00,
      "operations": [],
      "schedules": [],
      "materials": []
    };
    let spyServiceAdd = spyOn(service, 'addRoom').and.returnValue(of(newRoom));
    component.addRoom(newRoom);
    expect(spyServiceAdd).toHaveBeenCalled();
    expect(component.rooms.length).toBe(3);
  });

  it('should update rooms in the list', () => {
    let updatedRoom = component.rooms[0];
    updatedRoom.name = 'Room A';
    updatedRoom.size = 38;
    updatedRoom.capacity = 27;
    let spyServiceUpdate = spyOn(service, 'updateRoom').and.returnValue(of(updatedRoom));
    component.updateRoom(updatedRoom);
    expect(spyServiceUpdate).toHaveBeenCalled();
    expect(component.rooms.length).toBe(2);
  });

  it('should delete rooms in the list', () => {
    let roomId = component.rooms[0].id;
    let spyServiceDelete = spyOn(service, 'deleteRoom').and.returnValue(of({}));
    component.deleteRoom(roomId);
    expect(spyServiceDelete).toHaveBeenCalled();
    expect(component.rooms.length).toBe(1);
  });

  it('should open dialog to confirm room deletion', () => {
    let roomId = component.rooms[0].id;
    let spyDialogOpen = spyOn(component.dialog, 'open').and.callThrough();
    component.showDeleteDialog(roomId);
    expect(spyDialogOpen).toHaveBeenCalled();
    expect(spyDialogOpen).toHaveBeenCalledWith(DeleteDialogComponent, { data: { elementName: 'elements.room' } });
  });

  it('should open dialog to update a room', () => {
    let room = component.rooms[0];
    let spyDialogOpen = spyOn(component.dialog, 'open').and.callThrough();
    component.showEditRoomDialog(room);
    expect(spyDialogOpen).toHaveBeenCalled();
    expect(spyDialogOpen).toHaveBeenCalledWith(RoomFormDialogComponent, { data: { title: 'edit.room', room: room } });
  });

  it('should open dialog to add new rooms', () => {
    let spyDialogOpen = spyOn(component.dialog, 'open').and.callThrough();
    component.showAddRoomDialog();
    expect(spyDialogOpen).toHaveBeenCalled();
    expect(spyDialogOpen).toHaveBeenCalledWith(RoomFormDialogComponent, { data: { title: 'new.room', room: undefined} });
  });
});
