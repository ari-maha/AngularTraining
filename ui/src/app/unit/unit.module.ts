import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitComponent } from './unit/unit.component';
import { ButtonsModule, ModalModule } from 'ngx-bootstrap';
import { ReactiveFormsModule }    from '@angular/forms';
import { UnitService } from './unit.service';
import { AddUnitComponent } from './add-unit/add-unit.component';
import { routing } from './unit-routing';

@NgModule({
  imports: [
    CommonModule,
    routing,
    ReactiveFormsModule,
    ButtonsModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers : [ UnitService ],
  entryComponents : [AddUnitComponent],
  declarations: [UnitComponent, AddUnitComponent]
})
export class UnitModule { }
