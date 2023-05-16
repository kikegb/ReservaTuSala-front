import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Operation } from '../../interfaces/operation.interface';

@Component({
  selector: 'app-operation-form-dialog',
  templateUrl: './operation-form-dialog.component.html',
  styleUrls: ['./operation-form-dialog.component.scss']
})
export class OperationFormDialogComponent {
  title: string;
  operation: Operation;
  operationForm: FormGroup;
  hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];
  today = new Date();

  constructor(
    public dialogRef: MatDialogRef<OperationFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, operation: Operation },
    private formBuilder: FormBuilder)
  {
    this.title = data.title;
    this.operation = data.operation;
    this.operationForm = this.formBuilder.group({
      'startDate': [data.operation?.start.getDate() || null, Validators.required],
      'startTime': ['0'+data.operation?.start.getHours()+':00' || null, Validators.required],
      'endDate': [data.operation?.end.getDate() || null, Validators.required],
      'endTime': ['0'+data.operation?.end.getHours()+':00' || null, Validators.required],
      'cost': [data.operation?.cost || null, Validators.required],
      'status': [data.operation?.status || null, Validators.required],
      'deleted': [data.operation?.deleted || false, Validators.required],
    });
  }

  isBeforeOrSame(): boolean {
    const startDate = new Date(this.operationForm.value.startDate);
    const endDate = new Date(this.operationForm.value.endDate);
    const startHour = parseInt(this.operationForm.value.startTime.split(':')[0]);
    const endHour = parseInt(this.operationForm.value.endTime.split(':')[0]);

    return (startDate > endDate || ((startDate.getDate() == endDate.getDate()) && (startHour >= endHour)));
  }

  onCancel(): void {
    this.dialogRef.close(undefined);
  }

  onSave(): void {
    var startDateTime = new Date(this.operationForm.value.startDate);
    var endDateTime = new Date(this.operationForm.value.endDate);
    startDateTime.setHours(this.operationForm.value.startTime.split(':')[0])
    endDateTime.setHours(this.operationForm.value.endTime.split(':')[0])
    if(!this.operation) {
      let newOperation: Operation = {
        id: this.operationForm.value.id,
        start: startDateTime,
        end: endDateTime,
        cost: this.operationForm.value.cost,
        status: this.operationForm.value.status,
        deleted: this.operationForm.value.deleted
      };
      this.dialogRef.close(newOperation);
    } else {
      let updatedOperation: Operation = {
        ...this.operation,
        start: startDateTime,
        end: endDateTime,
        cost: this.operationForm.value.cost,
        status: this.operationForm.value.status,
        deleted: this.operationForm.value.deleted
      };
      this.dialogRef.close(updatedOperation);
    }
  }

}
