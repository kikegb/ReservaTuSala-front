import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent {
  userForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    private formBuilder: FormBuilder)
  {
    this.userForm = this.formBuilder.group({
      'name': [null, Validators.required],
      'cnif': [null, Validators.required],
      'email': [null, Validators.required],
      'password': [null, Validators.required],
      'phone': [null, Validators.required],
      'role': [null, Validators.required],
    });
  }

  onCancel(): void {
    this.dialogRef.close(undefined);
  }

  onSave(): void {
    this.dialogRef.close(<User>this.userForm.value);
  }
}
