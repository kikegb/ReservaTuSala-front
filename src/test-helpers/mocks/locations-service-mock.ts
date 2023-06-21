import { of } from "rxjs";
import { Location } from "src/app/global/interfaces/location.interface";
import { Room } from "src/app/global/interfaces/room.interface";

const locationsList = <Location[]>[
  {
    "id": 1,
    "street": "A street",
    "number": "5",
    "postcode": "12345",
    "town": "Testown",
    "province": "Testvince",
    "country": "Testland"
  },
  {
    "id": 2,
    "street": "B street",
    "number": "98",
    "postcode": "54321",
    "town": "Towntest",
    "province": "Provitest",
    "country": "Tested kingdom"
  },
];

const parsedLocationsList = [
  {
    "id": 1,
    "customer": <Location>{},
    "business": <Location>{},
    "room": <Room>{},
    "start": new Date("2023-06-01T12:00:00"),
    "end": new Date("2023-06-01T16:00:00"),
    "cost": 65.20,
    "status": "APPROVED"
  },
  {
    "id": 2,
    "customer": <Location>{},
    "business": <Location>{},
    "room": <Room>{},
    "start": new Date("2023-06-18T10:00:00"),
    "end": new Date("2023-06-18T13:00:00"),
    "cost": 42.50,
    "status": "PENDING"
  },
];

export const LocationsServiceMock = {

    getLocations: () => {
      return of(parsedLocationsList);
    },

    addLocation: (location: Location) => {
        return of(location as Location);
    },

    updateLocation: (location: Location) => {
      return of(location as Location);
    },

    deleteLocation: (id: number) => {
      return of([]);
    }
  }