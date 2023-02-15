import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRefMock } from 'src/test-helpers/mocks/mat-dialog-ref-mock';
import { DeleteDialogComponent } from './delete-dialog.component';

describe('DeleteDialogComponent', () => {
  let component: DeleteDialogComponent;
  let fixture: ComponentFixture<DeleteDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDialogComponent ],
      providers: [
        {provide: MatDialogRef, useValue: MatDialogRefMock},
        {provide: MAT_DIALOG_DATA, useValue: []}
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close and return false when calling onCancel method', () => {
    const spyDialogRef = spyOn(component.dialogRef, 'close');
    component.onCancel();
    expect(spyDialogRef).toHaveBeenCalled();
    expect(spyDialogRef).toHaveBeenCalledWith(false);
  });

  it('should close and return true when calling onConfirm method', () => {
    const spyDialogClose = spyOn(component.dialogRef, 'close');
    component.onConfirm();
    expect(spyDialogClose).toHaveBeenCalled();
    expect(spyDialogClose).toHaveBeenCalledWith(true);
  });
});
