import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsComponent } from './rooms.component';
import { RoomsRoutingModule } from './rooms-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoomTableComponent } from './components/room-table/room-table.component';
import { RoomFormDialogComponent } from './components/room-form-dialog/room-form-dialog.component';



@NgModule({
  declarations: [
    RoomsComponent,
    RoomTableComponent,
    RoomFormDialogComponent
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
