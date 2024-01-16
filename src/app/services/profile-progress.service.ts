import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfileTracker } from '../interfaces/ProfileResponse';

@Injectable({
  providedIn: 'root',
})
export class ProfileProgressService {
  private apiUrl = "http://52.15.152.26:5555/"
  constructor(private http: HttpClient) {}
  getProfileCompletion(userId: number): Observable<ProfileTracker> {
    return this.http.get<ProfileTracker>(`${this.apiUrl}profile-progress/get/`+userId); // Adjust the endpoint URL accordingly
  }
}
