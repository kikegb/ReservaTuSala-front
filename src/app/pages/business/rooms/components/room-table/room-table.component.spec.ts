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
import { UsersService } from 'src/app/global/services/users.service';
import { UsersServiceMock } from 'src/test-helpers/mocks/users-service-mock';
import { MatTable } from '@angular/material/table';

describe('Business RoomTableComponent', () => {
  let component: RoomTableComponent;
  let fixture: ComponentFixture<RoomTableComponent>;
  let roomsSvc: RoomsService;
  let usersSvc: UsersService;
  let table: jasmine.SpyObj<MatTable<any>>;

  const user = <User>{
    "id": 1,
    "cnif": "87654321X",
    "name": "Business S.L.",
    "phone": "999999999",
    "password": "psswd",
    "email": "email@example.com",
    "role": "BUSINESS",
    "rooms": <Room[]>[
      {
        "id": 5,
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
        "id": 6,
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
    ],
    "customerOperations": [],
    "businessOperations": []
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        TranslateModule.forRoot()
      ],
      declarations: [ RoomTableComponent ],
      providers: [
        { provide: RoomsService, useValue: RoomsServiceMock },
        { provide: MatDialog, useValue: MatDialogRefMock },
        { provide: UsersService, useValue: UsersServiceMock },
        { provide: MatTable, useValue: jasmine.createSpyObj('MatTable', ['renderRows']) }
      ],
    })
    .compileComponents();

    table = TestBed.inject(MatTable) as jasmine.SpyObj<MatTable<any>>;
    usersSvc = TestBed.inject(UsersService);
    roomsSvc = TestBed.inject(RoomsService);
    fixture = TestBed.createComponent(RoomTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get business rooms from api on init', () => {
    const authToken = "Bearer T0k3nV4lue$%gdjklasfl$_39";
    const decodedToken = {id: 1, role: 'BUSINESS', name: 'Business S.L.'};

    spyOn(usersSvc, 'getById').and.returnValue(of(user));
    spyOn(localStorage, 'getItem').and.returnValue(authToken);
    spyOn(component, 'jwtDecode').and.returnValue(decodedToken);

    component.ngOnInit();

    expect(usersSvc.getById).toHaveBeenCalledWith(decodedToken.id);
    expect(component.rooms.length).toBe(2);
    expect(component.rooms).toEqual(user.rooms);
  });

  it('should add new rooms to the list', () => {
    let newRoom = <Room>{
      "id": 9,
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
    let spyServiceAdd = spyOn(roomsSvc, 'addRoom').and.returnValue(of(newRoom));

    component.rooms = user.rooms;
    component.table = table;

    component.addRoom(newRoom);
    expect(spyServiceAdd).toHaveBeenCalled();
    expect(component.rooms.length).toBe(3);
  });

  it('should update rooms in the list', () => {
    let updatedRoom = user.rooms[0];
    updatedRoom.name = 'Room A';
    updatedRoom.size = 38;
    updatedRoom.capacity = 27;
    let spyServiceUpdate = spyOn(roomsSvc, 'updateRoom').and.returnValue(of(updatedRoom));

    component.rooms = user.rooms;
    component.table = table;

    component.updateRoom(updatedRoom);
    expect(spyServiceUpdate).toHaveBeenCalled();
    expect(component.rooms.length).toBe(2);
  });

  it('should delete rooms in the list', () => {
    let roomId = user.rooms[0].id;
    let spyServiceDelete = spyOn(roomsSvc, 'deleteRoom').and.returnValue(of({}));

    component.rooms = user.rooms;
    component.table = table;

    component.deleteRoom(roomId);
    expect(spyServiceDelete).toHaveBeenCalled();
    expect(component.rooms.length).toBe(1);
  });

  it('should open dialog to confirm room deletion', () => {
    let roomId = user.rooms[0].id;
    let spyDialogOpen = spyOn(component.dialog, 'open').and.callThrough();

    component.rooms = user.rooms;
    component.table = table;
    
    component.showDeleteDialog(roomId);
    expect(spyDialogOpen).toHaveBeenCalled();
    expect(spyDialogOpen).toHaveBeenCalledWith(DeleteDialogComponent, { data: { elementName: 'elements.room' } });
  });

  it('should open dialog to update a room', () => {
    let room = user.rooms[0];
    let spyDialogOpen = spyOn(component.dialog, 'open').and.callThrough();

    component.rooms = user.rooms;
    component.table = table;

    component.showEditRoomDialog(room);
    expect(spyDialogOpen).toHaveBeenCalled();
    expect(spyDialogOpen).toHaveBeenCalledWith(RoomFormDialogComponent, { data: { title: 'edit.room', room: room } });
  });

  it('should open dialog to add new rooms', () => {
    let spyDialogOpen = spyOn(component.dialog, 'open').and.callThrough();

    component.rooms = user.rooms;
    component.table = table;

    component.showAddRoomDialog();
    expect(spyDialogOpen).toHaveBeenCalled();
    expect(spyDialogOpen).toHaveBeenCalledWith(RoomFormDialogComponent, { data: { title: 'new.room', room: undefined} });
  });
});
