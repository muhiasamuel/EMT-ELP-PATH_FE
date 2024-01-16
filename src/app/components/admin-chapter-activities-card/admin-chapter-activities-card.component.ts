import { Component, Input } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-admin-chapter-activities-card',
  templateUrl: './admin-chapter-activities-card.component.html',
  styleUrls: ['./admin-chapter-activities-card.component.scss'],
})
export class AdminChapterActivitiesCardComponent {
  constructor(public http: HttpServiceService) {}
  @Input() chapterid!: string;
  getActivitiesUrl!: string;
  activityCount!: string;
  currentDate!: string;
  ngOnInit() {
    if (this.chapterid !== undefined) {
      console.log('chapterid in Activity card', this.chapterid);
    }
    this.getcountActivity();
    this.getCurrentDate();
  }
  // method to get current date
  getCurrentDate() {
    const today = new Date();
    this.currentDate = today.toISOString(); // Example format, you can change it as needed
  }

  // method to get activity by chapter id
  getcountActivity() {
    if (this.chapterid !== undefined) {
      this.getActivitiesUrl =
        this.http.serverUrl +
        'activities/' +
        this.chapterid +
        '/count-chapter-activities';
    } else {
      this.getActivitiesUrl =
        this.http.serverUrl + 'activities/count-all-activities';
    }
    this.http.getData(this.getActivitiesUrl).subscribe({
      next: (response) => {
        this.activityCount = response;
      },
      error: (error) => {
        console.log('Error', error);
      },
      complete: () => {},
    });
  }
}
