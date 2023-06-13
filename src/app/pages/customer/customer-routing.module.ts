import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerGuard } from 'src/app/global/guards/customer.guard';
import { HomeModule } from './home/home.module';
import { OperationsModule } from './operations/operations.module';
import { BusinessDetailModule } from './business-detail/business-detail.module';
import { RoomDetailModule } from './room-detail/room-detail.module';

const routes: Routes = [
  { path: 'home', canActivate: [CustomerGuard], loadChildren: () => HomeModule },
  
  { path: 'operations', canActivate: [CustomerGuard], loadChildren: () => OperationsModule },

  { path: 'business-detail', canActivate: [CustomerGuard], loadChildren: () => BusinessDetailModule },

  { path: 'room-detail', canActivate: [CustomerGuard], loadChildren: () => RoomDetailModule },

  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
