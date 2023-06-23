import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TodayTableComponent } from './today-table.component';
import { UsersService } from 'src/app/global/services/users.service';
import { UsersServiceMock } from 'src/test-helpers/mocks/users-service-mock';
import { MaterialModule } from 'src/app/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { User } from 'src/app/global/interfaces/user.interface';
import { Room } from 'src/app/global/interfaces/room.interface';

describe('Business TodayTableComponent', () => {
  let component: TodayTableComponent;
  let fixture: ComponentFixture<TodayTableComponent>;
  let service: UsersService;

  const user = <User>{
    "id": 1,
    "cnif": "87654321X",
    "name": "Business S.L.",
    "phone": "999999999",
    "password": "psswd",
    "email": "email@example.com",
    "role": "BUSINESS",
    "rooms": [],
    "customerOperations": [],
    "businessOperations": [
      {
        "id": 2,
        "customer": <User>{},
        "business": <User>{},
        "room": <Room>{},
        "start": new Date(),
        "end": new Date(),
        "cost": 65.20,
        "status": "APPROVED"
      },
      {
        "id": 3,
        "customer": <User>{},
        "business": <User>{},
        "room": <Room>{},
        "start": new Date("2023-06-18T10:00:00"),
        "end": new Date("2023-06-18T13:00:00"),
        "cost": 42.50,
        "status": "PENDING"
      },
      {
        "id": 4,
        "customer": <User>{},
        "business": <User>{},
        "room": <Room>{},
        "start": new Date(),
        "end": new Date(),
        "cost": 40.52,
        "status": "PENDING"
      }
    ]
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        TranslateModule.forRoot()
      ],
      declarations: [ TodayTableComponent ],
      providers: [
        { provide: UsersService, useValue: UsersServiceMock }
      ]
    })
    .compileComponents();

    service = TestBed.inject(UsersService);
    fixture = TestBed.createComponent(TodayTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get today operations from api on init', () => {
    const authToken = "Bearer T0k3nV4lue$%gdjklasfl$_39";
    const decodedToken = {id: 1, role: 'BUSINESS', name: 'Business S.L.'};

    spyOn(service, 'getById').and.returnValue(of(user));
    spyOn(localStorage, 'getItem').and.returnValue(authToken);
    spyOn(component, 'jwtDecode').and.returnValue(decodedToken);

    component.ngOnInit();

    expect(service.getById).toHaveBeenCalledWith(decodedToken.id);
    expect(component.todayOperations.length).toBe(2);
    expect(component.todayOperations).toEqual([user.businessOperations[0], user.businessOperations[2]])
  });
});
