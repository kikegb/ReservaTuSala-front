import { of } from "rxjs";

const authToken = "Bearer T0k3nV4lue$%gdjklasfl$_39";

export const LoginServiceMock = {

    login: (email: string, password: string) => {
      return of({Authorization: authToken});
    }
  }