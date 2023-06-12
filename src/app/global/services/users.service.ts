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
    const formattedUser = {
      ...user,
      businessOperations: user.businessOperations.map(operation => ({
        ...operation,
        start: operation.start.toISOString().slice(0, -2),
        end: operation.end.toISOString().slice(0, -2)
      })),
      customerOperations: user.customerOperations.map(operation => ({
        ...operation,
        start: operation.start.toISOString().slice(0, -2),
        end: operation.end.toISOString().slice(0, -2)
      }))
    };
      return this.http.post<User>(this.apiURL, formattedUser);
  }

  updateUser(user: User): Observable<User>{
    const formattedUser = {
      ...user,
      businessOperations: user.businessOperations.map(operation => ({
        ...operation,
        start: operation.start.toISOString().slice(0, -2),
        end: operation.end.toISOString().slice(0, -2)
      })),
      customerOperations: user.customerOperations.map(operation => ({
        ...operation,
        start: operation.start.toISOString().slice(0, -2),
        end: operation.end.toISOString().slice(0, -2)
      }))
    };
    return this.http.put<User>(this.apiURL, formattedUser);
  }

  deleteUser(id: number): Observable<unknown>{
    const url = `${this.apiURL}?id=${id}`;
    return this.http.delete<User>(url);
  }
}
