import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from 'src/app/material.module';
import { TodayTableComponent } from './components/today-table/today-table.component';
import { PendingTableComponent } from './components/pending-table/pending-table.component';


@NgModule({
  declarations: [
    HomeComponent,
    TodayTableComponent,
    PendingTableComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
  ]
})
export class HomeModule { }
