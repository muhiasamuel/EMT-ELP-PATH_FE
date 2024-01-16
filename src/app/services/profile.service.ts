import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpServiceService } from './http-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient, private httpService: HttpServiceService) {

  }

  getProfileData(userId: number): Observable<any>{
    return this.http.get<any>(this.httpService.serverUrl + 'profile/'+userId + '/view');
  } 
}
