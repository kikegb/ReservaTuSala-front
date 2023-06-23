import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomDetailComponent } from './room-detail.component';

const routes: Routes = [{ path: ':id', component: RoomDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomDetailRoutingModule { }
