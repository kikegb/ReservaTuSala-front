import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { RoomsService } from './rooms.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from '../interfaces/user.interface';
import { Room } from '../interfaces/room.interface';
import { Location } from '../interfaces/location.interface';

describe('RoomsService', () => {
  let service: RoomsService;
  let backend: HttpTestingController;

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        RoomsService
      ]
    });
    service = TestBed.inject(RoomsService);
    backend = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should GET list of rooms with getRooms()', fakeAsync(() => {
    let response: Room[] = [];

    service.getRooms().subscribe(
      (receivedResponse: Room[]) => {
        response = receivedResponse;
      },
      (error: any) => {}
    );

    const requestWrapper = backend.expectOne({url: 'http://localhost:8081/room/all'});
    requestWrapper.flush(roomsList);
    backend.verify();

    tick();

    expect(requestWrapper.request.method).toEqual('GET');
    expect(response).toEqual(roomsList);
  }));

  it('should GET a room by its id with getById()', fakeAsync(() => {
    let response: Room = <Room>{};
    const room = roomsList[0];

    service.getById(room.id).subscribe(
      (receivedResponse: Room) => {
        response = receivedResponse;
      },
      (error: any) => {}
    );

    const requestWrapper = backend.expectOne({url: 'http://localhost:8081/room?id=' + room.id});
    requestWrapper.flush(room);
    backend.verify();

    tick();

    expect(requestWrapper.request.method).toEqual('GET');
    expect(response).toEqual(room);
  }));

  it('should POST room with addRoom()', fakeAsync(() => {
    let response: Room = <Room>{};
    const room = roomsList[0];

    service.addRoom(room).subscribe(
      (receivedResponse: Room) => {
        response = receivedResponse;
      },
      (error: any) => {}
    );

    const requestWrapper = backend.expectOne({url: 'http://localhost:8081/room'});
    requestWrapper.flush(room);
    backend.verify();

    tick();

    expect(requestWrapper.request.method).toEqual('POST');
    expect(response).toEqual(room);
  }));

  it('should PUT room with updateRoom()', fakeAsync(() => {
    let response: Room = <Room>{};
    const room = roomsList[0];

    service.updateRoom(room).subscribe(
      (receivedResponse: Room) => {
        response = receivedResponse;
      },
      (error: any) => {}
    );

    const requestWrapper = backend.expectOne({url: 'http://localhost:8081/room'});
    requestWrapper.flush(room);
    backend.verify();

    tick();

    expect(requestWrapper.request.method).toEqual('PUT');
    expect(response).toEqual(room);
  }));

  it('should delete room with deleteRoom()', fakeAsync(() => {
    let response = {};
    const expectedResponse = {
      "code": 0,
      "description": "OK"
    };
    const room = roomsList[0];

    service.deleteRoom(room.id).subscribe(
      (receivedResponse: any) => {
        response = receivedResponse;
      },
      (error: any) => {}
    );

    const requestWrapper = backend.expectOne({url: 'http://localhost:8081/room?id=' + room.id});
    requestWrapper.flush(expectedResponse);
    backend.verify();

    tick();

    expect(requestWrapper.request.method).toEqual('DELETE');
    expect(response).toEqual(expectedResponse);
  }));
});
