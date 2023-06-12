import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationFormDialogComponent } from './location-form-dialog.component';

describe('LocationFormDialogComponent', () => {
  let component: LocationFormDialogComponent;
  let fixture: ComponentFixture<LocationFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationFormDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
