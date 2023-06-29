import { TestBed } from '@angular/core/testing';

import { EditUserGuard } from './edit-user.guard';
import { TokenUtilsService } from '../services/token-utils.service';
import { TokenUtilsServiceMock } from 'src/test-helpers/mocks/token-utils-service-mock';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('EditUserGuard', () => {
  let guard: EditUserGuard;
  let service: TokenUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: TokenUtilsService, useValue: TokenUtilsServiceMock }
      ]
    });
    guard = TestBed.inject(EditUserGuard);
    service = TestBed.inject(TokenUtilsService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access if user is CUSTOMER, BUSINESS or ADMIN', () => {
    const authToken = "Bearer T0k3nV4lue$%gdjklasfl$_39";
    const decodedToken = {id: 1, role: 'CUSTOMER', name: 'Kusto Mer'};
    spyOn(localStorage, 'getItem').and.returnValue(authToken);
    spyOn(service, 'getDecodedToken').and.returnValue(decodedToken);
    const result = guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
    expect(result).toBe(true);
  });

  it('should allow access if user is CUSTOMER, BUSINESS or ADMIN', () => {
    const authToken = "Bearer T0k3nV4lue$%gdjklasfl$_39";
    const decodedToken = {id: 1, role: 'ADMIN', name: 'admin'};
    spyOn(localStorage, 'getItem').and.returnValue(authToken);
    spyOn(service, 'getDecodedToken').and.returnValue(decodedToken);
    const result = guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
    expect(result).toBe(true);
  });

  it('should allow access if user is CUSTOMER, BUSINESS or ADMIN', () => {
    const authToken = "Bearer T0k3nV4lue$%gdjklasfl$_39";
    const decodedToken = {id: 1, role: 'BUSINESS', name: 'Business S.L.'};
    spyOn(localStorage, 'getItem').and.returnValue(authToken);
    spyOn(service, 'getDecodedToken').and.returnValue(decodedToken);
    const result = guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
    expect(result).toBe(true);
  });

  it('should deny access if user is not CUSTOMER, BUSINESS or ADMIN', () => {
    const authToken = "Bearer T0k3nV4lue$%gdjklasfl$_39";
    const decodedToken = {id: 1, role: '', name: 'admin'};
    spyOn(localStorage, 'getItem').and.returnValue(authToken);
    spyOn(service, 'getDecodedToken').and.returnValue(decodedToken);
    const result = guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
    expect(result).toBe(false);
  });
});
