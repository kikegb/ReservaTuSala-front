import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from 'src/app/global/interfaces/user.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiURL = environment.apiUrl + '/user';
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
      return this.http.get<User[]>(this.apiURL + '/all').pipe(
        map(users => users.map(user => ({
          ...user,
          rooms: user.rooms.map(room => ({
            ...room,
            operations: room.operations.map(operation => ({
              ...operation,
              start: new Date(operation.start),
              end: new Date(operation.end)
            })),
            schedules: room.schedules.map(schedule => ({
              ...schedule,
              start: new Date('1970-01-01T' + schedule.start),
              end: new Date('1970-01-01T' + schedule.end)
            }))
          })),
          businessOperations: user.businessOperations.map(operation => ({
            ...operation,
            start: new Date(operation.start),
            end: new Date(operation.end)
          })),
          customerOperations: user.customerOperations.map(operation => ({
            ...operation,
            start: new Date(operation.start),
            end: new Date(operation.end)
          })),
        })))
      );
  }

  getById(id: number): Observable<User>{
    const url = `${this.apiURL}?id=${id}`;
    return this.http.get<User>(url).pipe(
      map(user => ({
        ...user,
        rooms: user.rooms.map(room => ({
          ...room,
          operations: room.operations.map(operation => ({
            ...operation,
            start: new Date(operation.start),
            end: new Date(operation.end)
          })),
          schedules: room.schedules.map(schedule => ({
            ...schedule,
            start: new Date('1970-01-01T' + schedule.start),
            end: new Date('1970-01-01T' + schedule.end)
          }))
        })),
        businessOperations: user.businessOperations.map(operation => ({
          ...operation,
          start: new Date(operation.start),
          end: new Date(operation.end)
        })),
        customerOperations: user.customerOperations.map(operation => ({
          ...operation,
          start: new Date(operation.start),
          end: new Date(operation.end)
        })),
      }))
    );
  }

  addUser(user: User): Observable<User>{
      return this.http.post<User>(this.apiURL, user);
  }

  updateUser(user: User): Observable<User>{
    const formattedUser = {
      ...user,
      rooms: user.rooms.map(room => ({
        id: room.id
      })),
      businessOperations: user.businessOperations.map(operation => ({
        id: operation.id
      })),
      customerOperations: user.customerOperations.map(operation => ({
        id: operation.id
      }))
    };
    return this.http.put<User>(this.apiURL, formattedUser);
  }

  deleteUser(id: number): Observable<unknown>{
    const url = `${this.apiURL}?id=${id}`;
    return this.http.delete<User>(url);
  }
}
