import { Component, Input } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-admin-chapter-events-card',
  templateUrl: './admin-chapter-events-card.component.html',
  styleUrls: ['./admin-chapter-events-card.component.scss'],
})
export class AdminChapterEventsCardComponent {
  constructor(public http: HttpServiceService) {}
  @Input() chapterid!: string;
  getEventsUrl!: string;
  eventCount!: string;
  currentDate!: string;
  ngOnInit() {
    if (this.chapterid !== undefined) {
      console.log('chapterid in event card', this.chapterid);
    }
    this.getEventsCount();
    this.getCurrentDate();
  }
  // method to get current date
  getCurrentDate() {
    const today = new Date();
    this.currentDate = today.toISOString(); // Example format, you can change it as needed
  }

  // method to get events by chapter id
  getEventsCount() {
    if (this.chapterid !== undefined) {
      this.getEventsUrl =
        this.http.serverUrl +
        'v2/events/' +
        this.chapterid +
        '/count-chapter-events';
    } else {
      this.getEventsUrl = this.http.serverUrl + 'v2/events/count-all-events';
    }
    this.http.getData(this.getEventsUrl).subscribe({
      next: (response) => {
        this.eventCount = response.payload;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
  }
}
