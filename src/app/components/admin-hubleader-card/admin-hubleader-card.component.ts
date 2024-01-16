import { Component } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-admin-hubleader-card',
  templateUrl: './admin-hubleader-card.component.html',
  styleUrls: ['./admin-hubleader-card.component.scss'],
})
export class AdminHubleaderCardComponent {
  url!: string;
  totalHubadmin!: any;
  constructor(private http: HttpServiceService) {}

  ngOnInit() {
    this.url = this.http.serverUrl + 'counthubadmin';

    this.http.getData(this.url).subscribe({
      next: (response) => {
        this.totalHubadmin! = response;

        console.log(this.totalHubadmin!);
      },
      error: (error) => {
        console.log('Error:', error);
        // Handle the error here
      },
      complete: () => {},
    });
  }
}
