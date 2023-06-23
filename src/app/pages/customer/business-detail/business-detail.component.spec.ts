import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BusinessDetailComponent } from './business-detail.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { UsersService } from 'src/app/global/services/users.service';
import { UsersServiceMock } from 'src/test-helpers/mocks/users-service-mock';
import { User } from 'src/app/global/interfaces/user.interface';
import { Room } from 'src/app/global/interfaces/room.interface';
import { Location } from 'src/app/global/interfaces/location.interface';
import { MaterialModule } from 'src/app/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('Customer BusinessDetailComponent', () => {
  let component: BusinessDetailComponent;
  let fixture: ComponentFixture<BusinessDetailComponent>;
  let service: UsersService;
  let route: ActivatedRoute;

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
      declarations: [ BusinessDetailComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {snapshot: {paramMap: convertToParamMap({id: user.id})}}
        },
        { provide: UsersService, useValue: UsersServiceMock },
      ]
    })
    .compileComponents();

    route = TestBed.inject(ActivatedRoute);
    service = TestBed.inject(UsersService);
    fixture = TestBed.createComponent(BusinessDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get business info from api on init', () => {
    spyOn(service, 'getById').and.returnValue(of(user));

    component.ngOnInit();

    expect(service.getById).toHaveBeenCalledWith(user.id);
    expect(component.business).toEqual(user);
  });
});
