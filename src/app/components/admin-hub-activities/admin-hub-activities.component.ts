import { Component, Input } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-admin-hub-activities',
  templateUrl: './admin-hub-activities.component.html',
  styleUrls: ['./admin-hub-activities.component.scss'],
})
export class AdminHubActivitiesComponent {
  constructor(public http: HttpServiceService) {}

  @Input() hubid!: string;
  getActivityUrl!: string;
  activityData: any[] = [];

  ngOnInit() {
    console.log('hubId in Activity', this.hubid);

    this.getActivity();
  }

  // method to get activity by hub id
  getActivity() {
    if (this.hubid !== undefined) {
      this.getActivityUrl =
        this.http.serverUrl +
        'v2/activities/' +
        this.hubid +
        '/display-hub-activities';
    } else {
      this.getActivityUrl = this.http.serverUrl + 'v2/activities/all';
    }

    this.http.getData(this.getActivityUrl).subscribe({
      next: (response) => {
        console.log(response);
        this.activityData = response.map.reverse().map((item: any) => ({
          activityName: item.activityName,
          activityDescription: item.activityDescription,
          activityImage: item.activityImage,
          activityType: item.activityType.typeName,
          activityLocation: item.activityLocation,
          activityDate: item.activityDate,
          contribution: item.contribution,
          hub: item.hub.hubName,
        }));
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
  }
}
