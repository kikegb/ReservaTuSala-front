import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { User } from '../../interfaces/user.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent {
  users!: User[]
  columnsToDisplay = ['name', 'cnif', 'email', 'password', 'phone', 'role'];

  constructor(private userSvc: UsersService) {}
  
  ngOnInit(): void {
    this.userSvc.getUsers()
    .pipe(
        tap( (users: User[]) => this.users = users )
    )
    .subscribe()
  }

}
