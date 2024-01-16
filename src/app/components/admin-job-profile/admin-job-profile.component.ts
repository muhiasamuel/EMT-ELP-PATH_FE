import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-admin-job-profile',
  templateUrl: './admin-job-profile.component.html',
  styleUrls: ['./admin-job-profile.component.scss'],
})
export class AdminJobProfileComponent  implements OnInit{
  getData: any[]=[];

  constructor(private http: ServiceService){}
  editJob() {}

  ngOnInit(): void {
    this.getSportLight()
  }

  getSportLight(){
     this.http.getJobOpportunities().subscribe(
      (data)=>{
        this.getData=data
      }
     )
  }
}

