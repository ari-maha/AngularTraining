import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { EmployeeComponent } from './employee/employee/employee.component';
import { EmployeeService } from './employee/employee.service'
import { UnitComponent } from './unit/unit/unit.component';
import { UnitGuardService } from './unit-guard.service';

const appRoutes: Routes = [
    { path : 'units' , component : UnitComponent, canActivate : [UnitGuardService],  pathMatch : 'full'},
    { path : 'employees' , component : EmployeeComponent, resolve : { message : EmployeeService }, pathMatch : 'full'},
    { path : 'employees/:unitId' , component : EmployeeComponent, pathMatch : 'full'},
    { path: '**',   redirectTo: '/employees', pathMatch: 'full' }
  ];
  
  @NgModule({
    imports: [
      RouterModule.forRoot(
        appRoutes,
        { enableTracing: false }
      )
    ],
    exports: [
      RouterModule
    ]
  })
  export class AppRoutingModule {}