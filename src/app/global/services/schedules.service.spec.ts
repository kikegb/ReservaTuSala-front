import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SchedulesService } from './schedules.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Schedule } from '../interfaces/schedule.interface';

describe('SchedulesService', () => {
  let service: SchedulesService;
  let backend: HttpTestingController;

  const schedulesList = [
    {
        "id": 1,
        "weekDay": 0,
        "start": "09:00:00",
        "end": "18:00:00"
    },
    {
      "id": 2,
      "weekDay": 3,
      "start": "12:00:00",
      "end": "21:00:00"
    }
  ];

  const parsedSchedulesList = [
    {
        "id": 1,
        "weekDay": 0,
        "start": new Date('1970-01-01T09:00:00'),
        "end": new Date('1970-01-01T18:00:00')
    },
    {
      "id": 2,
      "weekDay": 3,
      "start": new Date('1970-01-01T12:00:00'),
      "end": new Date('1970-01-01T21:00:00')
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        SchedulesService
      ]
    });
    service = TestBed.inject(SchedulesService);
    backend = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should GET list of schedules with getSchedules()', fakeAsync(() => {
    let response: Schedule[] = [];

    service.getSchedules().subscribe(
      (receivedResponse: Schedule[]) => {
        response = receivedResponse;
      },
      (error: any) => {}
    );

    const requestWrapper = backend.expectOne({url: 'http://localhost:8081/schedule/all'});
    requestWrapper.flush(schedulesList);
    backend.verify();

    tick();

    expect(requestWrapper.request.method).toEqual('GET');
    expect(response).toEqual(parsedSchedulesList);
  }));

  it('should POST schedule with addSchedule()', fakeAsync(() => {
    let response: Schedule = <Schedule>{};
    const schedule = schedulesList[0];
    const parsedSchedule = parsedSchedulesList[0];

    service.addSchedule(parsedSchedule).subscribe(
      (receivedResponse: Schedule) => {
        response = receivedResponse;
      },
      (error: any) => {}
    );

    const requestWrapper = backend.expectOne({url: 'http://localhost:8081/schedule'});
    requestWrapper.flush(schedule);
    backend.verify();

    tick();

    expect(requestWrapper.request.method).toEqual('POST');
    expect(response).toEqual(parsedSchedule);
  }));

  it('should PUT schedule with updateSchedule()', fakeAsync(() => {
    let response: Schedule = <Schedule>{};
    const schedule = schedulesList[0];
    const parsedSchedule = parsedSchedulesList[0];

    service.updateSchedule(parsedSchedule).subscribe(
      (receivedResponse: Schedule) => {
        response = receivedResponse;
      },
      (error: any) => {}
    );

    const requestWrapper = backend.expectOne({url: 'http://localhost:8081/schedule'});
    requestWrapper.flush(schedule);
    backend.verify();

    tick();

    expect(requestWrapper.request.method).toEqual('PUT');
    expect(response).toEqual(parsedSchedule);
  }));

  it('should delete schedule with deleteSchedule()', fakeAsync(() => {
    let response = {};
    const expectedResponse = {
      "code": 0,
      "description": "OK"
    };
    const schedule = schedulesList[0];

    service.deleteSchedule(schedule.id).subscribe(
      (receivedResponse: any) => {
        response = receivedResponse;
      },
      (error: any) => {}
    );

    const requestWrapper = backend.expectOne({url: 'http://localhost:8081/schedule?id=' + schedule.id});
    requestWrapper.flush(expectedResponse);
    backend.verify();

    tick();

    expect(requestWrapper.request.method).toEqual('DELETE');
    expect(response).toEqual(expectedResponse);
  }));
});
