import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RoomDetailComponent } from './room-detail.component';
import { MaterialModule } from 'src/app/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RoomsService } from 'src/app/global/services/rooms.service';
import { RoomsServiceMock } from 'src/test-helpers/mocks/rooms-service-mock';
import { Room } from 'src/app/global/interfaces/room.interface';
import { Location } from 'src/app/global/interfaces/location.interface';
import { User } from 'src/app/global/interfaces/user.interface';
import { of } from 'rxjs';
import { OperationsService } from 'src/app/global/services/operations.service';
import { OperationsServiceMock } from 'src/test-helpers/mocks/operations-service-mock';
import { Operation } from 'src/app/global/interfaces/operation.interface';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('Customer RoomDetailComponent', () => {
  let component: RoomDetailComponent;
  let fixture: ComponentFixture<RoomDetailComponent>;
  let service: RoomsService;
  let route: ActivatedRoute;
  let router: Router;
  let operationSvc: OperationsService;

  const room: Room =  {
    "id": 1,
    "business": <User>{id: 10},
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
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot()
      ],
      declarations: [ RoomDetailComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {snapshot: {paramMap: convertToParamMap({id: room.id})}}
        },
        { provide: RoomsService, useValue: RoomsServiceMock },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) },
        { provide: OperationsService, useValue: OperationsServiceMock },
      ]
    })
    .compileComponents();

    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    service = TestBed.inject(RoomsService);
    operationSvc = TestBed.inject(OperationsService);
    fixture = TestBed.createComponent(RoomDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get business info from api on init', () => {
    spyOn(service, 'getById').and.returnValue(of(room));

    component.ngOnInit();

    expect(service.getById).toHaveBeenCalledWith(room.id);
    expect(component.room).toEqual(room);
  });

  it('should navigate to business details page with navigateDetails()', () => {
    component.navigateDetails(10);
    expect(router.navigate).toHaveBeenCalledWith(['customer/business-detail', 10]);
  });

  it('should add new operation and navigate to home page with createOperation()', () => {
    const authToken = "Bearer T0k3nV4lue$%gdjklasfl$_39";
    const decodedToken = {id: 1, role: 'CUSTOMER', name: 'Kusto Mer'};
    const newOperation = <Operation>{
      customer: <User>{id: 1},
      business: room.business,
      room: room,
      start: new Date("2023-06-01T12:00:00"),
      end: new Date("2023-06-01T17:00:00"),
      cost: 65.50,
      status: "PENDING"
    };

    component.operationForm.value.date = new Date("2023-06-01T00:00:00");
    component.operationForm.value.startHour = 12;
    component.operationForm.value.endHour = 17;
    component.cost = 65.50;
    component.room = room;

    spyOn(localStorage, 'getItem').and.returnValue(authToken);
    spyOn(component, 'jwtDecode').and.returnValue(decodedToken);
    spyOn(operationSvc, 'addOperation').and.returnValue(of(newOperation));

    component.createOperation();

    expect(operationSvc.addOperation).toHaveBeenCalledWith(newOperation);
    expect(component.operations.length).toBe(3);
    expect(component.operations).toContain(newOperation);
    expect(router.navigate).toHaveBeenCalledWith(['customer/home']);
  });
});
