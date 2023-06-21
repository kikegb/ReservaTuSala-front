import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomTableComponent } from './room-table.component';
import { RoomsService } from 'src/app/global/services/rooms.service';
import { RoomsServiceMock } from 'src/test-helpers/mocks/rooms-service-mock';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRefMock } from 'src/test-helpers/mocks/mat-dialog-ref-mock';
import { MaterialModule } from 'src/app/material.module';
import { TranslateModule } from '@ngx-translate/core';

describe('RoomTableComponent', () => {
  let component: RoomTableComponent;
  let fixture: ComponentFixture<RoomTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        TranslateModule.forRoot()
      ],
      declarations: [ RoomTableComponent ],
      providers: [
        { provide: RoomsService, useValue: RoomsServiceMock },
        { provide: MatDialog, useValue: MatDialogRefMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
