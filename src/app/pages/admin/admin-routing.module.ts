import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/global/guards/admin.guard';

const routes: Routes = [
  
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  
  { path: 'users', canActivate: [AdminGuard], loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  
  { path: 'operations', canActivate: [AdminGuard], loadChildren: () => import('./operations/operations.module').then(m => m.OperationsModule) },
  
  { path: 'rooms', canActivate: [AdminGuard], loadChildren: () => import('./rooms/rooms.module').then(m => m.RoomsModule) },

  { path: 'locations', canActivate: [AdminGuard], loadChildren: () => import('./locations/locations.module').then(m => m.LocationsModule) },
   
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
