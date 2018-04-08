import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EmployeeService {

  private baseUrl = "api/employees"

  constructor(private http : HttpClient) { }

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
