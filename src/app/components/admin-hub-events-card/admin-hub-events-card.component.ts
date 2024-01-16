import { Component, Input } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-admin-hub-events-card',
  templateUrl: './admin-hub-events-card.component.html',
  styleUrls: ['./admin-hub-events-card.component.scss'],
})
export class AdminHubEventsCardComponent {
  constructor(public http: HttpServiceService) {}
  @Input() hubid!: string;
  getEventsUrl!: string;
  eventCount!: string;
  currentDate!: string;
  ngOnInit() {
    if (this.hubid !== undefined) {
      console.log('hubid in event card', this.hubid);
    }
    this.getEventsCount();
    this.getCurrentDate();
  }
  // method to get current date
  getCurrentDate() {
    const today = new Date();
    this.currentDate = today.toISOString(); // Example format, you can change it as needed
  }

  // method to get events by  id
  getEventsCount() {
    if (this.hubid !== undefined) {
      this.getEventsUrl =
        this.http.serverUrl +
        'v2/events/' +
        this.hubid +
        '/count-chapter-events';
    } else {
      this.getEventsUrl = this.http.serverUrl + 'v2/events/count-all-events';
    }
    this.http.getData(this.getEventsUrl).subscribe({
      next: (response) => {
        this.eventCount = response.payload.count;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
  }
}
