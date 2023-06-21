import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SidenavServiceMock } from 'src/test-helpers/mocks/sidenav-service-mock';
import { AppComponent } from './app.component';
import { HeaderComponent } from './global/components/header/header.component';
import { SidenavService } from './global/services/sidenav.service';
import { MaterialModule } from './material.module';
import { TranslateModule } from '@ngx-translate/core';
import { UsersService } from './global/services/users.service';
import { UsersServiceMock } from 'src/test-helpers/mocks/users-service-mock';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot()
      ],
      declarations: [
        AppComponent,
        HeaderComponent
      ],
      providers: [
        {provide: SidenavService, useValue: SidenavServiceMock},
        {provide: UsersService, useValue: UsersServiceMock}
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'reservatusala-front'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('reservatusala-front');
  });

  it(`should set sidenav after view init'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const service = TestBed.inject(SidenavService);
    const spySetSidenav = spyOn(service, 'setSidenav');
    app.ngAfterViewInit();
    expect(spySetSidenav).toHaveBeenCalledWith(app.sidenav);
  });
});
