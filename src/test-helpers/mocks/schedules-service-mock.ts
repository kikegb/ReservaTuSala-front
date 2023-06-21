import { of } from "rxjs";
import { Schedule } from "src/app/global/interfaces/schedule.interface";

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

export const SchedulesServiceMock = {

    getSchedules: () => {
      return of(parsedSchedulesList);
    },

    addSchedule: (schedule: Schedule) => {
        return of(schedule as Schedule);
    },

    updateSchedule: (schedule: Schedule) => {
      return of(schedule as Schedule);
    },

    deleteSchedule: (id: number) => {
      return of([]);
    }
  }