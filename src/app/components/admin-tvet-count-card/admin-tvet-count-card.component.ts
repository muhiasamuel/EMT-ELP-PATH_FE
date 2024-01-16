import { Component } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-admin-tvet-count-card',
  templateUrl: './admin-tvet-count-card.component.html',
  styleUrls: ['./admin-tvet-count-card.component.scss'],
})
export class AdminTvetCountCardComponent {
  url!: string;
  totaltvet!: any;
  totalcount!: any;
  constructor(private http: HttpServiceService) {}

  ngOnInit() {
    this.url = this.http.serverUrl + 'scholars/display-scholars';

    this.http.getData(this.url).subscribe({
      next: (response) => {
        this.totaltvet = response.filter((data: any) =>
          ['TVET', 'WTF_Alumni_and_TVET', 'Elimu_Alumni_and_TVET'].includes(
            data.scholarCategory
          )
        );
        this.totalcount = this.totaltvet.length;
      },
      error: (error) => {
        console.log('Error:', error);
        // Handle the error here
      },
      complete: () => {},
    });
  }
}
