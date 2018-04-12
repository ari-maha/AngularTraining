import { Component, OnInit, NgZone } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { ObservableInput } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { Unit } from '../../unit/unit';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { AddEmployeeComponent } from '../add-employee/add-employee.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  public selectedId : string;
  public bsModalRef: BsModalRef;
  public employeeList : Employee[] = [];
  public unitList : Unit[] = [];

  constructor(
    private router : Router,
    private route: ActivatedRoute,
    private ngZone : NgZone,
    private empService : EmployeeService,
    private modalService: BsModalService
  ) { 
    
  }

  getUnits()  :void {
    this.empService.getVerticals().subscribe((response : any) => {
      this.ngZone.run(() => {
        this.unitList = <Unit[]>response;
      });
    });
  }

  ngOnInit() : void {
    this.getUnits();
    this.route.paramMap.switchMap((params : ParamMap) : ObservableInput<Employee[]> => {
      if (parseInt(params.get('unitId'),10)) {
        this.selectedId = params.get('unitId');
      }
      else {
        this.selectedId = "0";
        this.employeeList = <Employee[]>this.route.snapshot.data.empData;
        return [];
      }
      return this.empService.getEmployees(parseInt(params.get('unitId'),10));
    }).subscribe((response : any[])=>{
      this.ngZone.run(() => {
        if (response && response.length) {
          this.employeeList = <Employee[]>response;
        }
      });
    });
  }

  changedUnit() : void {
    if (this.selectedId === "0") {
      this.router.navigate(['employees']);
      return;
    }
    this.router.navigate(['employees', this.selectedId]);
  }

  openAddEmployee() : void {
    const initialState = {
      parentContext : this,
      unitList : this.unitList
    }
    this.bsModalRef = this.modalService.show(AddEmployeeComponent, {initialState});
  }

  addNewEmployee(formDetails : any) : void {
    this.empService.addEmployee(formDetails.selectedUnit, formDetails).subscribe((response : any)=>{
      this.ngZone.run(() => {
        this.selectedId = formDetails.selectedUnit;
        this.employeeList = <Employee[]>response;
      });
    }, (response) => {
      alert("Unable to save data. Please check server logs");
    });
  }
}
