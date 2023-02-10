import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { MaterialModule } from 'src/app/material.module';
import { EditUserDialogComponent } from './components/edit-user-dialog/edit-user-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { AddUserDialogComponent } from './components/add-user-dialog/add-user-dialog.component';


@NgModule({
  declarations: [
    UsersComponent,
    UserTableComponent,
    EditUserDialogComponent,
    AddUserDialogComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
