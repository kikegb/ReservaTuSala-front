import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RoomsComponent } from './rooms.component';
import { MaterialModule } from 'src/app/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { RoomTableComponent } from './components/room-table/room-table.component';
import { UsersService } from 'src/app/global/services/users.service';
import { UsersServiceMock } from 'src/test-helpers/mocks/users-service-mock';
import { RoomsService } from 'src/app/global/services/rooms.service';
import { RoomsServiceMock } from 'src/test-helpers/mocks/rooms-service-mock';

describe('Business RoomsComponent', () => {
  let component: RoomsComponent;
  let fixture: ComponentFixture<RoomsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        TranslateModule.forRoot()
      ],
      declarations: [ RoomsComponent, RoomTableComponent ],
      providers: [
        { provide: UsersService, useValue: UsersServiceMock },
        { provide: RoomsService, useValue: RoomsServiceMock }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render "Rooms" as main title', () => {
    expect(fixture.debugElement.nativeElement.textContent).toContain('title.rooms');
  });
});
