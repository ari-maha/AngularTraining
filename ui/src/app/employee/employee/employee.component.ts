import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { ObservableInput } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  public isUnitSelected : boolean = false;

  constructor(
    private router : Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() : void {
    console.log(this.route.snapshot.paramMap.get('unitId'));
    this.route.paramMap.switchMap((params : ParamMap, index : number) : ObservableInput<{}> => {
      console.log(params.get('unitId'));
      return of({});
    });
  }

  goToUnitPage() : void {
    this.router.navigate(['units']);
  }

}
