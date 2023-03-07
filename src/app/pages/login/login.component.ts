import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { SidenavService } from 'src/app/global/services/sidenav.service';
import { TokenUtilsService } from 'src/app/global/services/token-utils.service';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private loginSvc: LoginService,
    private router: Router,
    private tokenSvc: TokenUtilsService)
  {
    this.userForm = this.formBuilder.group({
      'email': [null, Validators.required],
      'password': [null, Validators.required]
    });
  }

  login(): void {
    this.loginSvc.login(this.userForm.value.email, this.userForm.value.password)
    .subscribe((response: any) => {
      localStorage.setItem('token', response.Authorization);
      this.tokenSvc.setToken(response.Authorization);
      const decodedToken = <any>jwtDecode(response.Authorization);
      const role = decodedToken.role;
      if (role == 'ADMIN') {
        this.router.navigate(['/admin/home']);
      }
      if (role == 'CUSTOMER') {
        this.router.navigate(['/customer/home']);
      }
      if (role == 'BUSINESS') {
        this.router.navigate(['/business/home']);
      }
    });
  }

}
