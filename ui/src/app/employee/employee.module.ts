import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeComponent } from './employee/employee.component';
import { ButtonsModule, BsDropdownModule } from 'ngx-bootstrap';

import { EmployeeService } from './employee.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ButtonsModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  providers : [ EmployeeService ],
  declarations: [EmployeeComponent]
})
export class EmployeeModule { }
