import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationTableComponent } from './location-table.component';
import { LocationsService } from 'src/app/global/services/locations.service';
import { LocationsServiceMock } from 'src/test-helpers/mocks/locations-service-mock';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRefMock } from 'src/test-helpers/mocks/mat-dialog-ref-mock';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'src/app/material.module';

describe('LocationTableComponent', () => {
  let component: LocationTableComponent;
  let fixture: ComponentFixture<LocationTableComponent>;

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

    fixture = TestBed.createComponent(LocationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
