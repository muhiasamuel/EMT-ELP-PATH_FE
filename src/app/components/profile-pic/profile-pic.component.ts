import { Component, Inject } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfilePicUpdateService } from 'src/app/services/updateprofilepic';
@Component({
  selector: 'app-profile-pic',
  templateUrl: './profile-pic.component.html',
  styleUrls: ['./profile-pic.component.scss'],
})
export class ProfilePicComponent {
  constructor(
    public http: HttpServiceService,
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<ProfilePicComponent>,
    private profilePicService: ProfilePicUpdateService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  profileForm!: FormGroup;
  profileData!: any;
  userId!: string;
  urlAddProfile!: string;
  urlUpdateProfile!: string;
  urlGetProfile!: string;
  imageUrl!: string;
  selectedImage!: File;

  // Initialize function runs when the component is first loaded in the DOM
  ngOnInit() {
    // Create a reactive form using FormBuilder
    this.profileForm = this.fb.group({
      title: [''],
      website: [''],
      phoneNo: [''],
      email: [''],
      profileImageFile: null as File | null,
    });

    // Retrieve user data from local storage
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      // Use the parsed data in your application
      this.userId = parsedData.id;
      this.getprofileData();
    }
  }

  // method to handle selected image
  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      this.selectedImage = event.target.files[0];
      this.profileForm
        .get('profileImageFile')
        ?.setValue(this.selectedImage as any);
      console.log(this.profileForm.value.profileImageFile);
      // Assuming you want to display a preview of the selected image
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedImage);
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
    }
  }

  // method to Fetch profile data from the server
  getprofileData() {
    // Set URLs to get profile data
    this.urlGetProfile =
      this.http.serverUrl + 'profile/' + this.userId + '/view';
    // Fetch profile data from the server
    this.http.getData(this.urlGetProfile).subscribe({
      next: (response) => {
        this.profileData = response.payload.profile;
        console.log(this.profileData)
        // Set URLs for updating profile data
        this.urlUpdateProfile =
          this.http.serverUrl + 'profile/' + this.userId + '/update';

        // Prepopulate the form with data from the API response
        this.profileForm.patchValue({
          title: this.profileData.title,
          website: this.profileData.website,
          phoneNo: this.profileData.phoneNo,
          email: this.profileData.email,
        });
        // Convert and display profile image
        if (this.profileData.profileImage !== null) {
          this.imageUrl = this.profileData.profileImage;
          // this.imageUrl = "http://localhost:8080/images/0cb0e174-2a86-42aa-b3c4-42b58b8df094.png";
          console.log("this is the image "+this.imageUrl);
        }
      },
      error: (error) => {
        console.log('Error:', error);
        this.urlAddProfile =
          this.http.serverUrl + 'profile/' + this.userId + '/create';
        console.log('create url', this.urlAddProfile);
        // Handle the error here
      },
      complete: () => {},
    });
  }

  // Method to submit the form data
  submit() {
    console.log('this ON submit', this.urlUpdateProfile);

    const formData = new FormData();

    // add all the activityForm control to the form data object
    Object.keys(this.profileForm.controls).forEach((controlName) => {
      formData.append(controlName, this.profileForm.get(controlName)?.value);
    });

    // =================================add profile================================================

    if (this.data.editAdd === 'add' || this.data === 'add') {
      this.http.postData(this.urlAddProfile, formData).subscribe({
        next: () => {
          this.dialogRef.close();
        },
        error: (error) => {
          console.log('Error:', error);
          // this.dialogRef.close();
          // Handle the error here
        },
        complete: () => {},
      });
    }

    // =====================================edit profle====================================
    else if (this.data?.editAdd === 'edit' || this.data.data === 'edit') {
      console.log(this.urlUpdateProfile);
      this.http.putData(this.urlUpdateProfile, formData).subscribe({
        next: () => {
          this.dialogRef.close();
        },
        error: (response) => {
          console.log('Error:', response);
        },
        complete: () => {},
      });
    }
  }

  updateProfilePic(): void {
    if(this.selectedImage) {
      const formData = new FormData();
      formData.append("file", this.profileForm.value.profileImageFile)
      console.log(formData)
      this.profilePicService.uploadImage(this.profileForm.value.profileImageFile, this.profileData.id).subscribe(
        (response) => {
          if(response.success == true) {
            this.dialogRef.close();
            this.snackBar.open(response.message, 'Close', {duration: 3000});
          } else {
            console.error("failed to update profile picture");
            this.snackBar.open("failed to upload profile image");
          }
        }
      )
    } else {
      this.snackBar.open("Upload a profile image");
    }
  }
}
