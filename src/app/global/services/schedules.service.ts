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
        start: new Date(schedule.start),
        end: new Date(schedule.end)
      })))
    );
  }

  addSchedule(schedule: Schedule): Observable<Schedule>{
      const formattedSchedule = {
        ...schedule,
        start: schedule.start.toISOString(),
        end: schedule.end.toISOString()
      };
      return this.http.post<Schedule>(this.apiURL, formattedSchedule);
  }

  updateSchedule(schedule: Schedule): Observable<Schedule>{
    const formattedSchedule = {
      ...schedule,
      start: schedule.start.toISOString(),
      end: schedule.end.toISOString()
    };
    return this.http.put<Schedule>(this.apiURL, formattedSchedule);
  }

  deleteSchedule(id: number): Observable<unknown>{
    const url = `${this.apiURL}?id=${id}`;
    return this.http.delete<Schedule>(url);
  }
}
