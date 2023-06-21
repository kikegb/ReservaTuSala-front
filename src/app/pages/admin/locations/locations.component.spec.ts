import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LocationsComponent } from './locations.component';
import { LocationTableComponent } from './components/location-table/location-table.component';
import { LocationsService } from 'src/app/global/services/locations.service';
import { MaterialModule } from 'src/app/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { LocationsServiceMock } from 'src/test-helpers/mocks/locations-service-mock';

describe('Admin LocationsComponent', () => {
  let component: LocationsComponent;
  let fixture: ComponentFixture<LocationsComponent>;
  let service: LocationsService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        TranslateModule.forRoot()
      ],
      declarations: [ LocationsComponent, LocationTableComponent ],
      providers: [
        { provide: LocationsService, useValue: LocationsServiceMock }
      ],
    })
    .compileComponents();

    service = TestBed.inject(LocationsService);
    fixture = TestBed.createComponent(LocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render "Locations" as main title', () => {
    expect(fixture.debugElement.nativeElement.textContent).toContain('title.locations');
  });
});
