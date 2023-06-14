import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
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
    return this.http.get<Room[]>(this.apiURL + '/all').pipe(
      map(rooms => rooms.map(room => ({
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
      })))
    );
  }

  getById(id: number): Observable<Room>{
    const url = `${this.apiURL}?id=${id}`;
    return this.http.get<Room>(url).pipe(
      map(room => ({
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
      }))
    );
  }

  addRoom(room: Room): Observable<Room>{
    const formattedRoom = {
      ...room,
      schedules: room.schedules.map(schedule => ({
        ...schedule,
        start: schedule.start.toISOString().split('T')[1].slice(0, -2),
        end: schedule.end.toISOString().split('T')[1].slice(0, -2)
      }))
    };
    return this.http.post<Room>(this.apiURL, formattedRoom);
  }

  updateRoom(room: Room): Observable<Room>{
    const formattedRoom = {
      ...room,
      operations: room.operations.map(operation => ({
        ...operation,
        start: operation.start.toISOString().slice(0, -2),
        end: operation.end.toISOString().slice(0, -2)
      })),
      schedules: room.schedules.map(schedule => ({
        ...schedule,
        start: schedule.start.toISOString().split('T')[1].slice(0, -2),
        end: schedule.end.toISOString().split('T')[1].slice(0, -2)
      }))
    };
    return this.http.put<Room>(this.apiURL, formattedRoom);
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
    const formattedSchedule = {
      ...schedule,
      start: schedule.start.toISOString().split('T')[1].slice(0, -2),
      end: schedule.end.toISOString().split('T')[1].slice(0, -2)
    };
    const url = `${this.apiURL}/schedule?id=${id}`;
    return this.http.post<Schedule>(this.apiURL, formattedSchedule)
    .pipe(
      map((schedule: Schedule) => ({
        ...schedule,
        start: new Date('1970-01-01T' + schedule.start),
        end: new Date('1970-01-01T' + schedule.end)
      }))
    );
  }
}
