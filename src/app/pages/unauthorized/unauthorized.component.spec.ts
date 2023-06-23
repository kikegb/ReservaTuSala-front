import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UnauthorizedComponent } from './unauthorized.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'src/app/material.module';

describe('UnauthorizedComponent', () => {
  let component: UnauthorizedComponent;
  let fixture: ComponentFixture<UnauthorizedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot()
      ],
      declarations: [ UnauthorizedComponent ]
    });

    fixture = TestBed.createComponent(UnauthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render unauthorized page message', () => {
    expect(fixture.debugElement.nativeElement.textContent).toContain('messages.unauthorizedPage');
  });
});
