import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnauthorizedRoutingModule } from './unauthorized-routing.module';
import { UnauthorizedComponent } from './unauthorized.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    UnauthorizedComponent
  ],
  imports: [
    CommonModule,
    UnauthorizedRoutingModule,
    TranslateModule
  ]
})
export class UnauthorizedModule { }
