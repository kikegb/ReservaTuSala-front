import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TokenUtilsService } from '../../services/token-utils.service';

@Component({
  selector: 'app-token-expired-dialog',
  templateUrl: './token-expired-dialog.component.html',
  styleUrls: ['./token-expired-dialog.component.scss']
})
export class TokenExpiredDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<TokenExpiredDialogComponent>,
    private router: Router,
    private tokenutilsSvc: TokenUtilsService) {}

  onExit(): void {
    this.tokenutilsSvc.setToken('');
    this.router.navigate(["/login"]);
    this.dialogRef.close();
  }
}
