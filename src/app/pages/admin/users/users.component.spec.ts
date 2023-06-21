import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MaterialModule } from 'src/app/material.module';
import { UsersServiceMock } from 'src/test-helpers/mocks/users-service-mock';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UsersComponent } from './users.component';
import { UsersService } from 'src/app/global/services/users.service';
import { TranslateModule } from '@ngx-translate/core';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let service: UsersService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        TranslateModule.forRoot()
      ],
      declarations: [ UsersComponent, UserTableComponent ],
      providers: [
        { provide: UsersService, useValue: UsersServiceMock }
      ],
    })
    .compileComponents();

    service = TestBed.inject(UsersService);
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render "Users" as main title', () => {
    expect(fixture.debugElement.nativeElement.textContent).toContain('title.users');
  });
});
