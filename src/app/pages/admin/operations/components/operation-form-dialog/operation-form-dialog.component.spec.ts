import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OperationFormDialogComponent } from './operation-form-dialog.component';
import { Operation } from 'src/app/global/interfaces/operation.interface';
import { Room } from 'src/app/global/interfaces/room.interface';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogRefMock } from 'src/test-helpers/mocks/mat-dialog-ref-mock';
import { User } from 'src/app/global/interfaces/user.interface';
import { UsersService } from 'src/app/global/services/users.service';
import { UsersServiceMock } from 'src/test-helpers/mocks/users-service-mock';
import { RoomsService } from 'src/app/global/services/rooms.service';
import { RoomsServiceMock } from 'src/test-helpers/mocks/rooms-service-mock';
import { OperationsService } from 'src/app/global/services/operations.service';
import { OperationsServiceMock } from 'src/test-helpers/mocks/operations-service-mock';

describe('Admin OperationFormDialogComponent', () => {
  let component: OperationFormDialogComponent;
  let fixture: ComponentFixture<OperationFormDialogComponent>;

  const mockDialogData = {
    title: 'edit.operation',
    operation: <Operation>{
      id: 1,
      customer: <User>{},
      business: <User>{},
      room: <Room>{},
      start: new Date("2023-06-01T12:00:00"),
      end: new Date("2023-06-01T16:00:00"),
      cost: 65.20,
      status: "APPROVED"
    }
  };

  const mockDialogDataNoOperation = {
    title: 'new.operation'
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot()
      ],
      declarations: [ OperationFormDialogComponent ],
      providers: [
        {provide: MatDialogRef, useValue: MatDialogRefMock},
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: UsersService, useValue: UsersServiceMock},
        {provide: RoomsService, useValue: RoomsServiceMock},
        {provide: OperationsService, useValue: OperationsServiceMock}
      ],
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create empty form if empty operation data provided', () => {
    TestBed.overrideProvider(MAT_DIALOG_DATA, {useValue: mockDialogDataNoOperation});
    TestBed.compileComponents();
    fixture = TestBed.createComponent(OperationFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.operationForm.value.customer).toBeNull();
    expect(component.operationForm.value.business).toBeNull();
    expect(component.operationForm.value.room).toBeNull();
    expect(component.operationForm.value.date).toBeNull();
    expect(component.operationForm.value.startHour).toBeNull();
    expect(component.operationForm.value.endHour).toBeNull();
    expect(component.operationForm.value.cost).toBeNull();
    expect(component.operationForm.value.status).toBeNull();
  });

  it('should create form with operation data provided', () => {
    TestBed.overrideProvider(MAT_DIALOG_DATA, {useValue: mockDialogData});
    TestBed.compileComponents();
    fixture = TestBed.createComponent(OperationFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.operationForm.value.customer).toEqual(mockDialogData.operation.customer);
    expect(component.operationForm.value.business).toEqual(mockDialogData.operation.business);
    expect(component.operationForm.value.room).toEqual(mockDialogData.operation.room);
    expect(component.operationForm.value.date.toDateString()).toEqual(mockDialogData.operation.start.toDateString());
    expect(component.operationForm.value.startHour).toEqual(mockDialogData.operation.start.getHours());
    expect(component.operationForm.value.endHour).toEqual(mockDialogData.operation.end.getHours());
    expect(component.operationForm.value.cost).toEqual(mockDialogData.operation.cost);
    expect(component.operationForm.value.status).toEqual(mockDialogData.operation.status);
  });

  it('should close and return undefined when calling onCancel method', () => {
    TestBed.overrideProvider(MAT_DIALOG_DATA, {useValue: mockDialogData});
    TestBed.compileComponents();
    fixture = TestBed.createComponent(OperationFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const spyDialogClose = spyOn(component.dialogRef, 'close');
    component.onCancel();
    expect(spyDialogClose).toHaveBeenCalled();
    expect(spyDialogClose).toHaveBeenCalledWith(undefined);
  });

  it('should close and return empty operation when calling onSave method and no operation data provided', () => {
    TestBed.overrideProvider(MAT_DIALOG_DATA, {useValue: mockDialogDataNoOperation});
    TestBed.compileComponents();
    fixture = TestBed.createComponent(OperationFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    let nullOperation = {
      id: undefined,
      customer: null,
      business: null,
      room: null,
      start: new Date("1970-01-01T00:00:00"),
      end: new Date("1970-01-01T00:00:00"),
      cost: null,
      status: null
    };

    const spyDialogClose = spyOn(component.dialogRef, 'close');
    component.onSave();
    expect(spyDialogClose).toHaveBeenCalled();
    expect(spyDialogClose).toHaveBeenCalledWith(nullOperation);
  });

  it('should close and return not empty operation when calling onSave method and operation data provided', () => {
    TestBed.overrideProvider(MAT_DIALOG_DATA, {useValue: mockDialogData});
    TestBed.compileComponents();
    fixture = TestBed.createComponent(OperationFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const spyDialogClose = spyOn(component.dialogRef, 'close');
    component.onSave();
    expect(spyDialogClose).toHaveBeenCalled();
    expect(spyDialogClose).toHaveBeenCalledWith(mockDialogData.operation);
  });
});
