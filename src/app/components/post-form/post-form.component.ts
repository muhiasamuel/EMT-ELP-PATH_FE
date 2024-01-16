import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationsService } from 'src/app/services/notifications.service';
import { ProfileService } from 'src/app/services/profile.service';
@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent {
  userimageUrl!: string;
  imageUrl!: string;
  addFeedUrl!: string;
  selectedImage!: [File];
  imageData!: string;
  profileData!: any | null; //for user profile data
  profileId!: number;
  userid!: any; //to hold userid
  imageurl!: string; //to display image image



  constructor(
    private http: HttpServiceService,
    private fb: FormBuilder,
    private notificationService: NotificationsService,
    private profileService: ProfileService,
    public dialogRef: MatDialogRef<PostFormComponent>
  ) {}
  postForm = this.fb.group({
    description: [''],
    images: [Image],
  });

  ngOnInit() {
    const userImageData = localStorage.getItem('userImageData');

    if(userImageData) {
      this.imageData = JSON.parse(userImageData)
    }

    const userDataString = localStorage.getItem('userData');
    console.log(userDataString);

    // if (userImageData) {
    //   this.userimageUrl = JSON.parse(userImageData);
    //   console.log('userImageData', typeof this.userimageUrl);
    // }

    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        console.log('userData', userData.id.toString());
        this.addFeedUrl =
          this.http.serverUrl + 'v2/feeds/' + userData.id.toString() + '/add';
      } catch (error) {
        console.error('Error parsing "userData":', error);
        // Handle the error (e.g., set default values or show an error message)
      }
    }
  }
  // method to handle selected image
  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      this.selectedImage = event.target.files;
      this.postForm.get('images')?.setValue(this.selectedImage as any);
      Array.from(this.selectedImage).forEach((img) => {
        const reader = new FileReader();
        reader.readAsDataURL(img as any);
        reader.onload = (e: any) => {
          this.imageUrl = e.target.result;
        };
      });
    }
  }
  handlingFeedsSubmit() {
    const formData = new FormData();
    const form = this.postForm.value;
    formData.append('title', 'hello');
    formData.append('description', form.description ? form.description : '');
    if (form.images) {
      for (let i = 0; i < form.images.length; i++) {
        formData.append(
          'images',
          this.selectedImage[i],
          this.selectedImage[i].name
        );
      }
    }

    formData.forEach(console.log);

    this.http.postData(this.addFeedUrl, formData).subscribe({
      next: (response) => {
        this.dialogRef.close();
      },
      error: (error) => {
        console.log('Error:', error);

        // Handle the error here
      },
      complete: () => {},
    });
  }
  // submit
  submit() {
    console.log('feed data', this.postForm.value);
    // instantiate form data object
    const formData = new FormData();
    // add all the activityForm control to the form data object
    Object.keys(this.postForm.controls).forEach((controlName) => {
      formData.append(controlName, this.postForm.get(controlName)?.value);
    });
    formData.append('title', 'hello');
    console.log('POS:');

    this.http.postData(this.addFeedUrl, formData).subscribe({
      next: (response) => {
        console.log('POST request successful:', response);

        this.dialogRef.close();

        // Handle the response data here
        // localStorage.setItem('token', JSON.stringify(response));
      },
      error: (error) => {
        console.log('Error:', error);

        // Handle the error here
      },
      complete: () => {},
    });
  }


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
}
