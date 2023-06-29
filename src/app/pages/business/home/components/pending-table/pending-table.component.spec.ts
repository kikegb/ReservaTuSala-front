import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PendingTableComponent } from './pending-table.component';
import { UsersService } from 'src/app/global/services/users.service';
import { UsersServiceMock } from 'src/test-helpers/mocks/users-service-mock';
import { OperationsService } from 'src/app/global/services/operations.service';
import { OperationsServiceMock } from 'src/test-helpers/mocks/operations-service-mock';
import { MaterialModule } from 'src/app/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { User } from 'src/app/global/interfaces/user.interface';
import { Room } from 'src/app/global/interfaces/room.interface';
import { of } from 'rxjs';
import { MatTable } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('Business PendingTableComponent', () => {
  let component: PendingTableComponent;
  let fixture: ComponentFixture<PendingTableComponent>;
  let userSvc: UsersService;
  let operationSvc: OperationsService;
  let table: jasmine.SpyObj<MatTable<any>>;

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

  beforeEach(waitForAsync( () => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot()
      ],
      declarations: [ PendingTableComponent ],
      providers: [
        { provide: UsersService, useValue: UsersServiceMock },
        { provide: OperationsService, useValue: OperationsServiceMock },
        { provide: MatTable, useValue: jasmine.createSpyObj('MatTable', ['renderRows']) }
      ]
    })
    .compileComponents();

    table = TestBed.inject(MatTable) as jasmine.SpyObj<MatTable<any>>;
    userSvc = TestBed.inject(UsersService);
    operationSvc = TestBed.inject(OperationsService);
    fixture = TestBed.createComponent(PendingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get pending operations from api on init', () => {
    const authToken = "Bearer T0k3nV4lue$%gdjklasfl$_39";
    const decodedToken = {id: 1, role: 'BUSINESS', name: 'Business S.L.'};

    spyOn(userSvc, 'getById').and.returnValue(of(user));
    spyOn(localStorage, 'getItem').and.returnValue(authToken);
    spyOn(component, 'jwtDecode').and.returnValue(decodedToken);

    component.ngOnInit();
    
    expect(userSvc.getById).toHaveBeenCalledWith(decodedToken.id);
    expect(component.pendingOperations.length).toBe(2);
    expect(component.pendingOperations).toEqual([user.businessOperations[1], user.businessOperations[2]])
  });

  it('should update a operation status with updateStatus() and remove from table', () => {
    const operation = user.businessOperations[1];
    const newStatus = 'CANCELLED';
    const updatedOperation = { ...operation, status: newStatus };

    spyOn(operationSvc, 'updateOperation').and.returnValue(of(updatedOperation));

    component.pendingOperations = [user.businessOperations[1], user.businessOperations[2]];
    component.table = table;

    component.updateStatus(operation, newStatus);

    expect(operationSvc.updateOperation).toHaveBeenCalledWith(updatedOperation);
    expect(component.pendingOperations).not.toContain(operation);
    expect(component.pendingOperations.length).toBe(1);
    expect(table.renderRows).toHaveBeenCalled();
  });
});
