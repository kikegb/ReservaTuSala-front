import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { LoginService } from 'src/app/global/services/login.service';
import { LoginServiceMock } from 'src/test-helpers/mocks/login-service-mock';
import { Router } from '@angular/router';
import { SidenavService } from 'src/app/global/services/sidenav.service';
import { SidenavServiceMock } from 'src/test-helpers/mocks/sidenav-service-mock';
import { TokenUtilsService } from 'src/app/global/services/token-utils.service';
import { TokenUtilsServiceMock } from 'src/test-helpers/mocks/token-utils-service-mock';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: LoginService;
  let router: Router;
  let tokenUtilsSvc: TokenUtilsService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot()
      ],
      declarations: [ LoginComponent ],
      providers: [
        {provide: LoginService, useValue: LoginServiceMock},
        {provide: SidenavService, useValue: SidenavServiceMock},
        {provide: TokenUtilsService, useValue: TokenUtilsServiceMock},
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) }
      ],
    });

    router = TestBed.inject(Router);
    tokenUtilsSvc = TestBed.inject(TokenUtilsService);
    service = TestBed.inject(LoginService);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render "Log in" as main title', () => {
    expect(fixture.debugElement.nativeElement.textContent).toContain('actions.login');
  });

  it('should save authorization token and navigate to admin home page if user is ADMIN', () => {
    const authToken = "Bearer T0k3nV4lue$%gdjklasfl$_39";
    const decodedToken = {id: 1, role: 'ADMIN', name: 'admin'};

    spyOn(service, 'login').and.returnValue(of({Authorization: authToken}));
    spyOn(tokenUtilsSvc, 'setToken');
    spyOn(component, 'jwtDecode').and.returnValue(decodedToken);

    component.login();

    expect(tokenUtilsSvc.setToken).toHaveBeenCalledWith(authToken);
    expect(router.navigate).toHaveBeenCalledWith(['admin/home']);
  });

  it('should save authorization token and navigate to business home page if user is BUSINESS', () => {
    const authToken = "Bearer T0k3nV4lue$%gdjklasfl$_39";
    const decodedToken = {id: 1, role: 'BUSINESS', name: 'Business S.L.'};

    spyOn(service, 'login').and.returnValue(of({Authorization: authToken}));
    spyOn(tokenUtilsSvc, 'setToken');
    spyOn(component, 'jwtDecode').and.returnValue(decodedToken);

    component.login();

    expect(tokenUtilsSvc.setToken).toHaveBeenCalledWith(authToken);
    expect(router.navigate).toHaveBeenCalledWith(['business/home']);
  });

  it('should save authorization token and navigate to customer home page if user is CUSTOMER', () => {
    const authToken = "Bearer T0k3nV4lue$%gdjklasfl$_39";
    const decodedToken = {id: 1, role: 'CUSTOMER', name: 'Kusto Mer'};

    spyOn(service, 'login').and.returnValue(of({Authorization: authToken}));
    spyOn(tokenUtilsSvc, 'setToken');
    spyOn(component, 'jwtDecode').and.returnValue(decodedToken);

    component.login();

    expect(tokenUtilsSvc.setToken).toHaveBeenCalledWith(authToken);
    expect(router.navigate).toHaveBeenCalledWith(['customer/home']);
  });
});
