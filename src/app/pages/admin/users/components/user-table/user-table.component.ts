import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { tap } from 'rxjs';
import { DeleteDialogComponent } from 'src/app/global/components/delete-dialog/delete-dialog.component';
import { User } from '../../interfaces/user.interface';
import { UsersService } from '../../services/users.service';
import { UserFormDialogComponent } from '../user-form-dialog/user-form-dialog.component';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent {
  users: User[] = []
  columnsToDisplay = ['name', 'cnif', 'email', 'phone', 'role', 'deleted', 'actions'];
  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(private userSvc: UsersService, public dialog: MatDialog) {}
  
  ngOnInit(): void {
    this.userSvc.getUsers()
    .pipe(
        tap( (users: User[]) => this.users = users )
    )
    .subscribe();
  }

  addUser(user: User): void {
    this.userSvc.addUser(user)
    .pipe(
      tap( () => {
        this.users = [...this.users, user];
      })
    )
    .subscribe();
    this.table.renderRows();
  }

  updateUser(updatedUser: User): void {
    this.userSvc.updateUser(updatedUser)
    .pipe(
      tap( () => {
        let index = this.users.findIndex( user => user.id == updatedUser.id );
        this.users[index] = updatedUser;
        this.users = [...this.users];
      })
    )
    .subscribe();
    this.table.renderRows();
  }

  deleteUser(id: number): void {
    this.userSvc.deleteUser(id)
    .pipe(
      tap( () => {
        let index = this.users.findIndex( user => user.id == id );
        this.users[index] = {...this.users[index], deleted: true};
        this.users = [...this.users];
      })
    )
    .subscribe();
    this.table.renderRows();
  }

  showDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, { data: { elementName: 'user' } });

    dialogRef.afterClosed().subscribe( result => {
      if(result) {
        this.deleteUser(id);
      }
    });
  }

  showEditUserDialog(user: User): void {
    const dialogRef = this.dialog.open(UserFormDialogComponent, { data: { title: 'Edit user', user: user } });

    dialogRef.afterClosed().subscribe( updatedUser => {
      if(updatedUser) {
        this.updateUser(updatedUser);
      }
    });
  }

  showAddUserDialog(): void {
    const dialogRef = this.dialog.open(UserFormDialogComponent, { data: { title: 'New user', user: undefined} });

    dialogRef.afterClosed().subscribe( newUser => {
      if(newUser) {
        this.addUser(newUser);
      }
    });
  }
}
