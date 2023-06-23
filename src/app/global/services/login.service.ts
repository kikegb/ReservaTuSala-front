import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiURL = environment.apiUrl + '/login';
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<unknown>{
    return this.http.post<any>(this.apiURL, {email: email, password: password});
}
}
