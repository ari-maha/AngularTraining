import { Component, OnInit, NgZone } from '@angular/core';
import { Unit } from '../unit';
import { Router } from '@angular/router';
import { UnitService } from '../unit.service';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { AddUnitComponent } from '../add-unit/add-unit.component';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {

  title = "Unit Component";
  public bsModalRef: BsModalRef;
  public unitList : Unit[] = [];

  constructor(
    private router : Router, 
    private unitService : UnitService, 
    private ngZone : NgZone,
    private modalService: BsModalService
  ) { 
    console.log(this.title);
  }

  ngOnInit() {
    this.unitService.getUnits().subscribe((response : any)=>{
      this.ngZone.run(() => {
        this.unitList = <Unit[]>response;
      });
    });
  }

  openAddModal() {
    const initialState = {
      parentContext : this
    }
    this.bsModalRef = this.modalService.show(AddUnitComponent, {initialState});
  }

  addNewBusinessUnit(formOutput : any) {
    let payload = {
      name : formOutput.unitName,
      description : formOutput.unitDescription
    }
    this.unitService.addUnit(payload).subscribe((response : any)=>{
      this.ngZone.run(() => {
        this.unitList = <Unit[]>response;
      });
    }, (response) => {
      alert("Unable to save data. Please check server logs");
    });
  }

  unitSelected(unitId : number) : void {
    this.router.navigate(['employees', unitId]);
  }
}
