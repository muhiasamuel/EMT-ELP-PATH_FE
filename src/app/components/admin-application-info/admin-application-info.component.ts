import { Component, Input } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-admin-application-info',
  templateUrl: './admin-application-info.component.html',
  styleUrls: ['./admin-application-info.component.scss'],
})
export class AdminApplicationInfoComponent {
  //dependencies injections
  constructor(private http: HttpServiceService) {}
  application_data: any;
  url!: string;
  //get data from the parent component
  @Input() applicantid!: string;

  ngOnInit() {
    console.log(this.applicantid.toString());
    this.url =
      this.http.serverUrl +
      'applications/display-applications/' +
      this.applicantid.toString();
    this.http.getData(this.url).subscribe({
      next: (response) => {
        this.application_data = response;
        console.log(response);
      },
      error: (error) => {
        console.log('Error:', error);
        // Handle the error here
      },
      complete: () => {},
    });
  }
}
