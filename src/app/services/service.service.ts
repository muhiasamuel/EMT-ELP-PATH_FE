import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { JobOpportunity } from './jobOpportunity';
import { AnyObject } from 'chart.js/dist/types/basic';
import { HttpServiceService } from './http-service.service';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http: HttpClient, private httpService:HttpServiceService) {}

  private apiUrl = this.httpService.serverUrl+'opportunities/all';
    // private apiUrl = 'http://localhost:8080/opportunities/all';

  // private apiUrl = 'http://192.168.0.56:8080/opportunities/all';
  private postJobs=this.httpService.serverUrl+'opportunities/job/create-with-poster';
  private jobDelete=this.httpService.serverUrl+'opportunities/'

  // private postJobs='http://192.168.0.56:8080/opportunities/job/create-with-poster';
  // private spotlightGetUrl='http://52.15.152.26:5555/sportlight/sportlight-all';
  private spotlightGetUrl=this.httpService.serverUrl+'spotlight/spotlight-all';
  private spotlightPostUrl=this.httpService.serverUrl+'spotlight/spotlight-create';
  
  // private spotlightPostUrl='http://192.168.0.39:8080/spotlight/spotlight-create';
  private spotlightUpdateUrl=this.httpService.serverUrl+'spotlight'
  private spotlightDelete=this.httpService.serverUrl;

  private newsAndUpdatePostUrl=this.httpService.serverUrl+'newsAndUpdates/create';
  private newsAndUpdateGetUrl=this.httpService.serverUrl+'newsAndUpdates/view-all';
  private newsAndUpdateDelete=this.httpService.serverUrl;
  private newsAndUpdatePut=this.httpService.serverUrl+'newsAndUpdates';

  private newsLetterGetUrlPdf=this.httpService.serverUrl+'NewsLetter/get-pdf/';
  private newsLetterGetUrl=this.httpService.serverUrl+'NewsLetter/';

  

  postJobPosting(formData: FormData):Observable<any> {
  
    return this.http.post(this.postJobs, formData);
  }

  getJobOpportunities(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
 
  deleteJob(id: Number): Observable<any>{
    return this.http.delete(`${this.jobDelete}${id}/delete`)
  }

  updateJob(updateData: FormData, id: number): Observable<any> {
    const updateUrl = `${this.newsAndUpdatePut}/${id}/editing`;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
  
    return this.http.put(updateUrl, updateData,{headers});
  }


  getSpotlight(): Observable<any>{
      return this.http.get<any>(this.spotlightGetUrl)
  }

getNewsData(): Observable<any>{
    return this.http.get<any>(this.newsAndUpdateGetUrl)
 }

  postSpotlight(formData:{title: string; content:string ; image: File| null}) {
    // console.log('Form Data:', formData); 
    const headers= new HttpHeaders();
    const payload= new FormData();

     payload.append('title', formData.title);
     payload.append('content', formData.content);
     if(formData.image){
      payload.append('image', formData.image, formData.image.name)
     }
     payload.forEach(console.log)
     return this.http.post(this.spotlightPostUrl, payload, {headers})


  }

  deletspotlightUpdate(id: Number): Observable<any>{
    return this.http.delete(`${this.spotlightDelete}spotlight/${id}`)
  }

  updateSpolight(updateData: FormData, id: number): Observable<any> {
    const updateUrl = `${this.spotlightUpdateUrl}/${id}/spotlight`;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
  
    return this.http.put(updateUrl, updateData,{headers});
  }


  postSpotNews(formData:{title: string; message:string ; image: File| null}) {
    // console.log('Form Data:', formData); 
    const headers= new HttpHeaders();
    const payload= new FormData();
   

     payload.append('title', formData.title);
     payload.append('message', formData.message);
     if(formData.image){
      payload.append('image', formData.image, formData.image.name)
     }
     console.log('Content-Type', payload)
     return this.http.post(this.newsAndUpdatePostUrl, payload, {headers})

  }

  deleteNewsUpdate(id: Number): Observable<any>{
    return this.http.delete(`${this.newsAndUpdateDelete}newsAndUpdates/${id}/deleting`)
  }

  updateNews(updateData: FormData, id: number): Observable<any> {
    const updateUrl = `${this.newsAndUpdatePut}/${id}/editing`;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
  
    return this.http.put(updateUrl, updateData,{headers});
  }

 
  GetdownloadFile(fileId: number): Observable<Blob> {
    const url = `${this.newsLetterGetUrlPdf}${fileId}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  getNewsLetter(id: number): Observable<any>{
    const url=`${this.newsLetterGetUrl}get-details/${id}`;
    
    return this.http.get(url)

  }

  deleteNewsLetter(id: Number): Observable<any>{
    return this.http.delete(`${this.newsAndUpdateDelete}newsAndUpdates/${id}/deleting`)
  }

  updateNewsLetter(updateData: FormData, id: number): Observable<any> {
    const updateUrl = `${this.newsAndUpdatePut}/${id}/editing`;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
  
    return this.http.put(updateUrl, updateData,{headers});
  }
  }

