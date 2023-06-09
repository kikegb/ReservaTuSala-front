import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './global/guards/admin.guard';
import { AdminModule } from './pages/admin/admin.module';
import { LoginModule } from './pages/login/login.module';
import { UnauthorizedModule } from './pages/unauthorized/unauthorized.module';
import { BusinessGuard } from './global/guards/business.guard';
import { BusinessModule } from './pages/business/business.module';

const routes: Routes = [

  { path: 'admin', canActivate: [AdminGuard], loadChildren: () => AdminModule },

  { path: 'business', canActivate: [BusinessGuard], loadChildren: () => BusinessModule },
  
  { path: 'login', loadChildren: () => LoginModule },
  
  { path: 'unauthorized', loadChildren: () => UnauthorizedModule },
   
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
