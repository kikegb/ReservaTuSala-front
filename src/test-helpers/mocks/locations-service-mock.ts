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


export const LocationsServiceMock = {

    getLocations: () => {
      return of(locationsList);
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