import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Room } from 'src/app/global/interfaces/room.interface';
import { Material } from '../interfaces/material.interface';
import { Schedule } from '../interfaces/schedule.interface';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private apiURL = environment.apiUrl + '/room';
  constructor(private http: HttpClient) { }

  getRooms(): Observable<Room[]>{
      return this.http.get<Room[]>(this.apiURL + '/all');
  }

  addRoom(room: Room): Observable<Room>{
      return this.http.post<Room>(this.apiURL, room);
  }

  updateRoom(room: Room): Observable<Room>{
    return this.http.put<Room>(this.apiURL, room);
  }

  deleteRoom(id: number): Observable<unknown>{
    const url = `${this.apiURL}?id=${id}`;
    return this.http.delete<Room>(url);
  }

  addMaterial(material: Material, id: number): Observable<Material>{
    const url = `${this.apiURL}/material?id=${id}`;
    return this.http.post<Material>(this.apiURL, material);
  }

  addSchedule(schedule: Schedule, id: number): Observable<Schedule>{
    const url = `${this.apiURL}/schedule?id=${id}`;
    return this.http.post<Schedule>(this.apiURL, schedule);
  }
}
