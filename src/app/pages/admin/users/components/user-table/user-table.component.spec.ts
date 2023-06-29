import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { DeleteDialogComponent } from 'src/app/global/components/delete-dialog/delete-dialog.component';
import { MaterialModule } from 'src/app/material.module';
import { MatDialogRefMock } from 'src/test-helpers/mocks/mat-dialog-ref-mock';
import { UsersServiceMock } from 'src/test-helpers/mocks/users-service-mock';
import { User } from 'src/app/global/interfaces/user.interface';
import { UserFormDialogComponent } from '../user-form-dialog/user-form-dialog.component';

import { UserTableComponent } from './user-table.component';
import { UsersService } from 'src/app/global/services/users.service';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('Admin UserTableComponent', () => {
  let component: UserTableComponent;
  let fixture: ComponentFixture<UserTableComponent>;
  let service: UsersService;

  let usersList = <User[]>[
    {
        "id": 1,
        "cnif": "87654321X",
        "name": "Business S.A.",
        "phone": "999999999",
        "password": "psswd",
        "email": "email@example.com",
        "role": "BUSINESS",
    },
    {
        "id": 2,
        "cnif": "12345678Y",
        "name": "Custo Mer",
        "phone": "999999999",
        "password": "p4ssw0rd",
        "email": "mail@mail.com",
        "role": "CUSTOMER",
    }
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot()
      ],
      declarations: [ UserTableComponent ],
      providers: [
        { provide: UsersService, useValue: UsersServiceMock },
        { provide: MatDialog, useValue: MatDialogRefMock }
      ],
    })
    .compileComponents();

    service = TestBed.inject(UsersService);
    fixture = TestBed.createComponent(UserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get users from api on init', () => {
    let spyServiceGet = spyOn(service, 'getUsers').and.returnValue(of(usersList));
    component.ngOnInit();
    expect(spyServiceGet).toHaveBeenCalled();
    expect(component.users.length).toBe(2);
  });

  it('should add new users to the list', () => {
    let newUser = <User>{
      "id": 3,
      "cnif": "12345678X",
      "name": "New Customer",
      "phone": "999999999",
      "password": "p4ssw0rd",
      "email": "email@email.com",
      "role": "CUSTOMER",
    };
    let spyServiceAdd = spyOn(service, 'addUser').and.returnValue(of(newUser));
    component.addUser(newUser);
    expect(spyServiceAdd).toHaveBeenCalled();
    expect(component.users.length).toBe(3);
  });

  it('should update users in the list', () => {
    let updatedUser = component.users[0];
    updatedUser.name = 'Business S.L.';
    updatedUser.email = 'business@mail.com';
    updatedUser.phone = '321654987';
    let spyServiceUpdate = spyOn(service, 'updateUser').and.returnValue(of(updatedUser));
    component.updateUser(updatedUser);
    expect(spyServiceUpdate).toHaveBeenCalled();
    expect(component.users.length).toBe(2);
  });

  it('should delete users in the list', () => {
    let userId = component.users[0].id;
    let spyServiceDelete = spyOn(service, 'deleteUser').and.returnValue(of({}));
    component.deleteUser(userId);
    expect(spyServiceDelete).toHaveBeenCalled();
    expect(component.users.length).toBe(1);
  });

  it('should open dialog to confirm user deletion', () => {
    let userId = component.users[0].id;
    let spyDialogOpen = spyOn(component.dialog, 'open').and.callThrough();
    component.showDeleteDialog(userId);
    expect(spyDialogOpen).toHaveBeenCalled();
    expect(spyDialogOpen).toHaveBeenCalledWith(DeleteDialogComponent, { data: { elementName: 'elements.user' } });
  });

  it('should open dialog to update a user', () => {
    let user = component.users[0];
    let spyDialogOpen = spyOn(component.dialog, 'open').and.callThrough();
    component.showEditUserDialog(user);
    expect(spyDialogOpen).toHaveBeenCalled();
    expect(spyDialogOpen).toHaveBeenCalledWith(UserFormDialogComponent, { data: { title: 'edit.user', user: user } });
  });

  it('should open dialog to add new users', () => {
    let spyDialogOpen = spyOn(component.dialog, 'open').and.callThrough();
    component.showAddUserDialog();
    expect(spyDialogOpen).toHaveBeenCalled();
    expect(spyDialogOpen).toHaveBeenCalledWith(UserFormDialogComponent, { data: { title: 'new.user', user: undefined} });
  });
});
