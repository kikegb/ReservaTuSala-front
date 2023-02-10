import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { tap } from 'rxjs';
import { DeleteDialogComponent } from 'src/app/global/components/delete-dialog/delete-dialog.component';
import { User } from '../../interfaces/user.interface';
import { UsersService } from '../../services/users.service';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';

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
      tap( (user: User) => this.users.push(user) )
    )
    .subscribe();
  }

  updateUser(updatedUser: User): void {
    this.userSvc.updateUser(updatedUser)
    .pipe(
      tap( () => {
        let newUsers: User[] = [];
        this.users.forEach( user => {
          if(user.id == updatedUser.id) {
            newUsers.push(updatedUser)
          } else {
            newUsers.push(user)
          }
        })
        this.users = newUsers;
      })
    )
    .subscribe();
    this.table.renderRows();
  }

  deleteUser(id: number): void {
    this.userSvc.deleteUser(id)
    .pipe(
      tap( () => {
        let newUsers: User[] = [];
        this.users.forEach( user => {
          if(user.id == id) {
            let deletedUser: User = {...user, deleted: true};
            newUsers.push(deletedUser)
          } else {
            newUsers.push(user)
          }
        })
        this.users = newUsers;
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

    const dialogRef = this.dialog.open(EditUserDialogComponent, { data: { user: user } });

    dialogRef.afterClosed().subscribe( updatedUser => {
      if(updatedUser) {
        this.updateUser(updatedUser);
      }
    });
  }

}
