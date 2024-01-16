import { Component } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-admin-elimu-count-card',
  templateUrl: './admin-elimu-count-card.component.html',
  styleUrls: ['./admin-elimu-count-card.component.scss'],
})
export class AdminElimuCountCardComponent {
  url!: string;
  totalelimu!: any;
  totalCount: any;
  constructor(private http: HttpServiceService) {}

  ngOnInit() {
    this.url = this.http.serverUrl + 'scholars/display-scholars';

    this.http.getData(this.url).subscribe({
      next: (response) => {
        this.totalelimu = response.filter((data: any) =>
          [
            'Elimu_Alumni',
            'Elimu_Alumni_and_ELP_Pre_University_Intern',
            'Elimu_Alumni_and_TVET',
          ].includes(data.scholarCategory)
        );
        this.totalCount = this.totalelimu.length;
      },
      error: (error) => {
        console.log('Error:', error);
        // Handle the error here
      },
      complete: () => {},
    });
  }
}
