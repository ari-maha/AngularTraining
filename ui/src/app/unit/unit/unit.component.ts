import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }

  goToEmployeePage() : void {
    this.router.navigate(['employees']);
  }
}
