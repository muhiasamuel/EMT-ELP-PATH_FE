import { Component } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-wtfs-card',
  templateUrl: './wtfs-card.component.html',
  styleUrls: ['./wtfs-card.component.scss'],
})
export class WtfsCardComponent {
  url!: string;
  totalScholar!: any;
  totalCount!: any;
  constructor(private http: HttpServiceService) {}

  ngOnInit() {
    this.url = this.http.serverUrl + 'scholars/display-scholars';

    this.http.getData(this.url).subscribe({
      next: (response) => {
        this.totalScholar = response.filter((data: any) =>
          [
            'WTF_Alumni',
            'WTF_Alumni_and_TVET',
            'WTF_Alumni_and_ELP_Pre_University_Intern',
          ].includes(data.scholarCategory)
        );
        this.totalCount = this.totalScholar.length;
      },
      error: (error) => {
        console.log('Error:', error);
        // Handle the error here
      },
      complete: () => {},
    });
  }
}
