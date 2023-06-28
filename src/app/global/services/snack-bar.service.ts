import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private _snackBar: MatSnackBar,
    private translate: TranslateService) { }

  openError(message: string): void {
    this._snackBar.open(this.translate.instant(message), this.translate.instant('actions.close'), {
      duration: 5000,
      panelClass: ['error-snackbar'],
    });
  }

  openSuccess(message: string): void {
    this._snackBar.open(this.translate.instant(message), this.translate.instant('actions.close'), {
      duration: 5000,
      panelClass: ['success-snackbar'],
    });
  }

  openErrorByCode(code: string): void {
    let message = "Error";
    if (code == "1") {
      message = "messages.notFoundId";
    }
    if (code == "2") {
      message = "messages.userConflict";
    }
    if (code == "3") {
      message = "messages.badRequest";
    }
    this._snackBar.open(this.translate.instant(message), this.translate.instant('actions.close'), {
      duration: 5000,
      panelClass: ['error-snackbar'],
    });
  }

}
