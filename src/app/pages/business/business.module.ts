import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessRoutingModule } from './business-routing.module';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BusinessRoutingModule,
    MaterialModule
  ]
})
export class BusinessModule { }
