import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Location } from '../interfaces/location.interface';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  private apiURL = environment.apiUrl + '/location';
  constructor(private http: HttpClient) { }

  getLocations(): Observable<Location[]>{
      return this.http.get<Location[]>(this.apiURL + '/all');
  }

  addLocation(location: Location): Observable<Location>{
      return this.http.post<Location>(this.apiURL, location);
  }

  updateLocation(location: Location): Observable<Location>{
    return this.http.put<Location>(this.apiURL, location);
  }

  deleteLocation(id: number): Observable<unknown>{
    const url = `${this.apiURL}?id=${id}`;
    return this.http.delete<Location>(url);
  }
}
