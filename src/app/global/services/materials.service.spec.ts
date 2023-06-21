import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { MaterialsService } from './materials.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Material } from '../interfaces/material.interface';

describe('MaterialsService', () => {
  let service: MaterialsService;
  let backend: HttpTestingController;

  const materialsList = [
    {
        "id": 1,
        "material": "Chairs",
        "quantity": 5
    },
    {
      "id": 2,
      "material": "whiteboard",
      "quantity": 1
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        MaterialsService
      ]
    });
    service = TestBed.inject(MaterialsService);
    backend = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should GET list of materials with getMaterials()', fakeAsync(() => {
    let response: Material[] = [];

    service.getMaterials().subscribe(
      (receivedResponse: Material[]) => {
        response = receivedResponse;
      },
      (error: any) => {}
    );

    const requestWrapper = backend.expectOne({url: 'http://localhost:8081/material/all'});
    requestWrapper.flush(materialsList);
    backend.verify();

    tick();

    expect(requestWrapper.request.method).toEqual('GET');
    expect(response).toEqual(materialsList);
  }));

  it('should POST material with addMaterial()', fakeAsync(() => {
    let response: Material = <Material>{};
    const material = materialsList[0];

    service.addMaterial(material).subscribe(
      (receivedResponse: Material) => {
        response = receivedResponse;
      },
      (error: any) => {}
    );

    const requestWrapper = backend.expectOne({url: 'http://localhost:8081/material'});
    requestWrapper.flush(material);
    backend.verify();

    tick();

    expect(requestWrapper.request.method).toEqual('POST');
    expect(response).toEqual(material);
  }));

  it('should PUT material with updateMaterial()', fakeAsync(() => {
    let response: Material = <Material>{};
    const material = materialsList[0];

    service.updateMaterial(material).subscribe(
      (receivedResponse: Material) => {
        response = receivedResponse;
      },
      (error: any) => {}
    );

    const requestWrapper = backend.expectOne({url: 'http://localhost:8081/material'});
    requestWrapper.flush(material);
    backend.verify();

    tick();

    expect(requestWrapper.request.method).toEqual('PUT');
    expect(response).toEqual(material);
  }));

  it('should delete material with deleteMaterial()', fakeAsync(() => {
    let response = {};
    const expectedResponse = {
      "code": 0,
      "description": "OK"
    };
    const material = materialsList[0];

    service.deleteMaterial(material.id).subscribe(
      (receivedResponse: any) => {
        response = receivedResponse;
      },
      (error: any) => {}
    );

    const requestWrapper = backend.expectOne({url: 'http://localhost:8081/material?id=' + material.id});
    requestWrapper.flush(expectedResponse);
    backend.verify();

    tick();

    expect(requestWrapper.request.method).toEqual('DELETE');
    expect(response).toEqual(expectedResponse);
  }));
});
