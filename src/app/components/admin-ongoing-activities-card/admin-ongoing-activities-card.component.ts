import { Component } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-admin-ongoing-activities-card',
  templateUrl: './admin-ongoing-activities-card.component.html',
  styleUrls: ['./admin-ongoing-activities-card.component.scss'],
})
export class AdminOngoingActivitiesCardComponent {
  constructor(public http: HttpServiceService) {
    this.getCurrentDate();
  }

  activityCount!: number;
  currentDate!: string;

  ngOnInit() {
    this.getActivity();
  }

  // method to get onGoing activity
  getActivity() {
    // url to get OnGoing activity
    const getActivityCountUrl =
      this.http.serverUrl + 'activities/count-active-activities';

    this.http.getData(getActivityCountUrl).subscribe({
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
  // method to get current date
  getCurrentDate() {
    const today = new Date();
    this.currentDate = today.toISOString(); // Example format, you can change it as needed
  }
}
