import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LocationFormDialogComponent } from './location-form-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogRefMock } from 'src/test-helpers/mocks/mat-dialog-ref-mock';

describe('Admin LocationFormDialogComponent', () => {
  let component: LocationFormDialogComponent;
  let fixture: ComponentFixture<LocationFormDialogComponent>;

  const mockDialogData = {
    title: 'edit.location',
    location: {
      "id": 1,
      "street": "A street",
      "number": "5",
      "postcode": "12345",
      "town": "Testown",
      "province": "Testvince",
      "country": "Testland"
    },
  };

  const mockDialogDataNoLocation = {
    title: 'new.location'
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot()
      ],
      declarations: [ LocationFormDialogComponent ],
      providers: [
        {provide: MatDialogRef, useValue: MatDialogRefMock},
        {provide: MAT_DIALOG_DATA, useValue: {}}
      ],
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create empty form if empty location data provided', () => {
    TestBed.overrideProvider(MAT_DIALOG_DATA, {useValue: mockDialogDataNoLocation});
    TestBed.compileComponents();
    fixture = TestBed.createComponent(LocationFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.locationForm.value.street).toBeNull();
    expect(component.locationForm.value.number).toBeNull();
    expect(component.locationForm.value.postcode).toBeNull();
    expect(component.locationForm.value.town).toBeNull();
    expect(component.locationForm.value.province).toBeNull();
    expect(component.locationForm.value.country).toBeNull();
  });

  it('should create form with location data provided', () => {
    TestBed.overrideProvider(MAT_DIALOG_DATA, {useValue: mockDialogData});
    TestBed.compileComponents();
    fixture = TestBed.createComponent(LocationFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.locationForm.value.street).toEqual(mockDialogData.location.street);
    expect(component.locationForm.value.number).toEqual(mockDialogData.location.number);
    expect(component.locationForm.value.postcode).toEqual(mockDialogData.location.postcode);
    expect(component.locationForm.value.town).toEqual(mockDialogData.location.town);
    expect(component.locationForm.value.province).toEqual(mockDialogData.location.province);
    expect(component.locationForm.value.country).toEqual(mockDialogData.location.country);
  });

  it('should close and return undefined when calling onCancel method', () => {
    TestBed.overrideProvider(MAT_DIALOG_DATA, {useValue: mockDialogData});
    TestBed.compileComponents();
    fixture = TestBed.createComponent(LocationFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const spyDialogClose = spyOn(component.dialogRef, 'close');
    component.onCancel();
    expect(spyDialogClose).toHaveBeenCalled();
    expect(spyDialogClose).toHaveBeenCalledWith(undefined);
  });

  it('should close and return empty location when calling onSave method and no location data provided', () => {
    TestBed.overrideProvider(MAT_DIALOG_DATA, {useValue: mockDialogDataNoLocation});
    TestBed.compileComponents();
    fixture = TestBed.createComponent(LocationFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    let nullLocation = {
      street: null,
      number: null,
      postcode: null,
      town: null,
      province: null,
      country: null
    };

    const spyDialogClose = spyOn(component.dialogRef, 'close');
    component.onSave();
    expect(spyDialogClose).toHaveBeenCalled();
    expect(spyDialogClose).toHaveBeenCalledWith(nullLocation);
  });

  it('should close and return not empty location when calling onSave method and location data provided', () => {
    TestBed.overrideProvider(MAT_DIALOG_DATA, {useValue: mockDialogData});
    TestBed.compileComponents();
    fixture = TestBed.createComponent(LocationFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const spyDialogClose = spyOn(component.dialogRef, 'close');
    component.onSave();
    expect(spyDialogClose).toHaveBeenCalled();
    expect(spyDialogClose).toHaveBeenCalledWith(mockDialogData.location);
  });
});
