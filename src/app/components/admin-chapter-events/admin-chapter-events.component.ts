import { Component, Input } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-admin-chapter-events',
  templateUrl: './admin-chapter-events.component.html',
  styleUrls: ['./admin-chapter-events.component.scss'],
})
export class AdminChapterEventsComponent {
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

      this.getEventsUrl = this.http.serverUrl + 'events/all';


    // ====================================get method=======================================

    this.http.getData(this.getEventsUrl).subscribe({
      next: (response) => {
        console.log(response);
        this.eventsData = response.payload.reverse().map((item: any) => ({
          eventTitle: item.eventTitle,
          description: item.eventDescription,
          imageUrl:item.eventImage,
            // (item.eventImage ? item.eventImage : '') +
            // (item.eventImage ? item.eventImage : ''),
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
