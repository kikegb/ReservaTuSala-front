import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingTableComponent } from './pending-table.component';
import { UsersService } from 'src/app/global/services/users.service';
import { UsersServiceMock } from 'src/test-helpers/mocks/users-service-mock';
import { OperationsService } from 'src/app/global/services/operations.service';
import { OperationsServiceMock } from 'src/test-helpers/mocks/operations-service-mock';
import { MaterialModule } from 'src/app/material.module';
import { TranslateModule } from '@ngx-translate/core';

describe('PendingTableComponent', () => {
  let component: PendingTableComponent;
  let fixture: ComponentFixture<PendingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        TranslateModule.forRoot()
      ],
      declarations: [ PendingTableComponent ],
      providers: [
        { provide: UsersService, useValue: UsersServiceMock },
        { provide: OperationsService, useValue: OperationsServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
