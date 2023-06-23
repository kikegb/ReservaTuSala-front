import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationsRoutingModule } from './operations-routing.module';
import { OperationsComponent } from './operations.component';
import { OperationTableComponent } from './components/operation-table/operation-table.component';
import { MaterialModule } from 'src/app/material.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    OperationsComponent,
    OperationTableComponent
  ],
  imports: [
    CommonModule,
    OperationsRoutingModule,
    MaterialModule,
    TranslateModule
  ]
})
export class OperationsModule { }
