import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OperationsComponent } from './operations.component';
import { OperationTableComponent } from './components/operation-table/operation-table.component';
import { MaterialModule } from 'src/app/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { OperationsService } from 'src/app/global/services/operations.service';
import { OperationsServiceMock } from 'src/test-helpers/mocks/operations-service-mock';

describe('Admin OperationsComponent', () => {
  let component: OperationsComponent;
  let fixture: ComponentFixture<OperationsComponent>;
  let service: OperationsService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        TranslateModule.forRoot()
      ],
      declarations: [ OperationsComponent, OperationTableComponent ],
      providers: [
        { provide: OperationsService, useValue: OperationsServiceMock }
      ],
    })
    .compileComponents();

    service = TestBed.inject(OperationsService);
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
