import { Component } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { tap } from 'rxjs';
import { Operation } from 'src/app/global/interfaces/operation.interface';
import { User } from 'src/app/global/interfaces/user.interface';
import { UsersService } from 'src/app/global/services/users.service';

@Component({
  selector: 'app-today-table',
  templateUrl: './today-table.component.html',
  styleUrls: ['./today-table.component.scss']
})
export class TodayTableComponent {
  todayOperations: Operation[] = []
  columnsToDisplay = ['customer', 'room', 'start', 'end', 'cost', 'status'];

  constructor(private userSvc: UsersService) {}
  
  ngOnInit(): void {
    const today = new Date();
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = <any>jwtDecode(token);
      const id = decodedToken.id;
      this.userSvc.getById(id)
      .pipe(
          tap( (user: User) => {
            user.businessOperations.map((operation: Operation) => {
              if (operation.start.toDateString() === today.toDateString()) {
                this.todayOperations.push(operation);
              }
            })
          })
      )
      .subscribe();
    }
  }
}
