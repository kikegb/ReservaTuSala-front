import { TestBed } from '@angular/core/testing';
import { SidenavService } from './sidenav.service';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { SidenavServiceMock } from 'src/test-helpers/mocks/sidenav-service-mock';

describe('SidenavService', () => {
  let service: SidenavService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSidenavModule
      ],
      providers: [
        SidenavService,
        {provide: MatSidenav, useValue: {open: () => {}, close: () => {}, toggle: () => {}}}
      ]
    });

    service = TestBed.inject(SidenavService);
    service.setSidenav(TestBed.inject(MatSidenav));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open', () => {
    const spySidenavOpen = spyOn(service.sidenav, 'open');
    service.open();
    expect(spySidenavOpen).toHaveBeenCalled();
  });

  it('should close', () => {
    const spySidenavClose = spyOn(service.sidenav, 'close');
    service.close();
    expect(spySidenavClose).toHaveBeenCalled();
  });

  it('should toggle', () => {
    const spySidenavToggle = spyOn(service.sidenav, 'toggle');
    service.toggle();
    expect(spySidenavToggle).toHaveBeenCalled();
  });
});
