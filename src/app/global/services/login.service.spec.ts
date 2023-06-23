import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LoginService } from './login.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('LoginService', () => {
  let service: LoginService;
  let backend: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        LoginService
      ]
    });
    service = TestBed.inject(LoginService);
    backend = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get authorization token with login()', fakeAsync(() => {
    let response: any = {};
    const email = "example@email.com";
    const password = "P4ssw0rd";
    const auth = { Authorization: "Bearer token$1234" };

    service.login(email, password).subscribe(
      (receivedResponse: any) => {
        response = receivedResponse;
      },
      (error: any) => {}
    );

    const requestWrapper = backend.expectOne({url: 'http://localhost:8081/login'});
    requestWrapper.flush(auth);
    backend.verify();

    tick();

    expect(requestWrapper.request.method).toEqual('POST');
    expect(response).toEqual(auth);
  }));
});
