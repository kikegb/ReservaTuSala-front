import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessGuard } from 'src/app/global/guards/business.guard';
import { HomeModule } from './home/home.module';
import { OperationsModule } from './operations/operations.module';
import { RoomsModule } from './rooms/rooms.module';

const routes: Routes = [
  { path: 'home', canActivate: [BusinessGuard], loadChildren: () => HomeModule },
  
  { path: 'operations', canActivate: [BusinessGuard], loadChildren: () => OperationsModule },
  
  { path: 'rooms', canActivate: [BusinessGuard], loadChildren: () => RoomsModule },

  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }
