import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProfileFormComponent } from '../profile-form/profile-form.component';
import { ProfilePicComponent } from '../profile-pic/profile-pic.component';
import { SocialMediaFormComponent } from '../social-media-form/social-media-form.component';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { ActivatedRoute } from '@angular/router';
import { UserFeedbackComponent } from '../user-feedback/user-feedback.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from 'src/app/services/profile.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  activeTab: string = 'bio'; //active tab
  imageurl!: string; //to display image image
  profileData!: any | null; //for user profile data
  urlgetimage!: string; //url to get image from api
  urlsocials!: string; //url to get user social media data
  urlprofile!: string; //url to get user profile data
  userInfo!: any; //to hold user information
  social_profileData!: any; //to hold social profile data
  userid!: any; //to hold userid
  useridparam!: string;
  profileId!: number;
  snackBarConfig: MatSnackBarConfig = {
    horizontalPosition: 'center',
    verticalPosition: 'top'
  };

  isField1Private = false;
  isField2Private = false;
  isField3Private = false;
  isField4Private = false;
  isField5Private = false;
  isField6Private = false;

  skillsData: { name: string; progress: number }[] = [
    { name: 'Angular', progress: 50 },
    { name: 'Data Analysis', progress: 60 },
    { name: 'Python', progress: 70 },
  ];
  ProfileUpdateService: any;
  constructor(
    public dialog: MatDialog,
    private http: HttpServiceService,
    private profileService: ProfileService,
    public route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private notificationService: NotificationsService
  ) {}

  // Initialize function runs when the component is first loaded in the DOM
  ngOnInit() {
    const userData = localStorage.getItem('userData');

    const id = this.route.snapshot.paramMap.get('id');

    if (id !== undefined && id !== null) {
      this.useridparam = id;
      this.userid = id;
      this.getProfileData();
      this.getSocialMediaData();
    } else if (userData) {
      this.userInfo = JSON.parse(userData);
      this.userid = this.userInfo.id.toString();
      this.getProfileData();
      this.getSocialMediaData();
      // Handle the case when the id is null
    }
  }

  //============================= method to get social data from api============================
  getSocialMediaData() {
    //url get social information

    this.urlsocials =
      this.http.serverUrl + 'socials/' + this.userid.toString() + '/view';

    this.http.getData(this.urlsocials).subscribe({
      next: (response) => {
        this.social_profileData = response.payload;

        console.log('social data', this.social_profileData);
      },
      error: (error) => {
        console.log('Error:', error);
        // Handle the error here
      },
      complete: () => {},
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

  // method to get active tab
  showTab(tab: string) {
    this.activeTab = tab;
  }

  // =====================================profile pic image form=======================================
  picformDialog(editAdd: string): void {
    // Open the dialog using the MatDialog service
    const dialogRef: MatDialogRef<ProfilePicComponent> = this.dialog.open(
      ProfilePicComponent,
      {
        panelClass: 'dialog-responsive',
        width: '50%', // Set the width of the dialog

        data: { data: editAdd }, // You can pass data to the dialog component using the `data` property
      }
    );

    // Handle the dialog result (if needed)
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }

  // =============================================open profile from dialog=================================
  pformDialog(editAdd: string): void {
    // Open the dialog using the MatDialog service
    const dialogRef: MatDialogRef<ProfileFormComponent> = this.dialog.open(
      ProfileFormComponent,
      {
        panelClass: 'dialog-responsive',
        width: '45%', // Set the width of the dialog
        height: '80%', // Set the height of the dialog

        data: { data: editAdd }, // You can pass data to the dialog component using the `data` property
      }
    );

    // Handle the dialog result (if needed)
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }
  // =========================================================open social form dialog=======================
  sformDialog(editAdd: string): void {
    // Open the dialog using the MatDialog service
    const dialogRef: MatDialogRef<SocialMediaFormComponent> = this.dialog.open(
      SocialMediaFormComponent,
      {
        panelClass: 'dialog-responsive',

        width: '45%',
        height: '75%', // Set the width of the dialog

        data: { data: editAdd }, // You can pass data to the dialog component using the `data` property
      }
    );

    // Handle the dialog result (if needed)
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }
  updateSkills() {
    // Update the skillsData array with new values
    this.skillsData = [
      { name: 'Angular', progress: 70 },
      { name: 'Data Analysis', progress: 80 },
      { name: 'Python', progress: 90 },
      { name: 'MysQL', progress: 30 },
      { name: 'DataBase', progress: 11 },
    ];
  }

  togglePrivacy(field: string) {
    let isPrivateField = false;

    switch (field) {
      case 'field1':
        this.isField1Private = !this.isField1Private;
        isPrivateField = this.isField1Private;
        break;
      case 'field2':
        this.isField2Private = !this.isField2Private;
        isPrivateField = this.isField2Private;
        break;
      case 'field3':
        this.isField3Private = !this.isField3Private;
        isPrivateField = this.isField3Private;
        break;
      case 'field4':
        this.isField4Private = !this.isField4Private;
        isPrivateField = this.isField4Private;
        break;
      case 'field5':
        this.isField5Private = !this.isField5Private;
        isPrivateField = this.isField5Private;
        break;
      case 'field6':
        this.isField6Private = !this.isField6Private;
        isPrivateField = this.isField6Private;
        break;
      default:
        // Handle unexpected field value
        break;
    }

    // Construct the URL based on the privacy setting
    const apiUrl = isPrivateField
      ? `/privacy/private/${this.profileId}/view`
      : `/privacy/public/${this.profileId}/view`;

    // Perform additional logic here, such as sending an API request to update the user's privacy settings on the server.
    this.updateServer(apiUrl);
  }

  updateServer(apiUrl: string) {
    // Use the fetch API or your preferred method to send an API request to update the server
    fetch(`https://52.15.152.26:5555${apiUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Include any additional data needed for the request
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to update privacy settings for ${apiUrl}`);
        }
        console.log(`Privacy settings for ${apiUrl} updated successfully.`);
      })
      .catch((error) => {
        console.error('Error updating privacy settings:', error.message);
        // If the API request fails, you may want to revert the local change
      });
  }

}
