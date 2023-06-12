import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayTableComponent } from './today-table.component';

describe('TodayTableComponent', () => {
  let component: TodayTableComponent;
  let fixture: ComponentFixture<TodayTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodayTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodayTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
