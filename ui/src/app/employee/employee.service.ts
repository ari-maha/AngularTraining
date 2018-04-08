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

  addEmployee(payload : any) {
    return this.http.post(this.baseUrl, payload);
  }

}
