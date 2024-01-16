import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
// import { unis } from 'src/assets/json_files/schools';

@Injectable({
  providedIn: 'root',
})
export class HttpServiceService {
  
  constructor(private http: HttpClient) {}
  // serverUrl: string = 'http://localhost:8080/';
  // serverUrl: string = 'http://192.168.0.48:8080/';

  // serverUrl: string = 'http://192.168.0.58:8080/';
  // serverUrl: string = 'http://192.168.0.77:8080/';
  // serverUrl: string = 'http://52.15.152.26:5555/';
  serverUrl: string = 'http://52.15.152.26:5555/';

  // serverUrl2: string = 'http://192.168.0.64:8080/';
  // serverUrl: string = 'http://192.168.0.69:8080/';
  // serverUrl: string = 'http://192.168.0.81:8080/';
  Url: string ='http://52.15.152.26:5555/profile/get-user-data';
  // Url: string ='http://localhost:8080/profile/get-user-data';
  dataUrl: string = '/assets/json_files/regions.json';
  instUrl: string = '/assets/json_files/institutions.json';

  // serverUrl: string = 'http://192.168.0.87:8080/';

  // serverUrl: string = 'http://192.168.100.232:8080/';
  getData(url: string): Observable<any> {
    const res = this.http
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .pipe(
        tap(
          () => {},
          (error) => console.error('Error', error)
        )
      );

    console.log(res);
    return res;
  }
  fetchUserDataById(id: number): Observable<any> {
    const url = `http://52.15.152.26:5555/scholars/display-scholars/${id}`;
    console.log(url)
    return this.http.get(url).pipe(
      catchError(this.handleError) // Handle errors
    );
  }
  private handleError(error: any) {
    console.error('An error occurred:', error.error.message);
    return throwError(() => new Error(error.error.message));
  }

  getDataF(url: string, filters: any): Observable<any> {
    let params = new HttpParams();

    Object.keys(filters).forEach((key) => {
      if (filters[key] !== '' && filters[key] !== null) {
        params = params.append(key, filters[key]);
      }
    });

    return this.http.get(url, {params}
    );

    
    
  }
  getUsers(userId: number): Observable<any> {
    // Construct the URL with the userId
    const urlWithUserId = `${this.Url}/${userId}`;
    return this.http.get<any[]>(urlWithUserId);
  }
  getData1(): Observable<any> {
    return this.http.get<any[]>(this.dataUrl);
  }
  getData2(): Observable<any> {
    return this.http.get<any[]>(this.instUrl);
  }

  // getData1():Observable<any>{
  //    return unis
  // }
  // getImage(url: string): Observable<any> {
  //   return this.http.get(url, { responseType: 'text' });
  // }
  postData(url: string, data: any): Observable<any> {
    // Make the HTTP POST request
    console.log('URL', url);
    const headers = new HttpHeaders();
    return this.http.post(url, data, { headers });
  }

  //ADMIN POST ROLES 

  postRole(data: any): Observable<any> {
    const url = `http://52.15.152.26:5555/users/create/user/{roleId}`
    // Make the HTTP POST request
    return this.http.post(url, data);
  }

  postScholarDataForVerification(url: string, data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, data, { headers });
  }

  postNoData(url: string): Observable<any> {
    // Make the HTTP POST request
    const headers = new HttpHeaders({ 'content-type': 'application/json' });
    return this.http.post(url, '', { headers });
  }
  putData(url: string, data: any): Observable<any> {
    // Make the HTTP PUT request
    console.log('content-data', data);
    const headers = new HttpHeaders();
    return this.http.put(url, data, { headers });
  }
  deleteData(url: string): Observable<any> {
    const headers = new Headers();
    return this.http.delete(url);
  }
  getPaginatedData(page: number, pageSize: number) {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get(this.serverUrl, { params });
  }
}
