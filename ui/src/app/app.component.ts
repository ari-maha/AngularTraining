import { Component, OnInit, NgZone } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/filter';

interface TabSettings {
  heading : string;
  navigateTo : string;
  active: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public tabSettings : TabSettings[];

  constructor(private router : Router, private ngZone : NgZone) {
    this.tabSettings = [{
      heading : "Employees",
      navigateTo : "employees",
      active : false
    }, {
      heading : "Units",
      navigateTo : "units",
      active : false
    }]
  }

  ngOnInit() : void {
    this.router.events
    .filter(event => event instanceof NavigationEnd)
    .subscribe((event:NavigationEnd) => {
      let currentPath = event.url.split("/")[1];
      if (!currentPath) {
        currentPath = 'employees';
      }
      this.ngZone.run(()=> {
        this.tabSettings.forEach((tab : TabSettings) => {
          tab.active = false;
          if (currentPath === tab.navigateTo) {
            tab.active = true;
          }
        })
      });
    });
  }

  goToRoute(tabObject : TabSettings) : void {
    if (!tabObject.active) {
      this.router.navigate([tabObject.navigateTo]);
    }
  }
}
