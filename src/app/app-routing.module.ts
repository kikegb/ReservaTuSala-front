import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './global/guards/admin.guard';

const routes: Routes = [
  
  { path: 'admin/home', canActivate: [AdminGuard], loadChildren: () => import('./pages/admin/home/home.module').then(m => m.HomeModule) },
  
  { path: 'admin/users', canActivate: [AdminGuard], loadChildren: () => import('./pages/admin/users/users.module').then(m => m.UsersModule) },
  
  { path: 'admin/operations', canActivate: [AdminGuard], loadChildren: () => import('./pages/admin/operations/operations.module').then(m => m.OperationsModule) },

  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  
  { path: 'unauthorized', loadChildren: () => import('./pages/unauthorized/unauthorized.module').then(m => m.UnauthorizedModule) },
   
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
