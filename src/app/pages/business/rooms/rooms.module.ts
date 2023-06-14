import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsComponent } from './rooms.component';
import { MaterialModule } from 'src/app/material.module';
import { RoomFormDialogComponent } from './components/room-form-dialog/room-form-dialog.component';
import { RoomTableComponent } from './components/room-table/room-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    RoomsComponent,
    RoomFormDialogComponent,
    RoomTableComponent
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class RoomsModule { }
