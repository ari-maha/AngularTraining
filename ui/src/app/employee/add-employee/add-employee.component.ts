import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  public formDetails = {
    selectedUnit : null,
    name : null,
    age : null
  }

  public formHasError : boolean = false;
  public parentContext : any;
  public unitList : any[];

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  onSubmit() : void {
    console.log(this.formDetails);
    if (this.formDetails.selectedUnit && this.formDetails.name && this.formDetails.age) {
      this.formHasError = false;
      this.bsModalRef.hide();
      this.parentContext.addNewEmployee(this.formDetails);
    }
    else {
      this.formHasError = true;
    }
  }

}
