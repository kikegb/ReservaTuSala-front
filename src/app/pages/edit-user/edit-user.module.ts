import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditUserRoutingModule } from './edit-user-routing.module';
import { EditUserComponent } from './edit-user.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditUserComponent
  ],
  imports: [
    CommonModule,
    EditUserRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EditUserModule { }
