import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import { UsersService } from 'src/app/global/services/users.service';
import { UsersServiceMock } from 'src/test-helpers/mocks/users-service-mock';
import { LoginService } from 'src/app/global/services/login.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SidenavService } from 'src/app/global/services/sidenav.service';
import { TokenUtilsService } from 'src/app/global/services/token-utils.service';
import { MaterialModule } from 'src/app/material.module';
import { LoginServiceMock } from 'src/test-helpers/mocks/login-service-mock';
import { SidenavServiceMock } from 'src/test-helpers/mocks/sidenav-service-mock';
import { TokenUtilsServiceMock } from 'src/test-helpers/mocks/token-utils-service-mock';
import { of } from 'rxjs';
import { User } from 'src/app/global/interfaces/user.interface';
import { Operation } from 'src/app/global/interfaces/operation.interface';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let loginSvc: LoginService;
  let userSvc: UsersService;
  let router: Router;
  let tokenUtilsSvc: TokenUtilsService;

  const user = <User>{
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
      declarations: [ SignUpComponent ],
      providers: [
        {provide: LoginService, useValue: LoginServiceMock},
        {provide: UsersService, useValue: UsersServiceMock},
        {provide: SidenavService, useValue: SidenavServiceMock},
        {provide: TokenUtilsService, useValue: TokenUtilsServiceMock},
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) }
      ],
    });

    router = TestBed.inject(Router);
    tokenUtilsSvc = TestBed.inject(TokenUtilsService);
    loginSvc = TestBed.inject(LoginService);
    userSvc = TestBed.inject(UsersService);
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
    spyOn(tokenUtilsSvc, 'setToken').and.callFake(() => {});
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render "Sign up" as main title', () => {
    expect(fixture.debugElement.nativeElement.textContent).toContain('actions.signup');
  });

  it('should create new user, log in and navigate to admin home page if user is ADMIN', () => {
    const authToken = "Bearer T0k3nV4lue$%gdjklasfl$_39";
    const decodedToken = {id: 1, role: 'ADMIN', name: 'admin'};
    const newUser = {
      ...user,
      role: "ADMIN",
      businessOperations: <Operation[]>[],
      customerOperations: <Operation[]>[]
    }
    component.userForm.patchValue(newUser);
    

    spyOn(loginSvc, 'login').and.returnValue(of({Authorization: authToken}));
    spyOn(userSvc, 'addUser').and.returnValue(of(newUser));
    spyOn(component, 'jwtDecode').and.returnValue(decodedToken);

    component.signUp();

    expect(loginSvc.login).toHaveBeenCalledWith(user.email, user.password);
    expect(userSvc.addUser).toHaveBeenCalledWith(newUser);
    expect(router.navigate).toHaveBeenCalledWith(['admin/home']);
  });

  it('should create new user, log in and navigate to business home page if user is BUSINESS', () => {
    const authToken = "Bearer T0k3nV4lue$%gdjklasfl$_39";
    const decodedToken = {id: 1, role: 'BUSINESS', name: 'Business S.L.'};
    const newUser = {
      ...user,
      businessOperations: <Operation[]>[],
      customerOperations: <Operation[]>[]
    }
    component.userForm.patchValue(newUser);

    spyOn(loginSvc, 'login').and.returnValue(of({Authorization: authToken}));
    spyOn(userSvc, 'addUser').and.returnValue(of(newUser));
    spyOn(component, 'jwtDecode').and.returnValue(decodedToken);

    component.signUp();

    expect(loginSvc.login).toHaveBeenCalledWith(user.email, user.password);
    expect(userSvc.addUser).toHaveBeenCalledWith(newUser);
    expect(router.navigate).toHaveBeenCalledWith(['business/home']);
  });

  it('should create new user, log in and navigate to customer home page if user is CUSTOMER', () => {
    const authToken = "Bearer T0k3nV4lue$%gdjklasfl$_39";
    const decodedToken = {id: 1, role: 'CUSTOMER', name: 'Kusto Mer'};
    const newUser = {
      ...user,
      role: "CUSTOMER",
      businessOperations: <Operation[]>[],
      customerOperations: <Operation[]>[]
    }
    component.userForm.patchValue(newUser);
    

    spyOn(loginSvc, 'login').and.returnValue(of({Authorization: authToken}));
    spyOn(userSvc, 'addUser').and.returnValue(of(newUser));
    spyOn(component, 'jwtDecode').and.returnValue(decodedToken);

    component.signUp();

    expect(loginSvc.login).toHaveBeenCalledWith(user.email, user.password);
    expect(userSvc.addUser).toHaveBeenCalledWith(newUser);
    expect(router.navigate).toHaveBeenCalledWith(['customer/home']);
  });
});
