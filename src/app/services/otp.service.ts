import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OtpService {
  // private apiUrl = 'your_backend_api_url';
  private baseUrl = 'http://52.15.152.26:5555';

  constructor(private http: HttpClient) {}

  generateOTP(email: string, phone: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/generate-otp`, {email, phone});
  }


  verifyOTP(email: string, otp: string): Observable<any> { 
    return this.http.post(`${this.baseUrl}/verify-otp`, { email, otp });
  }

  regenerateOTP(): Observable<any> {
    return this.http.post(`${this.baseUrl}/generate-otp`, {});
  }
}
