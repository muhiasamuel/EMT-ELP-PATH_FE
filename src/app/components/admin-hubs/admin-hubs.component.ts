import { Component } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-admin-hubs',
  templateUrl: './admin-hubs.component.html',
  styleUrls: ['./admin-hubs.component.scss'],
})
export class AdminHubsComponent {
  constructor(public http: HttpServiceService) {}

  hubData: any[] = [];
  loading: boolean = false;

  ngOnInit() {
    this.getAllHubs();
  }

  // method to get all chapters
  getAllHubs() {
    const getHubsUrl = this.http.serverUrl + 'v2/hubs/all';
    this.loading = true;

    //===================get method ========================
    this.http.getData(getHubsUrl).subscribe({
      next: (response) => {
        console.log(response);
        this.hubData = response.payload.map((item: any) => ({
          hubName: item.hubName,
          hubDescription: item.hubDescription,
          imageUrl: item.hubImage !== null ? item.hubImage : null,
          hubId: item.id.toString(),
        }));
        this.loading = false;

        console.log(this.hubData);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
    //==========================================================================================
  }
}
