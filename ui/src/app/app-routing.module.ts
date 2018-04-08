import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { EmployeeComponent } from './employee/employee/employee.component';
import { UnitComponent } from './unit/unit/unit.component';

const appRoutes: Routes = [
    { path : 'units' , component : UnitComponent, pathMatch : 'full'},
    { path : 'employees' , component : EmployeeComponent, pathMatch : 'full'},
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