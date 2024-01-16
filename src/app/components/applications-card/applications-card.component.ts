import { Component } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-applications-card',
  templateUrl: './applications-card.component.html',
  styleUrls: ['./applications-card.component.scss'],
})
export class ApplicationsCardComponent {
  url!: string;
  totalApplications!: any;
  constructor(private http: HttpServiceService) {}

  ngOnInit() {
    this.url = this.http.serverUrl + 'applications/count-all-applications';

    this.http.getData(this.url).subscribe({
      next: (response) => {
        this.totalApplications = response;
        console.log(this.totalApplications);
      },
      error: (error) => {
        console.log('Error:', error);
        // Handle the error here
      },
      complete: () => {},
    });
  }
}
