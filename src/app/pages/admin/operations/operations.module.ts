import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationsComponent } from './operations.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { OperationTableComponent } from './components/operation-table/operation-table.component';
import { OperationFormDialogComponent } from './components/operation-form-dialog/operation-form-dialog.component';
import { OperationsRoutingModule } from './operations-routing.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    OperationsComponent,
    OperationTableComponent,
    OperationFormDialogComponent
  ],
  imports: [
    CommonModule,
    OperationsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class OperationsModule { }
