import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UnitService {

  private baseUrl = "api/verticals"

  constructor(private http : HttpClient) { }

  getUnits() {
    return this.http.get(this.baseUrl);
  }

  addUnit(payload : any) {
    return this.http.post(this.baseUrl, payload);
  }

  editUnit(unitId : number, payload) {
    return this.http.post(`${this.baseUrl}/${unitId}`, payload);
  }
}
