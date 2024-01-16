import { Component } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-admin-total-globalscholars-card',
  templateUrl: './admin-total-globalscholars-card.component.html',
  styleUrls: ['./admin-total-globalscholars-card.component.scss'],
})
export class AdminTotalGlobalscholarsCardComponent {
  url!: string;
  totalelps!: any;
  totalCount: any;
  
  constructor(private http: HttpServiceService) {}

  ngOnInit() {
    this.url = this.http.serverUrl + 'scholars/display-scholars';

    this.http.getData(this.url).subscribe({
      next: (response) => {
        this.totalelps = response.filter((data: any) =>
          ['GLOBAL'].includes(data.scholarType)
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
