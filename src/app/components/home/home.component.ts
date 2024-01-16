import { Component, ViewChild } from '@angular/core';
import { FeedsComponent } from '../feeds/feeds.component';
import { PostComponent } from '../post/post.component';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { ProfileProgressService } from 'src/app/services/profile-progress.service';
import { ProfileTracker } from 'src/app/interfaces/ProfileResponse';
import { ProfileService } from 'src/app/services/profile.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @ViewChild(FeedsComponent) feedsComponent!: FeedsComponent;
  @ViewChild(PostComponent)
  postComponent!: PostComponent;
  userInfo: any;
  userId = 1 ;
  profileData: any;
  profileCompletion: any;
  profileId!: number;
  userid!: any; //to hold userid
  imageurl!: string; //to display image image


  constructor(
    private http: HttpServiceService,
    private profileCompletionService: ProfileProgressService,
    private profileService: ProfileService,
    private notificationService: NotificationsService
  ) {}

  // Initialize function runs when the component is first loaded in the DOM
  ngOnInit() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.userInfo = JSON.parse(userData);
      this.getProfileData();
      this.fetchProfileCompletion(this.userInfo.id);
    }
  }
  ngAfterViewInit() {
    // Subscribe to changes in the PostComponent
    this.postComponent.someChangeEvent.subscribe(() => {
      this.feedsComponent.ngOnInit(); // Trigger FeedsComponent's ngOnInit
    });
  }
  // =========================== method to get profile data from api============================

  getProfileData() {
    this.profileService.getProfileData(this.userid).subscribe(
      (response: any) => {
        this.profileData = response.payload;
        console.log('Image', this.profileData);
        this.profileId = this.profileData.id;

        this.imageurl = this.profileData.profile.profileImage;
        localStorage.removeItem('userImageData');
        localStorage.setItem('userImageData', JSON.stringify(this.imageurl));
        console.log('data', this.profileData);
      },
      (error) => {
        // Handle HTTP errors (e.g., network issues)
        console.error('Error:', error);
        // Optionally, show a generic error message using MatSnackBar
        this.notificationService.alertWarning(error.error.message)
      }
    );
  }

  fetchProfileCompletion(userId: number) {
    this.profileCompletionService.getProfileCompletion(userId).subscribe({
      next: (response: ProfileTracker) => {
        this.profileCompletion = response.payload.percentage;
      },
      error: (error) => {
        console.error('Error Fetching profile completion:', error);
      }
  });
  }
}
