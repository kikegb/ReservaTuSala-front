import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MaterialModule } from 'src/app/material.module';
import { SidenavService } from '../../services/sidenav.service';
import { HeaderComponent } from './header.component';
import { UsersService } from '../../services/users.service';
import { UsersServiceMock } from 'src/test-helpers/mocks/users-service-mock';
import { TranslateModule } from '@ngx-translate/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const SidenavServiceMock = {
    toggle: () => {}
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ 
        MaterialModule,
        TranslateModule.forRoot() 
      ],
      declarations: [ HeaderComponent ],
      providers: [
        {provide: SidenavService, useValue: SidenavServiceMock },
        {provide: UsersService, useValue: UsersServiceMock }
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render "ReservaTuSala" as main title', () => {
    let toolbar = fixture.debugElement.nativeElement;
    expect(toolbar.textContent).toContain('ReservaTuSala');
  });

  it('shoud toggle sidenav when calling toggleSidenav method', () => {
    let service = fixture.debugElement.injector.get(SidenavService);
    const spySidenavToggle = spyOn(service, 'toggle');
    component.toggleSidenav();
    expect(spySidenavToggle).toHaveBeenCalled();
  });

});
