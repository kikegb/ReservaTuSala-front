import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { LocalStorageService } from 'src/app/global/services/local-storage.service';
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
    private storageSvc: LocalStorageService,
    private router: Router)
  {
    this.userForm = this.formBuilder.group({
      'email': [null, Validators.required],
      'password': [null, Validators.required]
    });
  }

  login(): void {
    this.loginSvc.login(this.userForm.value.email, this.userForm.value.password)
    .subscribe((response: any) => {
      this.storageSvc.set('token', response.Authorization);
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
