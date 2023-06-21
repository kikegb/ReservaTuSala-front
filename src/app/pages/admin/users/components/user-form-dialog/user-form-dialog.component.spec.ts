import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material.module';
import { MatDialogRefMock } from 'src/test-helpers/mocks/mat-dialog-ref-mock';

import { UserFormDialogComponent } from './user-form-dialog.component';
import { User } from 'src/app/global/interfaces/user.interface';

describe('UserFormDialogComponent', () => {
  let component: UserFormDialogComponent;
  let fixture: ComponentFixture<UserFormDialogComponent>;

  const mockDialogData = {
    title: 'Edit user',
    user: <User>{
      id: 1,
      cnif: "12345678X",
      name: "Name",
      phone: "123456789",
      email: "mail@mail.com",
      password: "psswd123",
      role: "CUSTOMER"
    }
  };

  const mockDialogDataNoUser = {
    title: 'Add user'
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      declarations: [ UserFormDialogComponent ],
      providers: [
        {provide: MatDialogRef, useValue: MatDialogRefMock},
        {provide: MAT_DIALOG_DATA, useValue: {}}
      ],
    });
  }));

  it('should create', () => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(UserFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it('should create empty form if empty user data provided', () => {
    TestBed.overrideProvider(MAT_DIALOG_DATA, {useValue: mockDialogDataNoUser});
    TestBed.compileComponents();
    fixture = TestBed.createComponent(UserFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.userForm.value.name).toBeNull();
    expect(component.userForm.value.cnif).toBeNull();
    expect(component.userForm.value.email).toBeNull();
    expect(component.userForm.value.password).toBeNull();
    expect(component.userForm.value.phone).toBeNull();
    expect(component.userForm.value.role).toBeNull();
    expect(component.userForm.value.deleted).toBeFalse();
  });

  it('should create form with user data provided', () => {
    TestBed.overrideProvider(MAT_DIALOG_DATA, {useValue: mockDialogData});
    TestBed.compileComponents();
    fixture = TestBed.createComponent(UserFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.userForm.value.name).toEqual(mockDialogData.user.name);
    expect(component.userForm.value.cnif).toEqual(mockDialogData.user.cnif);
    expect(component.userForm.value.email).toEqual(mockDialogData.user.email);
    expect(component.userForm.value.password).toEqual(mockDialogData.user.password);
    expect(component.userForm.value.phone).toEqual(mockDialogData.user.phone);
    expect(component.userForm.value.role).toEqual(mockDialogData.user.role);
  });

  it('should close and return undefined when calling onCancel method', () => {
    TestBed.overrideProvider(MAT_DIALOG_DATA, {useValue: mockDialogData});
    TestBed.compileComponents();
    fixture = TestBed.createComponent(UserFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const spyDialogClose = spyOn(component.dialogRef, 'close');
    component.onCancel();
    expect(spyDialogClose).toHaveBeenCalled();
    expect(spyDialogClose).toHaveBeenCalledWith(undefined);
  });

  it('should close and return empty user when calling onSave method and no user data provided', () => {
    TestBed.overrideProvider(MAT_DIALOG_DATA, {useValue: mockDialogDataNoUser});
    TestBed.compileComponents();
    fixture = TestBed.createComponent(UserFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    let nullUser = {
      cnif: null,
      name: null,
      phone: null,
      email: null,
      password: null,
      role: null,
      deleted: false
    };

    const spyDialogClose = spyOn(component.dialogRef, 'close');
    component.onSave();
    expect(spyDialogClose).toHaveBeenCalled();
    expect(spyDialogClose).toHaveBeenCalledWith(nullUser);
  });

  it('should close and return not empty user when calling onSave method and user data provided', () => {
    TestBed.overrideProvider(MAT_DIALOG_DATA, {useValue: mockDialogData});
    TestBed.compileComponents();
    fixture = TestBed.createComponent(UserFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const spyDialogClose = spyOn(component.dialogRef, 'close');
    component.onSave();
    expect(spyDialogClose).toHaveBeenCalled();
    expect(spyDialogClose).toHaveBeenCalledWith(mockDialogData.user);
  });
});
