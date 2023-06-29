import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OperationTableComponent } from './operation-table.component';
import { OperationsService } from 'src/app/global/services/operations.service';
import { MaterialModule } from 'src/app/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { OperationsServiceMock } from 'src/test-helpers/mocks/operations-service-mock';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRefMock } from 'src/test-helpers/mocks/mat-dialog-ref-mock';
import { Operation } from 'src/app/global/interfaces/operation.interface';
import { of } from 'rxjs';
import { Room } from 'src/app/global/interfaces/room.interface';
import { User } from 'src/app/global/interfaces/user.interface';
import { DeleteDialogComponent } from 'src/app/global/components/delete-dialog/delete-dialog.component';
import { OperationFormDialogComponent } from '../operation-form-dialog/operation-form-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('Admin OperationTableComponent', () => {
  let component: OperationTableComponent;
  let fixture: ComponentFixture<OperationTableComponent>;
  let service: OperationsService;
  
  const operationsList = <Operation[]>[
    {
      "id": 1,
      "customer": <User>{},
      "business": <User>{},
      "room": <Room>{},
      "start": new Date("2023-06-01T12:00:00"),
      "end": new Date("2023-06-01T16:00:00"),
      "cost": 65.20,
      "status": "APPROVED"
    },
    {
      "id": 2,
      "customer": <User>{},
      "business": <User>{},
      "room": <Room>{},
      "start": new Date("2023-06-18T10:00:00"),
      "end": new Date("2023-06-18T13:00:00"),
      "cost": 42.50,
      "status": "PENDING"
    },
  ];

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
        { provide: MatDialog, useValue: MatDialogRefMock }
      ],
    })
    .compileComponents();

    service = TestBed.inject(OperationsService);
    fixture = TestBed.createComponent(OperationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get operations from api on init', () => {
    let spyServiceGet = spyOn(service, 'getOperations').and.returnValue(of(operationsList));
    component.ngOnInit();
    expect(spyServiceGet).toHaveBeenCalled();
    expect(component.operations.length).toBe(2);
  });

  it('should add new operations to the list', () => {
    let newOperation = <Operation>{
      "id": 3,
      "customer": <User>{},
      "business": <User>{},
      "room": <Room>{},
      "start": new Date("2023-06-11T15:00:00"),
      "end": new Date("2023-06-11T20:00:00"),
      "cost": 23.00,
      "status": "PENDING"
    };
    let spyServiceAdd = spyOn(service, 'addOperation').and.returnValue(of(newOperation));
    component.addOperation(newOperation);
    expect(spyServiceAdd).toHaveBeenCalled();
    expect(component.operations.length).toBe(3);
  });

  it('should update operations in the list', () => {
    let updatedOperation = component.operations[0];
    updatedOperation.start = new Date("2023-06-11T13:00:00");
    updatedOperation.end = new Date("2023-06-11T18:00:00");
    updatedOperation.cost = 20.50;
    let spyServiceUpdate = spyOn(service, 'updateOperation').and.returnValue(of(updatedOperation));
    component.updateOperation(updatedOperation);
    expect(spyServiceUpdate).toHaveBeenCalled();
    expect(component.operations.length).toBe(2);
  });

  it('should delete operations in the list', () => {
    let operationId = component.operations[0].id;
    let spyServiceDelete = spyOn(service, 'deleteOperation').and.returnValue(of({}));
    component.deleteOperation(operationId);
    expect(spyServiceDelete).toHaveBeenCalled();
    expect(component.operations.length).toBe(1);
  });

  it('should open dialog to confirm operation deletion', () => {
    let operationId = component.operations[0].id;
    let spyDialogOpen = spyOn(component.dialog, 'open').and.callThrough();
    component.showDeleteDialog(operationId);
    expect(spyDialogOpen).toHaveBeenCalled();
    expect(spyDialogOpen).toHaveBeenCalledWith(DeleteDialogComponent, { data: { elementName: 'elements.operation' } });
  });

  it('should open dialog to update a operation', () => {
    let operation = component.operations[0];
    let spyDialogOpen = spyOn(component.dialog, 'open').and.callThrough();
    component.showEditOperationDialog(operation);
    expect(spyDialogOpen).toHaveBeenCalled();
    expect(spyDialogOpen).toHaveBeenCalledWith(OperationFormDialogComponent, { data: { title: 'edit.operation', operation: operation } });
  });

  it('should open dialog to add new operations', () => {
    let spyDialogOpen = spyOn(component.dialog, 'open').and.callThrough();
    component.showAddOperationDialog();
    expect(spyDialogOpen).toHaveBeenCalled();
    expect(spyDialogOpen).toHaveBeenCalledWith(OperationFormDialogComponent, { data: { title: 'new.operation', operation: undefined} });
  });
});
