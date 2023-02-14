import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiURL = environment.apiUrl + '/user';
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
      return this.http.get<User[]>(this.apiURL + '/all');
  }

  addUser(user: User): Observable<User>{
      return this.http.post<User>(this.apiURL, user);
  }

  updateUser(user: User): Observable<User>{
    return this.http.put<User>(this.apiURL, user);
  }

  deleteUser(id: number): Observable<unknown>{
    const url = `${this.apiURL}?id=${id}`;
    return this.http.delete<User>(url);
  }
}
