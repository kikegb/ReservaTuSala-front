import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { TokenUtilsService } from 'src/app/global/services/token-utils.service';
import { SidenavService } from 'src/app/global/services/sidenav.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from 'src/app/global/services/login.service';
import { SnackBarService } from 'src/app/global/services/snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userForm: FormGroup;
  jwtDecode = jwtDecode;

  constructor(
    private formBuilder: FormBuilder, 
    private loginSvc: LoginService,
    private router: Router,
    private tokenSvc: TokenUtilsService,
    private sidenav: SidenavService,
    private snackbarSvc: SnackBarService,
    private translate: TranslateService)
  {
    this.userForm = this.formBuilder.group({
      'email': [null, Validators.required],
      'password': [null, Validators.required]
    });
    this.sidenav.close();
  }

  login(): void {
    this.loginSvc.login(this.userForm.value.email, this.userForm.value.password)
    .subscribe((response: any) => {
      this.snackbarSvc.openSuccess('messages.loginSuccessful');
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
      if (e.error) {
        this.snackbarSvc.openErrorByCode(e.error.code);
      } else {
        this.snackbarSvc.openError('messages.loginError');
      }
    });
  }

  navigateSignup(): void {
    this.router.navigate(['/signup']);
  }
}
