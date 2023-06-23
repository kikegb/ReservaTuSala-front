import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    UsersComponent,
    UserTableComponent,
    UserFormDialogComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class UsersModule { }
