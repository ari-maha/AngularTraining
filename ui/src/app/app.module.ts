import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { ReactiveFormsModule }    from '@angular/forms';
import { NgModule, APP_INITIALIZER, APP_BOOTSTRAP_LISTENER, ComponentRef } from '@angular/core';
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
  providers: [ 
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        return () => {
          return new Promise((resolve, reject) => {
            console.log("Init Start");
            setTimeout(() => {
              console.log("Init End");
              resolve();
            }, 5000);
          });
        }
      },
      multi: true
    }, 
    {
      provide: APP_BOOTSTRAP_LISTENER, multi: true, useFactory: () => {
        return (component: ComponentRef<any>) => {
          console.log(component.instance.title);
        }
      }
    },
    UnitGuardService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
