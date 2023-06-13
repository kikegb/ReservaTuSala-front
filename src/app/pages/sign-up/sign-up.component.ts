import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { User } from 'src/app/global/interfaces/user.interface';
import { UsersService } from 'src/app/global/services/users.service';
import { LoginService } from '../login/services/login.service';
import { TokenUtilsService } from 'src/app/global/services/token-utils.service';
import jwtDecode from 'jwt-decode';
import { Operation } from 'src/app/global/interfaces/operation.interface';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userSvc: UsersService,
    private loginSvc: LoginService,
    private tokenSvc: TokenUtilsService,
    private router: Router)
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
      localStorage.setItem('token', response.Authorization);
      this.tokenSvc.setToken(response.Authorization);
      const decodedToken = <any>jwtDecode(response.Authorization);
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