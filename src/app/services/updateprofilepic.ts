import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpServiceService } from './http-service.service';

@Injectable ({
    providedIn: 'root',
})

export class ProfilePicUpdateService {
    private apiUrl = "http://52.15.152.26:5555";

    constructor(private httpClient: HttpClient, private httpService: HttpServiceService){}

    uploadImage(pic: File, profileId: number): Observable<any>{
        const formData: FormData = new FormData();
        formData.append('file', pic)
        console.log(pic)

        return this.httpClient.put(this.httpService.serverUrl+'profile/'+profileId+'/update-image', formData);
    }
}