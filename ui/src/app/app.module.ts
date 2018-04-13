import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { ReactiveFormsModule }    from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
//import { UnitModule } from './unit/unit.module';
import { EmployeeModule } from './employee/employee.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { TabsModule } from 'ngx-bootstrap';

import { UnitGuardService } from './unit-guard.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    //UnitModule,
    EmployeeModule,
    AppRoutingModule,
    TabsModule.forRoot(),
    SharedModule
  ],
  providers: [ UnitGuardService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
