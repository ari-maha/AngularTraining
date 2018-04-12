import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';


@Injectable()
export class EmployeeService implements Resolve<Observable<any>>{

  private baseUrl = "api/employees";

	resolve(route: ActivatedRouteSnapshot) {
		return this.fetchEmployees(route.paramMap.get('unitId'));
	}

  constructor(private http : HttpClient) { }

  fetchEmployees(unitId : string) : Observable<any>{
    	return this.http.get(this.baseUrl)
  }

  getEmployees(unitId : number) {
    if (!unitId) {
      return this.http.get(this.baseUrl);
    }
    return this.http.get(`${this.baseUrl}/${unitId}`);
  }

  getVerticals() {
    return this.http.get("api/verticals");
  }

  addEmployee(unitId : string, payload : any) {
    return this.http.post(`${this.baseUrl}/${unitId}`, payload);
  }

}
