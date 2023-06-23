import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/global/interfaces/user.interface';
import { UsersService } from 'src/app/global/services/users.service';
import { TokenUtilsService } from 'src/app/global/services/token-utils.service';
import jwtDecode from 'jwt-decode';
import { Operation } from 'src/app/global/interfaces/operation.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/global/services/login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  userForm: FormGroup;
  jwtDecode = jwtDecode;

  constructor(
    private formBuilder: FormBuilder,
    private userSvc: UsersService,
    private loginSvc: LoginService,
    private tokenSvc: TokenUtilsService,
    private router: Router,
    private _snackBar: MatSnackBar)
  {
    this.userForm = this.userForm = this.formBuilder.group({
      'name': [null, Validators.required],
      'cnif': [null, Validators.required],
      'email': [null, Validators.required],
      'password': [null, Validators.required],
      'passwordConf': [null, Validators.required],
      'phone': [null, Validators.required],
      'role': [null, Validators.required],
    });
  }

  confirmPassword(): boolean {
    return this.userForm?.value.password !== this.userForm?.value.passwordConf;
  }

  navigateLogin(): void {
    this.router.navigate(['/login']);
  }

  login(): void {
    this.loginSvc.login(this.userForm.value.email, this.userForm.value.password)
    .subscribe((response: any) => {
      this._snackBar.open('Successful Login.', 'close', {
        duration: 5000,
        panelClass: ['success-snackbar'],
      });
      this.tokenSvc.setToken(response.Authorization);
      const decodedToken = <any>this.jwtDecode(response.Authorization);
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
    }, (e: HttpErrorResponse) => {
      console.log(e.status);
      this._snackBar.open('Login error: invalid email or password.', 'close', {
        duration: 5000,
        panelClass: ['error-snackbar'],
        });
    });
  }

  signUp(): void {
    let newUser: User = <User>{
      name: this.userForm?.value.name,
      cnif: this.userForm?.value.cnif,
      email: this.userForm?.value.email,
      password: this.userForm?.value.password,
      phone: this.userForm?.value.phone,
      role: this.userForm?.value.role,
      businessOperations: <Operation[]>[],
      customerOperations: <Operation[]>[]
    };
    this.userSvc.addUser(newUser)
    .subscribe(() => {
      this.login();
    });
  }
}
