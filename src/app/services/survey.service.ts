// email.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class surveyService {
  private url = 'http://52.15.152.26:5555'; 

  constructor(private http: HttpClient) { }

  sendSurvey(data: any): Observable<any> {
    
    return this.http.post(`${this.url}/survey/onboading`, data);
  }
}
