import { Component, Input } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-admin-chapter-activities',
  templateUrl: './admin-chapter-activities.component.html',
  styleUrls: ['./admin-chapter-activities.component.scss'],
})
export class AdminChapterActivitiesComponent {
  constructor(public http: HttpServiceService) {}

  @Input() chapterid!: string;
  getActivityUrl!: string;
  activityData: any[] = [];

  ngOnInit() {
    console.log('chapterId in Activity', this.chapterid);

    this.getActivity();
  }

  // method to get activity by chapter id
  getActivity() {
    if (this.chapterid !== undefined) {
      this.getActivityUrl =
        this.http.serverUrl +
        'v2/activities/' +
        this.chapterid +
        '/display-chapter-activities';
    } else {
      this.getActivityUrl = this.http.serverUrl + 'v2/activities/all';
    }

    this.http.getData(this.getActivityUrl).subscribe({
      next: (response) => {
        console.log(response);
        this.activityData = response.payload.reverse().map((item: any) => ({
          activityName: item.activityName,
          activityDescription: item.activityDescription,
          activityImage: item.activityImage,
          activityType: item.activityType.typeName,
          activityLocation: item.activityLocation,
          activityDate: item.activityDate,
          contribution: item.contribution,
          chapter: item.chapter.chapterName,
        }));
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
  }
}
