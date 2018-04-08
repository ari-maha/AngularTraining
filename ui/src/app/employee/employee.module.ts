import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee/employee.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { EmployeeService } from './employee.service';

@NgModule({
  imports: [
    CommonModule,
    ButtonsModule.forRoot()
  ],
  providers : [ EmployeeService ],
  declarations: [EmployeeComponent]
})
export class EmployeeModule { }
