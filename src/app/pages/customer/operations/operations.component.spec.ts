import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OperationsComponent } from './operations.component';
import { MaterialModule } from 'src/app/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { OperationTableComponent } from './components/operation-table/operation-table.component';
import { UsersService } from 'src/app/global/services/users.service';
import { UsersServiceMock } from 'src/test-helpers/mocks/users-service-mock';
import { OperationsService } from 'src/app/global/services/operations.service';
import { OperationsServiceMock } from 'src/test-helpers/mocks/operations-service-mock';

describe('Customer OperationsComponent', () => {
  let component: OperationsComponent;
  let fixture: ComponentFixture<OperationsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        TranslateModule.forRoot()
      ],
      declarations: [ OperationsComponent, OperationTableComponent ],
      providers: [
        { provide: UsersService, useValue: UsersServiceMock },
        { provide: OperationsService, useValue: OperationsServiceMock }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render "Operations" as main title', () => {
    expect(fixture.debugElement.nativeElement.textContent).toContain('title.operations');
  });
});
