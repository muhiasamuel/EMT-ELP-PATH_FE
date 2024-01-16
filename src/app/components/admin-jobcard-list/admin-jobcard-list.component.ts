import { Component,OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
export interface JobOpportunity {
  id: number;
  jobTitle: string;
  jobDescription: string;
  howToApply: string;
  applicationDeadLine: string;
  jobType: string;
  organization: any;
  jobQualifications: string[];
  jobResponsibilities: string[];
  jobSalary: number;
  educationLevel: string;
  jobPoster: {
    id: number;
    name: string;
    type: string;
    data: string;
  };
}

@Component({
  selector: 'app-admin-jobcard-list',
  templateUrl: './admin-jobcard-list.component.html',
  styleUrls: ['./admin-jobcard-list.component.scss'],
})
export class AdminJobcardListComponent implements OnInit {
  
  
  data: any[]=[];

  constructor(private service:ServiceService){

  }

  ngOnInit(): void {
    this.getJobPostings()
  }
  getJobPostings(){
    this.service.getJobOpportunities().subscribe(
      (response) => {
        // Handle the response, which should be an array of job postings
        this.data= response.payload;
        console.log(response.payload)
      },
    
      (error) => {
        // Handle error
        console.error('Error:', error);
      }
    );
  }
}
