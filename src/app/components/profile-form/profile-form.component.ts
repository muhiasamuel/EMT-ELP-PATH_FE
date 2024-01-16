import { Component, Inject } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { countries } from 'src/assets/json_files/countries';
import { MatSnackBar } from '@angular/material/snack-bar';
import { cities } from 'src/assets/json_files/cities';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
})
export class ProfileFormComponent {
  // Define class properties
  profileData!: any;
  userId!: any;
  urlAddProfile!: string;
  urlUpdateProfile!: string;
  urlGetCountry!: string;
  urlGetProfile!: string;
  imageUrl!: string;
  selectedImage!: File;
  profileForm!: FormGroup;
  compare: string = 'technology';
  countryList!: Array<any>;

  // Define job status options
  jobStatus: any[] = [
    { value: 'Employed', viewValue: 'Employed' },
    { value: 'Intern', viewValue: 'Intern' },
    { value: 'Not Employed', viewValue: 'Not Employed' },
    { value: 'Self-Employed', viewValue: 'Self-Employed' },
  ];

  scholarCategories: string[] = [
    'WTF_Alumni',
    'ELP_Pre_University_Intern',
    'WTF_Alumni_and_ELP_Pre_University_Intern',
    'Elimu_Alumni',
    'Elimu_Alumni_and_ELP_Pre_University_Intern',
    'WTF_Alumni_and_TVET',
    'Elimu_Alumni_and_TVET',
    'TVET'
  ];

  // Define country options
  cityList = cities;

  // Define courses as an empty array

  constructor(
    private http: HttpServiceService,
    private httpClient: HttpClient,
    private fb: FormBuilder,
    private profileService: ProfileService,
    public dialogRef: MatDialogRef<ProfileFormComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any //data from the component where the dialogue is invoked
  ) {
    // Create a reactive form using FormBuilder
    this.profileForm = this.fb.group({
      title: [''],
      website: [''],
      status: [this.jobStatus],
      currentCountryofResidence: [this.countryList],
      category: [this.scholarCategories],
      phoneNo: [null],
      email: [''],
      currentCityofResidence: ['']
      // profileImageFile: [null],
    });
  }
  // Subscribe to value changes in the form
  // Initialize function runs when the component is first loaded in the DOM
  ngOnInit() {
    this.getCountry();
    // Retrieve user data from local storage
    const userData = localStorage.getItem('userData');
    console.log('userdata', this.data.data.editAdd);

    if (this.data.data.editAdd) {
      // Parse user data

      this.userId = this.data.data.id;
    } else if (userData) {
      const parsedData = JSON.parse(userData);
      this.userId = parsedData.id;
    }
    this.getprofileData();
  }

  // method to handle selected image
  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      this.selectedImage = event.target.files[0];
      this.profileForm
        .get('profileImageFile')
        ?.setValue(this.selectedImage as any);
      console.log(this.profileForm.value.profileImageFile);
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedImage);
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
    }
  }
  getCountry() {
    this.urlGetCountry = this.http.serverUrl + 'countries/display-countries';
    this.http.getData(this.urlGetCountry).subscribe({
      next: (response) => {
        console.log('Countries', response);
        this.countryList = response;
        console.log('Countries', this.countryList);
      },
      error: (error) => {
        console.log('Error', error);
      },
      complete: () => {},
    });
  }

  // method to Fetch profile data from the server
  getprofileData() {
    // Set URLs to get profile data

    // try {
    //   this.urlGetProfile =
    //   this.http.serverUrl + 'profile/' + this.userId + '/view';
    // } catch (error: any) {
    //   console.log(error)
    //   this.snackBar.open(error.message, 'Close', {duration: 2000});
    // }

    // Fetch profile data from the server
    this.profileService.getProfileData(this.userId).subscribe(
      (response: any) => {
        console.log(response)
        if(response.success == false) {
          this.snackBar.open(response.message);
        } else {
          this.profileData = response.payload;
          console.log('ProfileData', this.profileData);
  
          if (
            this.profileData &&
            this.profileData.profile &&
            this.profileData.profile.id
          ) {
            // Set URLs for updating profile data
            this.urlUpdateProfile =
              this.http.serverUrl +
              'profile/' +
              this.profileData.profile.id +
              '/update';
          } else {
            console.error('Profile data or profile id is undefined');
          }
  
          // Prepopulate the form with data from the API response
          this.profileForm.patchValue({
            title: this.profileData.profile.title,
            website: this.profileData.profile.website,
            status: this.profileData.profile.jobStatus,
            phoneNo: this.profileData.profile.phoneNo,
            email: this.profileData.profile.email,
            currentCountryofResidence: this.profileData.scholarDTO.countryOfOrigin.name,
            currentCityofResidence: this.profileData.scholarDTO.homeCounty.name,
            category: this.profileData.scholarDTO.scholarCategory
          });
  
          // Convert and display profile image
          if (this.profileData.profile.profileImage !== null) {
            // this.convertTofile();
            this.imageUrl = this.profileData.profile.profileImage;
          }
        }
        // Handle the error here
      });
  }

  // Method to submit the form data
  submit() {
    console.log('profile form data', this.profileForm.value);

    const formData = new FormData();

    // add all the activityForm control to the form data object
    Object.keys(this.profileForm.controls).forEach((controlName) => {
      formData.append(controlName, this.profileForm.get(controlName)?.value);
    });

    // =================================add profile================================================

    if (this.data.data.editAdd === 'add' || this.data.data === 'add') {
      // Set URLs for adding profile data
      this.urlAddProfile =
        this.http.serverUrl + 'profile/' + this.userId + '/create';
      this.http.postData(this.urlAddProfile, this.profileForm.value).subscribe({
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
    else if (this.data.data.editAdd === 'edit' || this.data.data === 'edit') {
      this.urlUpdateProfile =
        this.http.serverUrl +
        'profile/' +
        this.profileData.profile.id +
        '/update';
    } else {
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
}
