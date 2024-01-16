import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ProfileFormComponent } from '../profile-form/profile-form.component';
import { ProfilePicComponent } from '../profile-pic/profile-pic.component';
import { SocialMediaFormComponent } from '../social-media-form/social-media-form.component';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-user-dialog-profile',
  templateUrl: './user-profile-dialog.component.html',
  styleUrls: ['./user-profile-dialog.component.scss'],
})
export class UserProfileDialogComponent {
  activeTab: string = 'bio'; //active tab
  imageurl!: string; //to display image image
  profileData!: any; //for user profile data
  urlgetimage!: string; //url to get image from api
  urlsocials!: string; //url to get user social media data
  urlprofile!: string; //url to get user profile data
  userInfo!: any; //to hold user information
  social_profileData!: any; //to hold social profile data
  constructor(
    public dialog: MatDialog,
    private http: HttpServiceService,
    public dialogRef: MatDialogRef<UserProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public info: any
  ) {}

  // Initialize function runs when the component is first loaded in the DOM
  ngOnInit() {
    // const userData = localStorage.getItem('userData');
    // if (userData) {
    //   this.userInfo = JSON.parse(userData);
    //   console.log('userdata', typeof this.userInfo);
    if (this.info.data.id) {
      this.getProfileData();
      this.getSocialMediaData();
    }
    // }
  }

  //============================= method to get social data from api============================
  getSocialMediaData() {
    //url get social information
    this.urlsocials =
      this.http.serverUrl + 'socials/' + this.info.data.id.toString() + '/view';

    this.http.getData(this.urlsocials).subscribe({
      next: (response) => {
        this.social_profileData = response;

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
    // url get profile information
    this.urlprofile =
      this.http.serverUrl + 'profile/' + this.info.data.id.toString() + '/view';
    // Fetch profile data from the server
    this.http.getData(this.urlprofile).subscribe({
      next: (response) => {
        this.profileData = response.payload;
        this.imageurl = this.profileData.profileImage;
        localStorage.removeItem('userImageData');
        localStorage.setItem('userImageData', JSON.stringify(this.imageurl));
        console.log('data', this.profileData);
      },
      error: (error) => {
        console.log('Error:', error);
        // Handle the error here
      },

      complete: () => {},
    });
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
        width: '50%', // Set the width of the dialog

        data: {
          data: { editAdd: editAdd, id: this.info.data.id.toString() },
        }, // pass data to the dialog component using the `data` property
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
        width: '45%', // Set the width of the dialog
        // height: '60%', // Set the height of the dialog

        data: { data: { editAdd: editAdd, id: this.info.data.id.toString() } }, // You can pass data to the dialog component using the `data` property
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
        width: '45%', // Set the width of the dialog

        data: { data: { editAdd: editAdd, id: this.info.data.id.toString() } }, // You can pass data to the dialog component using the `data` property
      }
    );

    // Handle the dialog result (if needed)
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }
}
