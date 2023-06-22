import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BusinessDetailComponent } from './business-detail.component';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/global/services/users.service';
import { UsersServiceMock } from 'src/test-helpers/mocks/users-service-mock';

describe('Customer BusinessDetailComponent', () => {
  let component: BusinessDetailComponent;
  let fixture: ComponentFixture<BusinessDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessDetailComponent ],
      providers: [
        ActivatedRoute,
        { provide: UsersService, useValue: UsersServiceMock },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessDetailComponent);
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
