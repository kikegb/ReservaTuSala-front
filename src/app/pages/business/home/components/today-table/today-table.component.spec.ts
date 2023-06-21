import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayTableComponent } from './today-table.component';
import { UsersService } from 'src/app/global/services/users.service';
import { UsersServiceMock } from 'src/test-helpers/mocks/users-service-mock';
import { MaterialModule } from 'src/app/material.module';
import { TranslateModule } from '@ngx-translate/core';

describe('TodayTableComponent', () => {
  let component: TodayTableComponent;
  let fixture: ComponentFixture<TodayTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        TranslateModule.forRoot()
      ],
      declarations: [ TodayTableComponent ],
      providers: [
        { provide: UsersService, useValue: UsersServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodayTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
