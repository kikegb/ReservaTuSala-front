import { of } from "rxjs";
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

export const UsersServiceMock = {

    getUsers: () => {
      return of(usersList);
    },

    getById: () => {
      return of(usersList[0]);
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