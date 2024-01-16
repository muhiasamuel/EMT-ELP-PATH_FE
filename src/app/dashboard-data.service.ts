import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardDataService {
  private baseUrl = 'http://52.15.152.26:5555/';

  constructor(private http: HttpClient) {}

  fetchDataWithFilters(
    country: string,
    region: string,
    cluster: string,
    branches: string,
    gender: string
  ): Observable<any> {
    //  Object to hold filter parameters
    const filters = {
      country,
      region,
      cluster,
      branches,
      gender,
    };

    // Http request with filter parameters
    return this.http.get(
      `${this.baseUrl}/applications/count-all-applications`,
      {
        params: filters,
      }
    );
  }
}
