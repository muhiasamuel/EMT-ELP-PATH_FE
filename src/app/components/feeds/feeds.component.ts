import { Component } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { Observable, map, forkJoin, finalize } from 'rxjs';
import { AnimationQueryMetadata } from '@angular/animations';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss'],
})
export class FeedsComponent {
  userProfileData: any;
  userInfo: any;
  data: any[] = [];
  page: number = 1;
  pageSize: number = 3; // Adjust this to your desired page size
  loadingProfileData = false;
  loadingFeedsData = false;

  constructor(private http: HttpServiceService) {} // Constructor to inject HttpServiceService

  feedsData: any[] = []; // Array to store fetched feed data

  ngOnInit() {
    const userData = localStorage.getItem('userData'); // Check if user data is available in local storage
    if (userData) {
      this.userInfo = JSON.parse(userData);
      if (userData) {
        this.userInfo = JSON.parse(userData);
        this.getProfileData();
      }

      this.getFeeds(); // Fetch feeds when user data is available
    }
  }

  renderAlt(d: any) {
    console.log('HELLO');
  }
  // =========================== method to get profile data from api============================
  getProfileData() {
    this.loadingProfileData = true;
    // url get profile information
    const urlprofile =
      this.http.serverUrl + 'profile/' + this.userInfo.id + '/view';

    console.log(this.userInfo);
    // Fetch profile data from the server
    this.http
      .getData(urlprofile)
      .pipe(finalize(() => (this.loadingProfileData = false)))
      .subscribe({
        next: (response) => {
          this.userProfileData = response;
        },
        error: (error) => {
          console.log('Error:', error);
          // Handle the error here
        },
        complete: () => {},
      });
  }

  handleImageError(event: any){
    event.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScuQGyYbgV9HFyiunO9mF6_lnB6MYwcx6t3w&usqp=CAU';
  }
  // Fetches feeds data from the server
  getFeeds() {
    this.loadingFeedsData = true;

    const getFeedsUrl = this.http.serverUrl + 'v2/feeds/all';
    this.http
      .getData(getFeedsUrl)
      .pipe(finalize(() => (this.loadingFeedsData = false)))
      .subscribe({
        next: (response) => {
          // Create an array of observables that combine feed data with user profile information
          console.log('feeds', response);
          this.feedsData = response.payload;
          // const feedObservables = response.payload.map((item: any) => {
          //   return this.getUserProfile(item.id).pipe(
          //     map((userImage) => ({
          //       feedText: item.description,
          //       feedDate: this.getTimeDifference(item.postDate),
          //       firstName: item.firstName,
          //       lastName: item.lastName,
          //       feedImage: item.image ? item.image : null,
          //       userImage: userImage,
          //     }))
          //   );
          // });
          // // console.log(feedObservables);
          // // Combine multiple observables using forkJoin
          // forkJoin(feedObservables).subscribe((feedsWithUserImages: any) => {
          //   this.feedsData = feedsWithUserImages.reverse(); // Store the combined feed data in the component property
          //   console.log('FeedsData', this.feedsData);
          // });
        },
        error: (error) => {
          console.error('Error fetching feeds:', error); // Log any errors that occur during data fetching
        },
        complete: () => {},
      });
  }

  // Fetches user profile information from the server
  getUserProfile(userId: string): Observable<any> {
    const getProfileUrl =
      this.http.serverUrl + 'profile/' + this.userInfo.id + '/view'; // API endpoint URL for fetching user profile

    // Fetch user profile data and map it to the user's profile image if available
    return this.http.getData(getProfileUrl).pipe(
      map((response: any) => {
        console.log(response.feedImage);
        return response.feedImage !== null ? response.feedImage : ''; // Return the profile image data if available, otherwise an empty string
      })
    );
  }

  // Calculates and returns the time difference between the post date and current date
  getTimeDifference(postDate: string): string {
    const now = new Date();
    const postDateTime = new Date(postDate);

    const timeDifferenceInSeconds = Math.floor(
      (now.getTime() - postDateTime.getTime()) / 1000
    );

    if (timeDifferenceInSeconds < 60) {
      return `${timeDifferenceInSeconds} second${
        timeDifferenceInSeconds !== 1 ? 's' : ''
      } ago`;
    } else if (timeDifferenceInSeconds < 3600) {
      const minutes = Math.floor(timeDifferenceInSeconds / 60);
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (timeDifferenceInSeconds < 86400) {
      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else if (timeDifferenceInSeconds < 604800) {
      const days = Math.floor(timeDifferenceInSeconds / 86400);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    } else if (timeDifferenceInSeconds < 2419200) {
      const weeks = Math.floor(timeDifferenceInSeconds / 604800);
      return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
    } else if (timeDifferenceInSeconds < 29030400) {
      const months = Math.floor(timeDifferenceInSeconds / 2419200);
      return `${months} month${months !== 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(timeDifferenceInSeconds / 29030400);
      return `${years} year${years !== 1 ? 's' : ''} ago`;
    }
  }
}
