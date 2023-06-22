import { of } from "rxjs";
import { Operation } from "src/app/global/interfaces/operation.interface";
import { Room } from "src/app/global/interfaces/room.interface";
import { User } from "src/app/global/interfaces/user.interface";

const operationsList = [
  {
    "id": 1,
    "customer": <User>{},
    "business": <User>{},
    "room": <Room>{},
    "start": "2023-06-01T12:00:00",
    "end": "2023-06-01T16:00:00",
    "cost": 65.20,
    "status": "APPROVED"
  },
  {
    "id": 2,
    "customer": <User>{},
    "business": <User>{},
    "room": <Room>{},
    "start": "2023-06-18T10:00:00",
    "end": "2023-06-18T13:00:00",
    "cost": 42.50,
    "status": "PENDING"
  },
];

const parsedOperationsList = [
  {
    "id": 1,
    "customer": <User>{},
    "business": <User>{},
    "room": <Room>{},
    "start": new Date("2023-06-01T12:00:00"),
    "end": new Date("2023-06-01T16:00:00"),
    "cost": 65.20,
    "status": "APPROVED"
  },
  {
    "id": 2,
    "customer": <User>{},
    "business": <User>{},
    "room": <Room>{},
    "start": new Date("2023-06-18T10:00:00"),
    "end": new Date("2023-06-18T13:00:00"),
    "cost": 42.50,
    "status": "PENDING"
  },
];

export const OperationsServiceMock = {

    getOperations: () => {
      return of(parsedOperationsList);
    },

    addOperation: (operation: Operation) => {
        return of(operation as Operation);
    },

    updateOperation: (operation: Operation) => {
      return of(operation as Operation);
    },

    deleteOperation: (id: number) => {
      return of([]);
    }
  }