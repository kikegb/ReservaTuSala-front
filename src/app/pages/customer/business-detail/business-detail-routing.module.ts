import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessDetailComponent } from './business-detail.component';

const routes: Routes = [{ path: ':id', component: BusinessDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessDetailRoutingModule { }
