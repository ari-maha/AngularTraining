import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Resolve } from '@angular/router';


@Injectable()
export class EmployeeService implements Resolve<Promise<any[]>>{

  private baseUrl = "api/employees";

	resolve() {
		return this.fetchEmployees();
	}

  constructor(private http : HttpClient) { }

  fetchEmployees() : Promise<any[]>{
      return new Promise((resolve) => {
        this.http.get(this.baseUrl).subscribe((result : any[]) => {
            if (result && result.length) {
				resolve(result);
			}
			else {
				resolve([]);
			}
        })
      })
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
