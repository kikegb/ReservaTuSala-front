import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { OperationsService } from './operations.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Operation } from '../interfaces/operation.interface';
import { User } from '../interfaces/user.interface';
import { Room } from '../interfaces/room.interface';

describe('OperationsService', () => {
  let service: OperationsService;
  let backend: HttpTestingController;

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        OperationsService
      ]
    });
    service = TestBed.inject(OperationsService);
    backend = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should GET list of operations with getOperations()', fakeAsync(() => {
    let response: Operation[] = [];

    service.getOperations().subscribe(
      (receivedResponse: Operation[]) => {
        response = receivedResponse;
      },
      (error: any) => {}
    );

    const requestWrapper = backend.expectOne({url: 'http://localhost:8081/operation/all'});
    requestWrapper.flush(operationsList);
    backend.verify();

    tick();

    expect(requestWrapper.request.method).toEqual('GET');
    expect(response).toEqual(parsedOperationsList);
  }));

  it('should POST operation with addOperation()', fakeAsync(() => {
    let response: Operation = <Operation>{};
    const operation = operationsList[0];
    const parsedOperation = parsedOperationsList[0];

    service.addOperation(parsedOperation).subscribe(
      (receivedResponse: Operation) => {
        response = receivedResponse;
      },
      (error: any) => {}
    );

    const requestWrapper = backend.expectOne({url: 'http://localhost:8081/operation'});
    requestWrapper.flush(operation);
    backend.verify();

    tick();

    expect(requestWrapper.request.method).toEqual('POST');
    expect(response).toEqual(parsedOperation);
  }));

  it('should PUT operation with updateOperation()', fakeAsync(() => {
    let response: Operation = <Operation>{};
    const operation = operationsList[0];
    const parsedOperation = parsedOperationsList[0];

    service.updateOperation(parsedOperation).subscribe(
      (receivedResponse: Operation) => {
        response = receivedResponse;
      },
      (error: any) => {}
    );

    const requestWrapper = backend.expectOne({url: 'http://localhost:8081/operation'});
    requestWrapper.flush(operation);
    backend.verify();

    tick();

    expect(requestWrapper.request.method).toEqual('PUT');
    expect(response).toEqual(parsedOperation);
  }));

  it('should delete operation with deleteOperation()', fakeAsync(() => {
    let response = {};
    const expectedResponse = {
      "code": 0,
      "description": "OK"
    };
    const operation = operationsList[0];

    service.deleteOperation(operation.id).subscribe(
      (receivedResponse: any) => {
        response = receivedResponse;
      },
      (error: any) => {}
    );

    const requestWrapper = backend.expectOne({url: 'http://localhost:8081/operation?id=' + operation.id});
    requestWrapper.flush(expectedResponse);
    backend.verify();

    tick();

    expect(requestWrapper.request.method).toEqual('DELETE');
    expect(response).toEqual(expectedResponse);
  }));
});
