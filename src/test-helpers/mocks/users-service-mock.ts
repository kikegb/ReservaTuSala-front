import { of } from "rxjs";
import { Location } from "src/app/global/interfaces/location.interface";
import { Room } from "src/app/global/interfaces/room.interface";
import { User } from "src/app/global/interfaces/user.interface";

const usersList = <User[]>[
  {
      "id": 1,
      "cnif": "87654321X",
      "name": "Business S.A.",
      "phone": "999999999",
      "password": "psswd",
      "email": "email@example.com",
      "role": "BUSINESS",
      "rooms": [],
      "customerOperations": [],
      "businessOperations": []
  },
  {
      "id": 2,
      "cnif": "12345678Y",
      "name": "Custo Mer",
      "phone": "999999999",
      "password": "p4ssw0rd",
      "email": "mail@mail.com",
      "role": "CUSTOMER",
      "rooms": [],
      "customerOperations": [],
      "businessOperations": []
  }
];

const user = <User>{
  "id": 1,
  "cnif": "87654321X",
  "name": "Business S.L.",
  "phone": "999999999",
  "password": "psswd",
  "email": "email@example.com",
  "role": "BUSINESS",
  "rooms": <Room[]>[
    {
      "id": 5,
      "business": <User>{},
      "location": <Location>{},
      "name": "Room 1",
      "size": 25,
      "capacity": 20,
      "price": 20.99,
      "operations": [],
      "schedules": [],
      "materials": []
    },
    {
      "id": 6,
      "business": <User>{},
      "location": <Location>{},
      "name": "Room 2",
      "size": 40,
      "capacity": 40,
      "price": 30.50,
      "operations": [],
      "schedules": [],
      "materials": []
    },
  ],
  "customerOperations": [],
  "businessOperations": [
    {
      "id": 2,
      "customer": <User>{},
      "business": <User>{},
      "room": <Room>{},
      "start": new Date(),
      "end": new Date(),
      "cost": 65.20,
      "status": "APPROVED"
    },
    {
      "id": 3,
      "customer": <User>{},
      "business": <User>{},
      "room": <Room>{},
      "start": new Date("2023-06-18T10:00:00"),
      "end": new Date("2023-06-18T13:00:00"),
      "cost": 42.50,
      "status": "PENDING"
    },
    {
      "id": 4,
      "customer": <User>{},
      "business": <User>{},
      "room": <Room>{},
      "start": new Date(),
      "end": new Date(),
      "cost": 40.52,
      "status": "PENDING"
    }
  ]
};

export const UsersServiceMock = {

    getUsers: () => {
      return of(usersList);
    },

    getById: () => {
      return of(user);
    },

    addUser: (user: User) => {
        return of(user as User);
    },

    updateUser: (user: User) => {
      return of(user as User);
    },

    deleteUser: (id: number) => {
      return of([]);
    }
  }