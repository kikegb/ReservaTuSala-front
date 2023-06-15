import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterDialogComponent } from './components/filter-dialog/filter-dialog.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    HomeComponent,
    FilterDialogComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class HomeModule { }
