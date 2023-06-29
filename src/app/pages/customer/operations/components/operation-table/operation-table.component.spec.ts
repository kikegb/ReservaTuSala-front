import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OperationTableComponent } from './operation-table.component';
import { OperationsService } from 'src/app/global/services/operations.service';
import { MaterialModule } from 'src/app/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { OperationsServiceMock } from 'src/test-helpers/mocks/operations-service-mock';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRefMock } from 'src/test-helpers/mocks/mat-dialog-ref-mock';
import { of } from 'rxjs';
import { Room } from 'src/app/global/interfaces/room.interface';
import { User } from 'src/app/global/interfaces/user.interface';
import { UsersService } from 'src/app/global/services/users.service';
import { UsersServiceMock } from 'src/test-helpers/mocks/users-service-mock';
import { MatTable } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('Customer OperationTableComponent', () => {
  let component: OperationTableComponent;
  let fixture: ComponentFixture<OperationTableComponent>;
  let operationsSvc: OperationsService;
  let usersSvc: UsersService;
  let table: jasmine.SpyObj<MatTable<any>>;
  
  const user = <User>{
    "id": 1,
    "cnif": "87654321X",
    "name": "Kusto Mer",
    "phone": "999999999",
    "password": "psswd",
    "email": "email@example.com",
    "role": "CUSTOMER",
    "rooms": [],
    "businessOperations": [],
    "customerOperations": [
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
        BrowserAnimationsModule,
        TranslateModule.forRoot()
      ],
      declarations: [ OperationTableComponent ],
      providers: [
        { provide: OperationsService, useValue: OperationsServiceMock },
        { provide: MatDialog, useValue: MatDialogRefMock },
        { provide: UsersService, useValue: UsersServiceMock },
        { provide: MatTable, useValue: jasmine.createSpyObj('MatTable', ['renderRows']) }
      ],
    })
    .compileComponents();

    table = TestBed.inject(MatTable) as jasmine.SpyObj<MatTable<any>>;
    operationsSvc = TestBed.inject(OperationsService);
    usersSvc = TestBed.inject(UsersService);
    fixture = TestBed.createComponent(OperationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get customer operations from api on init', () => {
    const authToken = "Bearer T0k3nV4lue$%gdjklasfl$_39";
    const decodedToken = {id: 1, role: 'CUSTOMER', name: 'Kusto Mer'};

    spyOn(usersSvc, 'getById').and.returnValue(of(user));
    spyOn(localStorage, 'getItem').and.returnValue(authToken);
    spyOn(component, 'jwtDecode').and.returnValue(decodedToken);

    component.ngOnInit();

    expect(usersSvc.getById).toHaveBeenCalledWith(decodedToken.id);
    expect(component.operations.length).toBe(3);
    expect(component.operations).toEqual(user.customerOperations);
  });

  it('should update a operation status with updateStatus()', () => {
    const operation = user.customerOperations[1];
    const newStatus = 'CANCELLED';
    const updatedOperation = { ...operation, status: newStatus };

    spyOn(operationsSvc, 'updateOperation').and.returnValue(of(updatedOperation));

    component.operations = user.customerOperations;
    component.table = table;

    component.updateStatus(operation, newStatus);

    expect(operationsSvc.updateOperation).toHaveBeenCalledWith(updatedOperation);
    expect(component.operations.length).toBe(3);
    expect(component.operations[1]).toEqual(updatedOperation);
    expect(table.renderRows).toHaveBeenCalled();
  });
});
