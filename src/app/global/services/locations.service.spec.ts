import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LocationsService } from './locations.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Location } from '../interfaces/location.interface';

describe('LocationsService', () => {
  let service: LocationsService;
  let backend: HttpTestingController;

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        LocationsService
      ]
    });
    service = TestBed.inject(LocationsService);
    backend = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should GET list of locations with getLocations()', fakeAsync(() => {
    let response: Location[] = [];

    service.getLocations().subscribe(
      (receivedResponse: Location[]) => {
        response = receivedResponse;
      },
      (error: any) => {}
    );

    const requestWrapper = backend.expectOne({url: 'http://localhost:8081/location/all'});
    requestWrapper.flush(locationsList);
    backend.verify();

    tick();

    expect(requestWrapper.request.method).toEqual('GET');
    expect(response).toEqual(locationsList);
  }));

  it('should POST location with addLocation()', fakeAsync(() => {
    let response: Location = <Location>{};
    const location = locationsList[0];

    service.addLocation(location).subscribe(
      (receivedResponse: Location) => {
        response = receivedResponse;
      },
      (error: any) => {}
    );

    const requestWrapper = backend.expectOne({url: 'http://localhost:8081/location'});
    requestWrapper.flush(location);
    backend.verify();

    tick();

    expect(requestWrapper.request.method).toEqual('POST');
    expect(response).toEqual(location);
  }));

  it('should PUT location with updateLocation()', fakeAsync(() => {
    let response: Location = <Location>{};
    const location = locationsList[0];

    service.updateLocation(location).subscribe(
      (receivedResponse: Location) => {
        response = receivedResponse;
      },
      (error: any) => {}
    );

    const requestWrapper = backend.expectOne({url: 'http://localhost:8081/location'});
    requestWrapper.flush(location);
    backend.verify();

    tick();

    expect(requestWrapper.request.method).toEqual('PUT');
    expect(response).toEqual(location);
  }));

  it('should delete location with deleteLocation()', fakeAsync(() => {
    let response = {};
    const expectedResponse = {
      "code": 0,
      "description": "OK"
    };
    const location = locationsList[0];

    service.deleteLocation(location.id).subscribe(
      (receivedResponse: any) => {
        response = receivedResponse;
      },
      (error: any) => {}
    );

    const requestWrapper = backend.expectOne({url: 'http://localhost:8081/location?id=' + location.id});
    requestWrapper.flush(expectedResponse);
    backend.verify();

    tick();

    expect(requestWrapper.request.method).toEqual('DELETE');
    expect(response).toEqual(expectedResponse);
  }));
});
