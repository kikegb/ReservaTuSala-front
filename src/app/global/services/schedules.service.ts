import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Schedule } from '../interfaces/schedule.interface';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {
  private apiURL = environment.apiUrl + '/schedule';
  constructor(private http: HttpClient) { }

  getSchedules(): Observable<Schedule[]>{
    return this.http.get<Schedule[]>(this.apiURL + '/all').pipe(
      map(schedules => schedules.map(schedule => ({
        ...schedule,
        start: new Date('1970-01-01T' + schedule.start),
        end: new Date('1970-01-01T' + schedule.end)
      })))
    );
  }

  addSchedule(schedule: Schedule): Observable<Schedule>{
      const formattedSchedule = {
        ...schedule,
        start: new Date(schedule.start.getTime() - (schedule.start.getTimezoneOffset() * 60000)).toISOString().split('T')[1].slice(0, -5),
        end: new Date(schedule.end.getTime() - (schedule.end.getTimezoneOffset() * 60000)).toISOString().split('T')[1].slice(0, -5)
      };
      return this.http.post<Schedule>(this.apiURL, formattedSchedule)
      .pipe(
        map((schedule: Schedule) => ({
          ...schedule,
          start: new Date('1970-01-01T' + schedule.start),
          end: new Date('1970-01-01T' + schedule.end)
        }))
      );
  }

  updateSchedule(schedule: Schedule): Observable<Schedule>{
    const formattedSchedule = {
      ...schedule,
      start: new Date(schedule.start.getTime() - (schedule.start.getTimezoneOffset() * 60000)).toISOString().split('T')[1].slice(0, -5),
      end: new Date(schedule.end.getTime() - (schedule.end.getTimezoneOffset() * 60000)).toISOString().split('T')[1].slice(0, -5)
    };
    return this.http.put<Schedule>(this.apiURL, formattedSchedule)
    .pipe(
      map((schedule: Schedule) => ({
        ...schedule,
        start: new Date('1970-01-01T' + schedule.start),
        end: new Date('1970-01-01T' + schedule.end)
      }))
    );
  }

  deleteSchedule(id: number): Observable<unknown>{
    const url = `${this.apiURL}?id=${id}`;
    return this.http.delete<Schedule>(url);
  }
}
