import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessDetailRoutingModule } from './business-detail-routing.module';
import { BusinessDetailComponent } from './business-detail.component';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    BusinessDetailComponent
  ],
  imports: [
    CommonModule,
    BusinessDetailRoutingModule,
    MaterialModule
  ]
})
export class BusinessDetailModule { }
