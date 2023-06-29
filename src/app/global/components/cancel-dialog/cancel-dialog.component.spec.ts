import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CancelDialogComponent } from './cancel-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogRefMock } from 'src/test-helpers/mocks/mat-dialog-ref-mock';

describe('CancelDialogComponent', () => {
  let component: CancelDialogComponent;
  let fixture: ComponentFixture<CancelDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot()
      ],
      declarations: [ CancelDialogComponent ],
      providers: [
        {provide: MatDialogRef, useValue: MatDialogRefMock}
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
