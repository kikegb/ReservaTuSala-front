import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsComponent } from './locations.component';
import { LocationsRoutingModule } from './locations-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationTableComponent } from './components/location-table/location-table.component';
import { LocationFormDialogComponent } from './components/location-form-dialog/location-form-dialog.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    LocationsComponent,
    LocationTableComponent,
    LocationFormDialogComponent
  ],
  imports: [
    CommonModule,
    LocationsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class LocationsModule { }
