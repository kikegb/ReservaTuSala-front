
const authToken = "Bearer T0k3nV4lue$%gdjklasfl$_39";
const decodedToken = {id: 1, role: 'BUSINESS', name: 'Business S.L.'};

export const TokenUtilsServiceMock = {

    setToken: (token: string) => {},
    getToken: () => {
      return authToken;
    },
    getDecodedToken(): any {
      return decodedToken;
    }
  }