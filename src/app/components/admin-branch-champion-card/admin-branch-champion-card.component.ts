import { Component } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-admin-branch-champion-card',
  templateUrl: './admin-branch-champion-card.component.html',
  styleUrls: ['./admin-branch-champion-card.component.scss'],
})
export class AdminBranchChampionCardComponent {
  url!: string;
  totalBranchadmin!: any;
  constructor(private http: HttpServiceService) {}

  ngOnInit() {
    this.url = this.http.serverUrl + 'countchapteradmin';

    this.http.getData(this.url).subscribe({
      next: (response) => {
        this.totalBranchadmin! = response;

        console.log(this.totalBranchadmin!);
      },
      error: (error) => {
        console.log('Error:', error);
        // Handle the error here
      },
      complete: () => {},
    });
  }
}
