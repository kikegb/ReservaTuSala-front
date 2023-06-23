import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditUserComponent } from './edit-user.component';
import { UsersService } from 'src/app/global/services/users.service';
import { UsersServiceMock } from 'src/test-helpers/mocks/users-service-mock';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'src/app/material.module';
import { User } from 'src/app/global/interfaces/user.interface';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('EditUserComponent', () => {
  let component: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;
  let service: UsersService;
  let router: Router;

  const user = <User>{
    id: 1,
    cnif: "87654321X",
    name: "Business S.L.",
    phone: "999999999",
    password: "psswd",
    email: "email@example.com",
    role: "BUSINESS",
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot()
      ],
      declarations: [ EditUserComponent ],
      providers: [
        {provide: UsersService, useValue: UsersServiceMock},
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) }
      ],
    });

    router = TestBed.inject(Router);
    service = TestBed.inject(UsersService);
    fixture = TestBed.createComponent(EditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form with user data on init', () => {
    const authToken = "Bearer T0k3nV4lue$%gdjklasfl$_39";
    const decodedToken = {id: 1, role: 'BUSINESS', name: 'Business S.L.'};

    spyOn(service, 'getById').and.returnValue(of(user));
    spyOn(localStorage, 'getItem').and.returnValue(authToken);
    spyOn(component, 'jwtDecode').and.returnValue(decodedToken);

    component.ngOnInit();

    expect(component.userForm.value.name).toEqual(user.name);
    expect(component.userForm.value.cnif).toEqual(user.cnif);
    expect(component.userForm.value.email).toEqual(user.email);
    expect(component.userForm.value.password).toEqual(user.password);
    expect(component.userForm.value.passwordConf).toEqual(user.password);
    expect(component.userForm.value.phone).toEqual(user.phone);
    expect(component.userForm.value.role).toEqual(user.role);
  });

  it('should navigate to admin home page without updating user when admin user cancels', () => {
    const authToken = "Bearer T0k3nV4lue$%gdjklasfl$_39";
    const decodedToken = {id: 1, role: 'ADMIN', name: 'admin'};

    spyOn(service, 'updateUser').and.returnValue(of(user));
    spyOn(localStorage, 'getItem').and.returnValue(authToken);
    spyOn(component, 'jwtDecode').and.returnValue(decodedToken);

    component.onCancel();

    expect(service.updateUser).not.toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['admin/home']);
  });

  it('should navigate to business home page without updating user when business user cancels', () => {
    const authToken = "Bearer T0k3nV4lue$%gdjklasfl$_39";
    const decodedToken = {id: 1, role: 'BUSINESS', name: 'Business S.L.'};

    spyOn(service, 'updateUser').and.returnValue(of(user));
    spyOn(localStorage, 'getItem').and.returnValue(authToken);
    spyOn(component, 'jwtDecode').and.returnValue(decodedToken);

    component.onCancel();

    expect(service.updateUser).not.toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['business/home']);
  });

  it('should navigate to customer home page without updating user when customer user cancels', () => {
    const authToken = "Bearer T0k3nV4lue$%gdjklasfl$_39";
    const decodedToken = {id: 1, role: 'CUSTOMER', name: 'Kusto Mer'};

    spyOn(service, 'updateUser').and.returnValue(of(user));
    spyOn(localStorage, 'getItem').and.returnValue(authToken);
    spyOn(component, 'jwtDecode').and.returnValue(decodedToken);

    component.onCancel();

    expect(service.updateUser).not.toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['customer/home']);
  });

  it('should update user and navigate to home page on save', () => {
    const authToken = "Bearer T0k3nV4lue$%gdjklasfl$_39";
    const decodedToken = {id: 1, role: 'CUSTOMER', name: 'Kusto Mer'};
    component.user = user;
    component.userForm.patchValue(user);

    spyOn(service, 'updateUser').and.returnValue(of(user));
    spyOn(localStorage, 'getItem').and.returnValue(authToken);
    spyOn(component, 'jwtDecode').and.returnValue(decodedToken);

    component.onSave();

    expect(service.updateUser).toHaveBeenCalledWith(user);
    expect(component.user).toEqual(user);
    expect(router.navigate).toHaveBeenCalledWith(['customer/home']);
  });
});
