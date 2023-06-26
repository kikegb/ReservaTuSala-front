import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TokenExpiredDialogComponent } from './token-expired-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogRefMock } from 'src/test-helpers/mocks/mat-dialog-ref-mock';
import { Router } from '@angular/router';

describe('TokenExpiredDialogComponent', () => {
  let component: TokenExpiredDialogComponent;
  let fixture: ComponentFixture<TokenExpiredDialogComponent>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot()
      ],
      declarations: [ TokenExpiredDialogComponent ],
      providers: [
        {provide: MatDialogRef, useValue: MatDialogRefMock},
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) }
      ],
    })
    .compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(TokenExpiredDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login page and close when calling onExit method', () => {
    const spyDialogRef = spyOn(component.dialogRef, 'close');
    component.onExit();
    expect(spyDialogRef).toHaveBeenCalled();
  });
});
