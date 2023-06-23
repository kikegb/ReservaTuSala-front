import { of } from "rxjs";
import { Room } from "src/app/global/interfaces/room.interface";
import { Location } from "src/app/global/interfaces/location.interface";
import { User } from "src/app/global/interfaces/user.interface";

const roomsList = <Room[]>[
  {
    "id": 1,
    "business": <User>{},
    "location": <Location>{
      "id": 3,
      "street": "A street",
      "number": "5",
      "postcode": "12345",
      "town": "Testown",
      "province": "Testvince",
      "country": "Testland"
    },
    "name": "Room 1",
    "size": 25,
    "capacity": 20,
    "price": 20.99,
    "operations": [],
    "schedules": [],
    "materials": []
  },
  {
    "id": 2,
    "business": <User>{},
    "location": <Location>{
      "id": 3,
      "street": "A street",
      "number": "5",
      "postcode": "12345",
      "town": "Testown",
      "province": "Testvince",
      "country": "Testland"
    },
    "name": "Room 2",
    "size": 40,
    "capacity": 40,
    "price": 30.50,
    "operations": [],
    "schedules": [],
    "materials": []
  },
];

export const RoomsServiceMock = {

    getRooms: () => {
      return of(roomsList);
    },

    getById: () => {
      return of(roomsList[0]);
    },

    addRoom: (room: Room) => {
        return of(room as Room);
    },

    updateRoom: (room: Room) => {
      return of(room as Room);
    },

    deleteRoom: (id: number) => {
      return of([]);
    }
  }