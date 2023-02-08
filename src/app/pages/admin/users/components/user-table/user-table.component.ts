import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs';
import { DeleteDialogComponent } from 'src/app/global/components/delete-dialog/delete-dialog.component';
import { User } from '../../interfaces/user.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent {
  users: User[] = []
  columnsToDisplay = ['name', 'cnif', 'email', 'phone', 'role', 'deleted', 'actions'];

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

  updateUser(user: User): void {
    this.userSvc.updateUser(user)
    .subscribe();
    this.ngOnInit();
  }

  deleteUser(id: number): void {
    this.userSvc.deleteUser(id)
    .subscribe();
    this.ngOnInit();
  }

  showDeleteDialog(id: number): void {
    
    const dialogRef = this.dialog.open(DeleteDialogComponent, { data: { elementName: 'user' } });

    dialogRef.afterClosed().subscribe( result => {
      if(result) {
        this.deleteUser(id);
      }
    });

  }

  showEditUserDialog(id: number): void {

  }

}
