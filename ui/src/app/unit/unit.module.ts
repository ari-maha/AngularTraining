import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitComponent } from './unit/unit.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { UnitService } from './unit.service';

@NgModule({
  imports: [
    CommonModule,
    ButtonsModule.forRoot()
  ],
  providers : [ UnitService ],
  declarations: [UnitComponent]
})
export class UnitModule { }
