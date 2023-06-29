import { TestBed } from '@angular/core/testing';

import { TokenUtilsService } from './token-utils.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRefMock } from 'src/test-helpers/mocks/mat-dialog-ref-mock';


describe('TokenUtilsService', () => {
  let service: TokenUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TokenUtilsService,
        { provide: MatDialog, useValue: MatDialogRefMock }
      ]
    });
    service = TestBed.inject(TokenUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set token value with setToken()', () => {
    const newToken = 'New-%$Token$&_Value';
    const localStorageSetSpy = spyOn(localStorage, 'setItem');
    service.setToken(newToken);
    expect(localStorageSetSpy).toHaveBeenCalledWith('token', newToken);
  });

  it('should get token value with getToken()', () => {
    const token = '%$Token$&_Value';
    spyOn(localStorage, 'getItem').and.returnValue(token);
    const result = service.getToken();
    expect(localStorage.getItem).toHaveBeenCalledWith('token');
    expect(result).toEqual(token);
  });

  it('should get decoded token with getDecodedToken()', () => {
    const token = '%$Token$&_Value';
    const decodedToken = {id: '1', role: 'ADMIN', name: 'Dummy Name'};
    spyOn(localStorage, 'getItem').and.returnValue(token);
    spyOn(service, 'jwtDecode').and.returnValue(decodedToken);
    const result = service.getDecodedToken();
    expect(localStorage.getItem).toHaveBeenCalledWith('token');
    expect(service.jwtDecode).toHaveBeenCalledWith(token);
    expect(result).toEqual(decodedToken);
  });

  it('should open dialog when token is expired', () => {
    const token = '%$Token$&_Value';
    const decodedToken = {id: '1', role: 'ADMIN', name: 'Dummy Name', exp: 0};
    spyOn(localStorage, 'getItem').and.returnValue(token);
    spyOn(service, 'jwtDecode').and.returnValue(decodedToken);
    spyOn(service.dialog, 'open').and.callThrough();
    service.checkTokenExpiration();
    expect(localStorage.getItem).toHaveBeenCalledWith('token');
    expect(service.jwtDecode).toHaveBeenCalledWith(token);
    expect(service.dialog.open).toHaveBeenCalled();
  });
});
