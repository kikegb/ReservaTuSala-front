import { TestBed } from '@angular/core/testing';

import { AdminGuard } from './admin.guard';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('AdminGuard', () => {
  let guard: AdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access if user is ADMIN', () => {
    const authToken = "Bearer T0k3nV4lue$%gdjklasfl$_39";
    const decodedToken = {id: 1, role: "ADMIN", name: 'admin'};
    spyOn(localStorage, 'getItem').and.returnValue(authToken);
    spyOn(guard, 'jwtDecode').and.returnValue(decodedToken);
    const result = guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
    expect(result).toBe(true);
  });

  it('should deny access if user is not ADMIN', () => {
    const authToken = "Bearer T0k3nV4lue$%gdjklasfl$_39";
    const decodedToken = {id: 1, role: "BUSINESS", name: 'Business S.L.'};
    spyOn(localStorage, 'getItem').and.returnValue(authToken);
    spyOn(guard, 'jwtDecode').and.returnValue(decodedToken);
    const result = guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
    expect(result).toBe(false);
  });
});
