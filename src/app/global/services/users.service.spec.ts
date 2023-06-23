import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { UsersServiceMock } from 'src/test-helpers/mocks/users-service-mock';
import { User } from '../interfaces/user.interface';

describe('UsersService', () => {
  let service: UsersService;
  let backend: HttpTestingController;

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        UsersService
      ]
    });
    service = TestBed.inject(UsersService);
    backend = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should GET list of users with getUsers()', fakeAsync(() => {
    let response: User[] = [];

    service.getUsers().subscribe(
      (receivedResponse: User[]) => {
        response = receivedResponse;
      },
      (error: any) => {}
    );

    const requestWrapper = backend.expectOne({url: 'http://localhost:8081/user/all'});
    requestWrapper.flush(usersList);
    backend.verify();

    tick();

    expect(requestWrapper.request.method).toEqual('GET');
    expect(response).toEqual(usersList);
  }));

  it('should GET a user by its id with getById()', fakeAsync(() => {
    let response: User = <User>{};
    const user = usersList[0];

    service.getById(user.id).subscribe(
      (receivedResponse: User) => {
        response = receivedResponse;
      },
      (error: any) => {}
    );

    const requestWrapper = backend.expectOne({url: 'http://localhost:8081/user?id=' + user.id});
    requestWrapper.flush(user);
    backend.verify();

    tick();

    expect(requestWrapper.request.method).toEqual('GET');
    expect(response).toEqual(user);
  })); 

  it('should POST user with addUser()', fakeAsync(() => {
    let response: User = <User>{};
    const user = usersList[0];

    service.addUser(user).subscribe(
      (receivedResponse: User) => {
        response = receivedResponse;
      },
      (error: any) => {}
    );

    const requestWrapper = backend.expectOne({url: 'http://localhost:8081/user'});
    requestWrapper.flush(user);
    backend.verify();

    tick();

    expect(requestWrapper.request.method).toEqual('POST');
    expect(response).toEqual(user);
  }));

  it('should PUT user with updateUser()', fakeAsync(() => {
    let response: User = <User>{};
    const user = usersList[0];

    service.updateUser(user).subscribe(
      (receivedResponse: User) => {
        response = receivedResponse;
      },
      (error: any) => {}
    );

    const requestWrapper = backend.expectOne({url: 'http://localhost:8081/user'});
    requestWrapper.flush(user);
    backend.verify();

    tick();

    expect(requestWrapper.request.method).toEqual('PUT');
    expect(response).toEqual(user);
  }));

  it('should delete user with deleteUser()', fakeAsync(() => {
    let response = {};
    const expectedResponse = {
      "code": 0,
      "description": "OK"
    };
    const user = usersList[0];

    service.deleteUser(user.id).subscribe(
      (receivedResponse: any) => {
        response = receivedResponse;
      },
      (error: any) => {}
    );

    const requestWrapper = backend.expectOne({url: 'http://localhost:8081/user?id=' + user.id});
    requestWrapper.flush(expectedResponse);
    backend.verify();

    tick();

    expect(requestWrapper.request.method).toEqual('DELETE');
    expect(response).toEqual(expectedResponse);
  }));
});
