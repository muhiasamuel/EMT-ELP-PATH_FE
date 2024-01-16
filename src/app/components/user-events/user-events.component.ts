import { Component, Input } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-user-events',
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.scss'],
})
export class UserEventsComponent {
  constructor(public http: HttpServiceService) {}

  @Input() chapterid!: string;

  eventsData: any[] = [];
  getEventsUrl!: string;
  ngOnInit() {
    if (this.chapterid !== undefined) {
      console.log('chapterid in event', this.chapterid);
    } else {
      console.log('chapterid in event', this.chapterid);
    }
    this.getEvents();
  }

  // method to get events by chapter id or all events
  getEvents() {
    if (this.chapterid !== undefined) {
      console.log('chapterid in event', this.chapterid);
      this.getEventsUrl =
        this.http.serverUrl +
        'v2/events/' +
        this.chapterid +
        '/display-chapter-events';
    } else {
      this.getEventsUrl = this.http.serverUrl + 'v2/events/all';
    }

    // ===========================get method=============================

    this.http.getData(this.getEventsUrl).subscribe({
      next: (response) => {
        console.log(response);
        this.eventsData = response.payload.map((item: any) => ({
          eventTitle: item.eventTitle,
          description: item.eventDescription,
          imageUrl: item.eventImage ? item.eventImage : '',
          organizer: item.organizer,
          location: item.location,
          link: item.eventLink,
          eventDate: item.eventDate,
        }));
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });

    // ============================================================================
  }
}
