import { TestBed } from '@angular/core/testing';

import { SnackBarService } from './snack-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';

describe('SnackBarService', () => {
  let service: SnackBarService;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot()
      ],
      providers: [
        SnackBarService,
        { provide: MatSnackBar, useValue: jasmine.createSpyObj('MatSnackBar', ['open']) },
      ]
    });
    snackBar = TestBed.inject(MatSnackBar);
    service = TestBed.inject(SnackBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open a snackbar with error message with openError()', () => {
    const message = "Error message!!!"
    service.openError(message);
    expect(snackBar.open).toHaveBeenCalledWith(message, 'actions.close', {
      duration: 5000,
      panelClass: ['error-snackbar'],
    });
  });

  it('should open a snackbar with success message with openSuccess()', () => {
    const message = "Success message!!!"
    service.openSuccess(message);
    expect(snackBar.open).toHaveBeenCalledWith(message, 'actions.close', {
      duration: 5000,
      panelClass: ['success-snackbar'],
    });
  });

  it('should open a snackbar with error message from code with openErrorByCode()', () => {
    const code = '2';
    service.openErrorByCode(code);
    expect(snackBar.open).toHaveBeenCalledWith('messages.userConflict', 'actions.close', {
      duration: 5000,
      panelClass: ['error-snackbar'],
    });
  });
});
