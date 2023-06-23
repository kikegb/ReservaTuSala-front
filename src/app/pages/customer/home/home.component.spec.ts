import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'src/app/material.module';
import { RoomsService } from 'src/app/global/services/rooms.service';
import { RoomsServiceMock } from 'src/test-helpers/mocks/rooms-service-mock';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRefMock } from 'src/test-helpers/mocks/mat-dialog-ref-mock';
import { Location } from 'src/app/global/interfaces/location.interface';
import { User } from 'src/app/global/interfaces/user.interface';
import { Room } from 'src/app/global/interfaces/room.interface';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { FilterDialogComponent } from './components/filter-dialog/filter-dialog.component';

describe('Customer HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: RoomsService;
  let router: Router;

  const roomsList = <Room[]>[
    {
      "id": 1,
      "business": <User>{name: 'Gloogel S.L.'},
      "location": <Location>{
        "id": 3,
        "street": "A street",
        "number": "5",
        "postcode": "12345",
        "town": "Testown",
        "province": "Testvince",
        "country": "Testland"
      },
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
      "business": <User>{name: 'Amaznot S.A.'},
      "location": <Location>{
        "id": 4,
        "street": "B street",
        "number": "54",
        "postcode": "12345",
        "town": "Testville",
        "province": "Testvince",
        "country": "Testland"
      },
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
        ReactiveFormsModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot()
      ],
      declarations: [ HomeComponent ],
      providers: [
        { provide: RoomsService, useValue: RoomsServiceMock },
        { provide: MatDialog, useValue: MatDialogRefMock },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) }
      ],
    })
    .compileComponents();

    router = TestBed.inject(Router);
    service = TestBed.inject(RoomsService)
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter rooms list by room name with search()', () => {
    spyOn(service, 'getRooms').and.returnValue(of(roomsList));
    component.searchForm.get('search')?.setValue("Room 2"); 

    component.search();
  
    expect(service.getRooms).toHaveBeenCalled();
    expect(component.rooms.length).toBe(1);
    expect(component.rooms).toEqual([roomsList[1]]);
  });

  it('should filter rooms list by business name with search()', () => {
    spyOn(service, 'getRooms').and.returnValue(of(roomsList));
    component.searchForm.get('search')?.setValue("Gloogel"); 

    component.search();
  
    expect(service.getRooms).toHaveBeenCalled();
    expect(component.rooms.length).toBe(1);
    expect(component.rooms).toEqual([roomsList[0]]);
  });

  it('should filter rooms list by location town with search()', () => {
    spyOn(service, 'getRooms').and.returnValue(of(roomsList));
    component.searchForm.get('search')?.setValue("Testown"); 

    component.search();
  
    expect(service.getRooms).toHaveBeenCalled();
    expect(component.rooms.length).toBe(1);
    expect(component.rooms).toEqual([roomsList[0]]);
  });

  it('should navigate to room details page with navigateDetails()', () => {
    component.navigateDetails(1);
    expect(router.navigate).toHaveBeenCalledWith(['customer/room-detail', 1]);
  });

  it('should open dialog to set search filters', () => {
    let spyDialogOpen = spyOn(component.dialog, 'open').and.callThrough();

    component.showFilterDialog();
    expect(spyDialogOpen).toHaveBeenCalled();
    expect(spyDialogOpen).toHaveBeenCalledWith(FilterDialogComponent, { data: { title: 'title.searchFilters', filters: null } });
  });
});
