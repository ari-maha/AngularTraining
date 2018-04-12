import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class UnitGuardService implements CanActivate{

  constructor() { }

  canActivate(): any {
	  return true;
    // return new Promise((resolve) => {
	// 	setTimeout(function() {
	// 		resolve(true);
	// 	}, 2000);
	// });
  }

}
