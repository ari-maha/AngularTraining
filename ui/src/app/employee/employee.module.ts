import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeComponent } from './employee/employee.component';
import { ButtonsModule, ModalModule } from 'ngx-bootstrap';

import { EmployeeService } from './employee.service';
import { AddEmployeeComponent } from './add-employee/add-employee.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  providers : [ EmployeeService ],
  entryComponents : [AddEmployeeComponent],
  declarations: [EmployeeComponent, AddEmployeeComponent]
})
export class EmployeeModule { }
