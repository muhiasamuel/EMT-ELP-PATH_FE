import { Component } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-admin-superadmin-card',
  templateUrl: './admin-superadmin-card.component.html',
  styleUrls: ['./admin-superadmin-card.component.scss'],
})
export class AdminSuperadminCardComponent {
  url!: string;
  totalSuperadmin!: any;
  constructor(private http: HttpServiceService) {}

  ngOnInit() {
    this.url = this.http.serverUrl + 'countSuperadmin';

    this.http.getData(this.url).subscribe({
      next: (response) => {
        this.totalSuperadmin = response;

        console.log(this.totalSuperadmin);
      },
      error: (error) => {
        console.log('Error:', error);
        // Handle the error here
      },
      complete: () => {},
    });
  }
}
