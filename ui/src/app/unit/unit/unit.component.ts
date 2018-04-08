import { Component, OnInit, NgZone } from '@angular/core';
import { Unit } from '../unit';
import { Router } from '@angular/router';
import { UnitService } from '../unit.service';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {

  public unitList : Unit[] = [];

  constructor(private router : Router, private unitService : UnitService, private ngZone : NgZone) { }

  ngOnInit() {
    this.unitService.getUnits().subscribe((response : any)=>{
      this.ngZone.run(() => {
        this.unitList = <Unit[]>response;
      });
    })
  }

  unitSelected(unitId : number) : void {
    this.router.navigate(['employees', unitId]);
  }
}
