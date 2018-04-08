import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { ObservableInput } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  public isUnitSelected : boolean = false;

  constructor(
    private router : Router,
    private route: ActivatedRoute,
    private empService : EmployeeService
  ) { 
    
  }

  ngOnInit() : void {
    this.route.paramMap.switchMap((params : ParamMap) : ObservableInput<Employee> => {
      return this.empService.getEmployees(parseInt(params.get('unitId'),10));
    }).subscribe((response : any)=>{
      let result = <Employee[]>response;
      console.log(result) ;
    });
  }
}
