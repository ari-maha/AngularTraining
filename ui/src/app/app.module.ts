import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { UnitModule } from './unit/unit.module';
import { EmployeeModule } from './employee/employee.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    UnitModule,
    EmployeeModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
