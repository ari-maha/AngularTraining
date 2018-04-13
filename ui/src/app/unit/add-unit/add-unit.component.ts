import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-add-unit',
  templateUrl: './add-unit.component.html',
  styleUrls: ['./add-unit.component.css']
})
export class AddUnitComponent implements OnInit {

  title = "Add unit Component";
  public addUnitFormGroup : FormGroup;
  public formHasError : boolean = false;

  public parentContext : any;
  
  constructor(private fb: FormBuilder, public bsModalRef: BsModalRef) { 
    console.log(this.title);
  }

  ngOnInit() {
    this.addUnitFormGroup = this.fb.group({
      unitName : ['', Validators.required],
      unitDescription : ['', Validators.required]
    })
  }

  onSubmit() : void {
    if (!this.addUnitFormGroup.valid) {
      this.formHasError = true;
      return;
    }
    this.formHasError = false;
    this.bsModalRef.hide();
    this.parentContext.addNewBusinessUnit(this.addUnitFormGroup.value);
  }

}
