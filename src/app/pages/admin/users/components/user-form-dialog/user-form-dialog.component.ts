import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.scss']
})
export class UserFormDialogComponent {
  title: string;
  user: User;
  userForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, user: User },
    private formBuilder: FormBuilder)
  {
    this.title = data.title;
    this.user = data.user;
    if (data.user === undefined) {
      this.userForm = this.formBuilder.group({
        'name': [null, Validators.required],
        'cnif': [null, Validators.required],
        'email': [null, Validators.required],
        'password': [null, Validators.required],
        'phone': [null, Validators.required],
        'role': [null, Validators.required],
      });
    } else {
      this.userForm = this.formBuilder.group({
        'name': [data.user.name, Validators.required],
        'cnif': [data.user.cnif, Validators.required],
        'email': [data.user.email, Validators.required],
        'password': [data.user.password, Validators.required],
        'phone': [data.user.phone, Validators.required],
        'role': [data.user.role, Validators.required],
        'deleted': [data.user.deleted, Validators.required],
      });
    } 
  }

  onCancel(): void {
    this.dialogRef.close(undefined);
  }

  onSave(): void {
    if(this.user === undefined) {
      this.dialogRef.close(<User>this.userForm.value);

    } else {
      let updatedUser: User = {
        ...this.user,
        name: this.userForm.value.name,
        cnif: this.userForm.value.cnif,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
        phone: this.userForm.value.phone,
        role: this.userForm.value.role,
        deleted: this.userForm.value.deleted
      };
      this.dialogRef.close(updatedUser);
    }
  }
}
