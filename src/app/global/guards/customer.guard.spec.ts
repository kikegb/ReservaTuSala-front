import { TestBed } from '@angular/core/testing';

import { CustomerGuard } from './customer.guard';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('CustomerGuard', () => {
  let guard: CustomerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CustomerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access if user is CUSTOMER', () => {
    const authToken = "Bearer T0k3nV4lue$%gdjklasfl$_39";
    const decodedToken = {id: 1, role: 'CUSTOMER', name: 'Kusto Mer'};
    spyOn(localStorage, 'getItem').and.returnValue(authToken);
    spyOn(guard, 'jwtDecode').and.returnValue(decodedToken);
    const result = guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
    expect(result).toBe(true);
  });

  it('should deny access if user is not CUSTOMER', () => {
    const authToken = "Bearer T0k3nV4lue$%gdjklasfl$_39";
    const decodedToken = {id: 1, role: 'ADMIN', name: 'admin'};
    spyOn(localStorage, 'getItem').and.returnValue(authToken);
    spyOn(guard, 'jwtDecode').and.returnValue(decodedToken);
    const result = guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
    expect(result).toBe(false);
  });
});
