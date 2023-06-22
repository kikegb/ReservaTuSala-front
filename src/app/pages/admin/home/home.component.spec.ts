import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { Router } from '@angular/router';

describe('Admin HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;

  let routerMock = jasmine.createSpyObj('Router', ['navigate']);

  const translations = {
    "adminPages": ["Home", "Users", "Operations", "Rooms", "Locations"]
  };

  beforeEach(waitForAsync( () => {
    TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule.withTranslations('en', translations)
      ],
      declarations: [ HomeComponent ],
      providers: [
        { provide: Router, useValue: routerMock }
      ]
    })
    .compileComponents();

    router = TestBed.inject(Router);
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

  it('should navigate to other view with navigateTo()', () => {
    component.navigateTo(1);
    expect(router.navigate).toHaveBeenCalledWith(['admin/operations']);
  });
});
