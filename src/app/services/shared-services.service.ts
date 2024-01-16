import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedServicesService {
  private dataSubject= new BehaviorSubject<any>(null);
  data$=this.dataSubject.asObservable;


  setData(data: any){
    this.dataSubject.next(data)
  }

  constructor() { }
}
