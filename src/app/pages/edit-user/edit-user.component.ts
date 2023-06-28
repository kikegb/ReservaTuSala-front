import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { tap } from 'rxjs';
import { User } from 'src/app/global/interfaces/user.interface';
import { SnackBarService } from 'src/app/global/services/snack-bar.service';
import { UsersService } from 'src/app/global/services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
  user: User;
  userForm: FormGroup;
  jwtDecode = jwtDecode;

  constructor(
    private formBuilder: FormBuilder,
    private userSvc: UsersService,
    private router: Router,
    private snackbarSvc: SnackBarService)
  {
    this.user = {} as User;
    this.userForm = this.userForm = this.formBuilder.group({
      'name': [this.user?.name || null, Validators.required],
      'cnif': [this.user?.cnif || null, Validators.required],
      'email': [this.user?.email || null, Validators.required],
      'password': [this.user?.password || null, Validators.required],
      'passwordConf': [this.user?.password || null, Validators.required],
      'phone': [this.user?.phone || null, Validators.required],
      'role': [this.user?.role || null, Validators.required],
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = <any>this.jwtDecode(token);
      this.userSvc.getById(decodedToken.id).subscribe((user: User) => {
        this.user = user;
        this.userForm = this.formBuilder.group({
          'name': [this.user?.name || null, Validators.required],
          'cnif': [this.user?.cnif || null, Validators.required],
          'email': [this.user?.email || null, Validators.required],
          'password': [this.user?.password || null, Validators.required],
          'passwordConf': [this.user?.password || null, Validators.required],
          'phone': [this.user?.phone || null, Validators.required],
          'role': [this.user?.role || null, Validators.required],
        });
      });
    }
  }

  confirmPassword(): boolean {
    return this.userForm?.value.password !== this.userForm?.value.passwordConf;
  }

  onCancel(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = <any>this.jwtDecode(token);
      const role = decodedToken.role;
      if (role == 'ADMIN') {
        this.router.navigate(['admin/home']);
      }
      if (role == 'CUSTOMER') {
        this.router.navigate(['customer/home']);
      }
      if (role == 'BUSINESS') {
        this.router.navigate(['business/home']);
      }
    }
  }

  onSave(): void {
    let updatedUser: User = {
      ...this.user,
      name: this.userForm?.value.name,
      cnif: this.userForm?.value.cnif,
      email: this.userForm?.value.email,
      password: this.userForm?.value.password,
      phone: this.userForm?.value.phone,
      role: this.userForm?.value.role
    };
    this.userSvc.updateUser(updatedUser).subscribe( user => {
      this.snackbarSvc.openSuccess('messages.updateSuccess');
      this.user = user;
    }, (e: HttpErrorResponse) => {
      console.log(e.status);
      if (e.error) {
        this.snackbarSvc.openErrorByCode(e.error.code);
      } else {
        this.snackbarSvc.openError('messages.updateError');
      }
    });
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = <any>this.jwtDecode(token);
      const role = decodedToken.role;
      if (role == 'ADMIN') {
        this.router.navigate(['admin/home']);
      }
      if (role == 'CUSTOMER') {
        this.router.navigate(['customer/home']);
      }
      if (role == 'BUSINESS') {
        this.router.navigate(['business/home']);
      }
    }
  }

}
