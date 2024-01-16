import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserEmailService {
  private apiUrl = 'http://52.15.152.26:5555/';

  constructor(private http: HttpClient) {}

  getUserData(userId: string): Observable<any> {
    const url = `${this.apiUrl}/get-email-phone/${userId}`;
    try {
      return this.http.get(url).pipe(map((res: any) =>{
        return res || {}
      }));
    } catch (error) {
      console.error("An error occurred:", error)
      return throwError("something went wrong")
    }
  }

  getCurrentUser() {
    let userData = localStorage.getItem('userData') || '{}';
    let user = JSON.parse(userData);
    console.log(user)
    return user;
  }
}
