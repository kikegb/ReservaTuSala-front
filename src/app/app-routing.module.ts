import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './global/guards/admin.guard';
import { AdminModule } from './pages/admin/admin.module';
import { LoginModule } from './pages/login/login.module';
import { UnauthorizedModule } from './pages/unauthorized/unauthorized.module';
import { BusinessGuard } from './global/guards/business.guard';
import { BusinessModule } from './pages/business/business.module';
import { CustomerGuard } from './global/guards/customer.guard';
import { CustomerModule } from './pages/customer/customer.module';
import { EditUserModule } from './pages/edit-user/edit-user.module';
import { SignUpModule } from './pages/sign-up/sign-up.module';
import { EditUserGuard } from './global/guards/edit-user.guard';

const routes: Routes = [

  { path: 'admin', canActivate: [AdminGuard], loadChildren: () => AdminModule },

  { path: 'business', canActivate: [BusinessGuard], loadChildren: () => BusinessModule },

  { path: 'customer', canActivate: [CustomerGuard], loadChildren: () => CustomerModule },

  { path: 'edit-user', canActivate: [EditUserGuard], loadChildren: () => EditUserModule },
  
  { path: 'login', loadChildren: () => LoginModule },

  { path: 'signup', loadChildren: () => SignUpModule },
  
  { path: 'unauthorized', loadChildren: () => UnauthorizedModule },
   
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
