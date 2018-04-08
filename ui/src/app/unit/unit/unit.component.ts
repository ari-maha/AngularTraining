import { Component, OnInit } from '@angular/core';
import { Unit } from '../unit';
import { Router } from '@angular/router';
import { UnitService } from '../unit.service';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {

  constructor(private router : Router, private unitService : UnitService) { }

  ngOnInit() {
    this.unitService.getUnits().subscribe((result : Unit[]) => {
      console.log(result);
    })
  }
}
