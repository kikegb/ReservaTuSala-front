import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent {
  user: User;
  userForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    private formBuilder: FormBuilder)
  {
    this.user = data.user;
    this.userForm = this.formBuilder.group({
      'name': [data.user.name, Validators.required],
      'cnif': [data.user.cnif, Validators.required],
      'email': [data.user.email, Validators.required],
      'password': [data.user.password, Validators.required],
      'phone': [data.user.phone, Validators.required],
      'deleted': [data.user.deleted, Validators.required],
    });
  }

  onCancel(): void {
    this.dialogRef.close(undefined);
  }

  onSave(): void {
    let updatedUser: User = {
      ...this.user,
      name: this.userForm.value.name,
      cnif: this.userForm.value.cnif,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
      phone: this.userForm.value.phone,
      deleted: this.userForm.value.deleted
    }
    this.dialogRef.close(updatedUser);
  }
}
