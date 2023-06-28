import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { tap } from 'rxjs';
import { DeleteDialogComponent } from 'src/app/global/components/delete-dialog/delete-dialog.component';
import { User } from 'src/app/global/interfaces/user.interface'
import { UsersService } from 'src/app/global/services/users.service';
import { UserFormDialogComponent } from '../user-form-dialog/user-form-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackBarService } from 'src/app/global/services/snack-bar.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent {
  users: User[] = []
  columnsToDisplay = ['name', 'cnif', 'email', 'phone', 'role', 'actions'];
  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(private userSvc: UsersService, 
    public dialog: MatDialog,
    private translate: TranslateService,
    private snackbarSvc: SnackBarService) {}
  
  ngOnInit(): void {
    this.userSvc.getUsers().subscribe(
      (users: User[]) => this.users = users
    );
  }

  addUser(user: User): void {
    this.userSvc.addUser(user).subscribe( newUser => {
      this.snackbarSvc.openSuccess('messages.addSuccess');
      this.users = [...this.users, newUser];
      this.table.renderRows();
    }, (e: HttpErrorResponse) => {
      console.log(e.status);
      if (e.error) {
        this.snackbarSvc.openErrorByCode(e.error.code);
      } else {
        this.snackbarSvc.openError('messages.addError');
      }
    });
  }

  updateUser(updatedUser: User): void {
    this.userSvc.updateUser(updatedUser).subscribe(() => {
      this.snackbarSvc.openSuccess('messages.updateSuccess');
      let index = this.users.findIndex( user => user.id == updatedUser.id );
      this.users[index] = updatedUser;
      this.users = [...this.users];
      this.table.renderRows();
    }, (e: HttpErrorResponse) => {
      console.log(e.status);
      this.snackbarSvc.openError('messages.updateError');
    });
  }

  deleteUser(id: number): void {
    this.userSvc.deleteUser(id).subscribe(() => {
      this.snackbarSvc.openSuccess('messages.deleteSuccess');
      this.users = this.users.filter(user => user.id !== id);
      this.table.renderRows();
    }, (e: HttpErrorResponse) => {
      console.log(e.status);
      this.snackbarSvc.openError('messages.deleteError');
    });
  }

  showDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, { data: { elementName: this.translate.instant('elements.user') } });

    dialogRef.afterClosed().subscribe( result => {
      if(result) {
        this.deleteUser(id);
      }
    });
  }

  showEditUserDialog(user: User): void {
    const dialogRef = this.dialog.open(UserFormDialogComponent, { data: { title: this.translate.instant('edit.user'), user: user } });

    dialogRef.afterClosed().subscribe( updatedUser => {
      if(updatedUser) {
        this.updateUser(updatedUser);
      }
    });
  }

  showAddUserDialog(): void {
    const dialogRef = this.dialog.open(UserFormDialogComponent, { data: { title: this.translate.instant('new.user'), user: undefined} });

    dialogRef.afterClosed().subscribe( newUser => {
      if(newUser) {
        this.addUser(newUser);
      }
    });
  }
}
