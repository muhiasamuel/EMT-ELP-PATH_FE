import { Component } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-admin-scheduled-activities-card',
  templateUrl: './admin-scheduled-activities-card.component.html',
  styleUrls: ['./admin-scheduled-activities-card.component.scss'],
})
export class AdminScheduledActivitiesCardComponent {
  constructor(public http: HttpServiceService) {}

  activityCount!: number;

  ngOnInit() {
    this.getActivity();
  }

  // method to get scheduled activity
  getActivity() {
    const getActivityUrl =
      this.http.serverUrl + 'activities/count-scheduled-activities';

    this.http.getData(getActivityUrl).subscribe({
      next: (response) => {
        console.log(response);
        this.activityCount = response;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
  }
}
