import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material.module';
import { MatDialogRefMock } from 'src/test-helpers/mocks/mat-dialog-ref-mock';

import { RoomFormDialogComponent } from './room-form-dialog.component';
import { Room } from 'src/app/global/interfaces/room.interface';
import { Location } from 'src/app/global/interfaces/location.interface';
import { User } from 'src/app/global/interfaces/user.interface';
import { UsersService } from 'src/app/global/services/users.service';
import { UsersServiceMock } from 'src/test-helpers/mocks/users-service-mock';
import { LocationsService } from 'src/app/global/services/locations.service';
import { LocationsServiceMock } from 'src/test-helpers/mocks/locations-service-mock';
import { MaterialsService } from 'src/app/global/services/materials.service';
import { MaterialsServiceMock } from 'src/test-helpers/mocks/materials-service-mock';
import { SchedulesService } from 'src/app/global/services/schedules.service';
import { SchedulesServiceMock } from 'src/test-helpers/mocks/schedules-service-mock';
import { TranslateTestingModule } from 'ngx-translate-testing';

describe('Business RoomFormDialogComponent', () => {
  let component: RoomFormDialogComponent;
  let fixture: ComponentFixture<RoomFormDialogComponent>;

  const mockDialogData = {
    title: 'edit.room',
    room: <Room>{
      "id": 1,
      "business": <User>{},
      "location": <Location>{},
      "name": "Room 1",
      "size": 25,
      "capacity": 20,
      "price": 20.99,
      "operations": [],
      "schedules": [],
      "materials": []
    }
  };

  const mockDialogDataNoRoom = {
    title: 'new.room'
  };

  const translations = {
    "weekDays": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        TranslateTestingModule.withTranslations('en', translations)
      ],
      declarations: [ RoomFormDialogComponent ],
      providers: [
        {provide: MatDialogRef, useValue: MatDialogRefMock},
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: UsersService, useValue: UsersServiceMock},
        {provide: LocationsService, useValue: LocationsServiceMock},
        {provide: MaterialsService, useValue: MaterialsServiceMock},
        {provide: SchedulesService, useValue: SchedulesServiceMock}
      ],
    });
  }));

  it('should create', () => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(RoomFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it('should create empty form if empty room data provided', () => {
    TestBed.overrideProvider(MAT_DIALOG_DATA, {useValue: mockDialogDataNoRoom});
    TestBed.compileComponents();
    fixture = TestBed.createComponent(RoomFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.roomForm.value.name).toBeNull();
    expect(component.roomForm.value.location).toBeNull();
    expect(component.roomForm.value.size).toBeNull();
    expect(component.roomForm.value.capacity).toBeNull();
    expect(component.roomForm.value.price).toBeNull();
    expect(component.roomForm.value.material).toBeNull();
    expect(component.roomForm.value.quantity).toBeNull();
    expect(component.roomForm.value.weekday).toBeNull();
    expect(component.roomForm.value.start).toBeNull();
    expect(component.roomForm.value.end).toBeNull();
  });

  it('should create form with room data provided', () => {
    TestBed.overrideProvider(MAT_DIALOG_DATA, {useValue: mockDialogData});
    TestBed.compileComponents();
    fixture = TestBed.createComponent(RoomFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.roomForm.value.name).toEqual(mockDialogData.room.name);
    expect(component.roomForm.value.location).toEqual(mockDialogData.room.location);
    expect(component.roomForm.value.size).toEqual(mockDialogData.room.size);
    expect(component.roomForm.value.capacity).toEqual(mockDialogData.room.capacity);
    expect(component.roomForm.value.price).toEqual(mockDialogData.room.price);
  });

  it('should close and return undefined when calling onCancel method', () => {
    TestBed.overrideProvider(MAT_DIALOG_DATA, {useValue: mockDialogData});
    TestBed.compileComponents();
    fixture = TestBed.createComponent(RoomFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const spyDialogClose = spyOn(component.dialogRef, 'close');
    component.onCancel();
    expect(spyDialogClose).toHaveBeenCalled();
    expect(spyDialogClose).toHaveBeenCalledWith(undefined);
  });

  it('should close and return empty room when calling onSave method and no room data provided', () => {
    TestBed.overrideProvider(MAT_DIALOG_DATA, {useValue: mockDialogDataNoRoom});
    TestBed.compileComponents();
    fixture = TestBed.createComponent(RoomFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    let nullRoom = {
      name: null,
      business: undefined,
      location: null,
      size: null,
      capacity: null,
      price: null,
      materials: [],
      schedules: []
    };

    const spyDialogClose = spyOn(component.dialogRef, 'close');
    component.onSave();
    expect(spyDialogClose).toHaveBeenCalled();
    expect(spyDialogClose).toHaveBeenCalledWith(nullRoom);
  });

  it('should close and return not empty room when calling onSave method and room data provided', () => {
    TestBed.overrideProvider(MAT_DIALOG_DATA, {useValue: mockDialogData});
    TestBed.compileComponents();
    fixture = TestBed.createComponent(RoomFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const spyDialogClose = spyOn(component.dialogRef, 'close');
    component.onSave();
    expect(spyDialogClose).toHaveBeenCalled();
    expect(spyDialogClose).toHaveBeenCalledWith(mockDialogData.room);
  });
});
