import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerGuard } from 'src/app/global/guards/customer.guard';
import { HomeModule } from './home/home.module';
import { OperationsModule } from './operations/operations.module';

const routes: Routes = [
  { path: 'home', canActivate: [CustomerGuard], loadChildren: () => HomeModule },
  
  { path: 'operations', canActivate: [CustomerGuard], loadChildren: () => OperationsModule },

  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
