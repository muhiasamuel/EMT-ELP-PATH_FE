import { Component, Input } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-admin-hub-profile',
  templateUrl: './admin-hub-profile.component.html',
  styleUrls: ['./admin-hub-profile.component.scss'],
})
export class AdminHubProfileComponent {
  constructor(public http: HttpServiceService) {}
  @Input() hubid!: string;

  countMembers!: number;
  hubData!: any;
  hubDescription!: string;
  hubName!: string;

  imageUrl!: string;
  ngOnInit() {
    this.getHub();
  }

  // method to get hub details
  getHub() {
    const getHubUrl = this.http.serverUrl + 'v2/hubs/' + this.hubid + '/view';

    this.http.getData(getHubUrl).subscribe({
      next: (response) => {
        this.hubData = response.payload;
        console.log('hub info', this.hubData);
        this.imageUrl = response.hubImage;

        this.hubDescription = response.hubDescription;
        this.hubName = response.payload.hubName;

        this.getHubMembers();
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
  }
  // method to get hub members
  getHubMembers() {
    const getHubMembers =
      this.http.serverUrl + 'v2/hubs/' + this.hubid + '/display-hub-members';
    this.http.getData(getHubMembers).subscribe({
      next: (response) => {
        console.log('members', response.length);
        this.countMembers = response.payload.length;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
  }
}
