import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  { path: 'admin/home', loadChildren: () => import('./pages/admin/home/home.module').then(m => m.HomeModule) },
  
  { path: 'admin/users', loadChildren: () => import('./pages/admin/users/users.module').then(m => m.UsersModule) },
  
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
