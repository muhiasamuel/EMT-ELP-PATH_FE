import { Component } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-elps-card',
  templateUrl: './elps-card.component.html',
  styleUrls: ['./elps-card.component.scss'],
})
export class ElpsCardComponent {
  url!: string;
  totalelps!: any;
  totalCount: any;

  constructor(private http: HttpServiceService) {}

  ngOnInit() {
    this.url = this.http.serverUrl + 'scholars/display-scholars';

    this.http.getData(this.url).subscribe({
      next: (response) => {
        this.totalelps = response.filter((data: any) =>
          [
            'ELP_Pre_University_Intern',
            'Elimu_Alumni_and_ELP_Pre_University_Intern',
            'WTF_Alumni_and_ELP_Pre_University_Intern',
          ].includes(data.scholarCategory)
        );
        this.totalCount = this.totalelps.length;
      },
      error: (error) => {
        console.log('Error:', error);
        // Handle the error here
      },
      complete: () => {},
    });
  }
}
