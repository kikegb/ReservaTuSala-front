import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { TranslateModule } from '@ngx-translate/core';
import { TodayTableComponent } from './components/today-table/today-table.component';
import { PendingTableComponent } from './components/pending-table/pending-table.component';
import { MaterialModule } from 'src/app/material.module';
import { UsersService } from 'src/app/global/services/users.service';
import { UsersServiceMock } from 'src/test-helpers/mocks/users-service-mock';
import { OperationsService } from 'src/app/global/services/operations.service';
import { OperationsServiceMock } from 'src/test-helpers/mocks/operations-service-mock';

describe('Business HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        TranslateModule.forRoot()
      ],
      declarations: [ HomeComponent, TodayTableComponent, PendingTableComponent ],
      providers: [
        { provide: UsersService, useValue: UsersServiceMock },
        { provide: OperationsService, useValue: OperationsServiceMock }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render "Home" as main title', () => {
    expect(fixture.debugElement.nativeElement.textContent).toContain('title.home');
  });
});
