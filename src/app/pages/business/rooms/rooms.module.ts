import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsComponent } from './rooms.component';
import { MaterialModule } from 'src/app/material.module';
import { RoomFormDialogComponent } from './components/room-form-dialog/room-form-dialog.component';
import { RoomTableComponent } from './components/room-table/room-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationFormDialogComponent } from './components/location-form-dialog/location-form-dialog.component';


@NgModule({
  declarations: [
    RoomsComponent,
    RoomFormDialogComponent,
    RoomTableComponent,
    LocationFormDialogComponent
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RoomsModule { }
