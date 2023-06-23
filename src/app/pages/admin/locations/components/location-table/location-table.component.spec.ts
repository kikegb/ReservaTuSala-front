import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationTableComponent } from './location-table.component';
import { LocationsService } from 'src/app/global/services/locations.service';
import { LocationsServiceMock } from 'src/test-helpers/mocks/locations-service-mock';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRefMock } from 'src/test-helpers/mocks/mat-dialog-ref-mock';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'src/app/material.module';
import { Room } from 'src/app/global/interfaces/room.interface';
import { Location } from 'src/app/global/interfaces/location.interface';
import { DeleteDialogComponent } from 'src/app/global/components/delete-dialog/delete-dialog.component';
import { LocationFormDialogComponent } from '../location-form-dialog/location-form-dialog.component';
import { of } from 'rxjs';

describe('Admin LocationTableComponent', () => {
  let component: LocationTableComponent;
  let fixture: ComponentFixture<LocationTableComponent>;
  let service: LocationsService;

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        TranslateModule.forRoot()
      ],
      declarations: [ LocationTableComponent ],
      providers: [
        { provide: LocationsService, useValue: LocationsServiceMock },
        { provide: MatDialog, useValue: MatDialogRefMock }
      ]
    })
    .compileComponents();

    service = TestBed.inject(LocationsService);
    fixture = TestBed.createComponent(LocationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get locations from api on init', () => {
    let spyServiceGet = spyOn(service, 'getLocations').and.returnValue(of(locationsList));
    component.ngOnInit();
    expect(spyServiceGet).toHaveBeenCalled();
    expect(component.locations.length).toBe(2);
  });

  it('should add new locations to the list', () => {
    let newLocation = <Location>{
      "id": 3,
      "street": "C street",
      "number": "76",
      "postcode": "98765",
      "town": "Testown",
      "province": "Testvince",
      "country": "Testland"
    };
    let spyServiceAdd = spyOn(service, 'addLocation').and.returnValue(of(newLocation));
    component.addLocation(newLocation);
    expect(spyServiceAdd).toHaveBeenCalled();
    expect(component.locations.length).toBe(3);
  });

  it('should update locations in the list', () => {
    let updatedLocation = component.locations[0];
    updatedLocation.street = 'Street dummy';
    updatedLocation.number = '3';
    updatedLocation.postcode = '10293';
    let spyServiceUpdate = spyOn(service, 'updateLocation').and.returnValue(of(updatedLocation));
    component.updateLocation(updatedLocation);
    expect(spyServiceUpdate).toHaveBeenCalled();
    expect(component.locations.length).toBe(2);
  });

  it('should delete locations in the list', () => {
    let locationId = component.locations[0].id;
    let spyServiceDelete = spyOn(service, 'deleteLocation').and.returnValue(of({}));
    component.deleteLocation(locationId);
    expect(spyServiceDelete).toHaveBeenCalled();
    expect(component.locations.length).toBe(1);
  });

  it('should open dialog to confirm location deletion', () => {
    let locationId = component.locations[0].id;
    let spyDialogOpen = spyOn(component.dialog, 'open').and.callThrough();
    component.showDeleteDialog(locationId);
    expect(spyDialogOpen).toHaveBeenCalled();
    expect(spyDialogOpen).toHaveBeenCalledWith(DeleteDialogComponent, { data: { elementName: 'elements.location' } });
  });

  it('should open dialog to update a location', () => {
    let location = component.locations[0];
    let spyDialogOpen = spyOn(component.dialog, 'open').and.callThrough();
    component.showEditLocationDialog(location);
    expect(spyDialogOpen).toHaveBeenCalled();
    expect(spyDialogOpen).toHaveBeenCalledWith(LocationFormDialogComponent, { data: { title: 'edit.location', location: location } });
  });

  it('should open dialog to add new locations', () => {
    let spyDialogOpen = spyOn(component.dialog, 'open').and.callThrough();
    component.showAddLocationDialog();
    expect(spyDialogOpen).toHaveBeenCalled();
    expect(spyDialogOpen).toHaveBeenCalledWith(LocationFormDialogComponent, { data: { title: 'new.location', location: undefined} });
  });
});
