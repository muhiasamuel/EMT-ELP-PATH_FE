import { Component, Inject } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-social-media-form',
  templateUrl: './social-media-form.component.html',
  styleUrls: ['./social-media-form.component.scss'],
})
export class SocialMediaFormComponent {
  socialdata!: any;
  urlAddSocials!: string;
  urlUpdateSocials!: string;
  userId!: string;
  socialId!: string;
  url!: string;
  // reactive form ....for builder
  socialForm = this.fb.group({
    facebook: [''],
    github: [''],
    instagram: [''],
    linkedIn: [''],
    twitter: [''],
    baobab: [''],
  });

  constructor(
    private http: HttpServiceService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SocialMediaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    //========================= set initial values====================================================

    // Retrieve user data from local storage
    const userData = localStorage.getItem('userData');

    if (this.data.data.editAdd) {
      // Parse user data

      this.userId = this.data.data.id;
    } else if (userData) {
      const parsedData = JSON.parse(userData);
      this.userId = parsedData.id;
    }
    this.getSocialMediaData();
  }
  getSocialMediaData() {
    this.url = this.http.serverUrl + 'socials/' + this.userId + '/view';
    this.http.getData(this.url).subscribe({
      next: (response) => {
        console.log('socials', response);

        this.socialdata = response;

        // ===========================prepopulate the form with data from the api response================
        this.socialForm.patchValue({
          facebook: this.socialdata.facebook,
          github: this.socialdata.github,
          linkedIn: this.socialdata.linkedIn,
          twitter: this.socialdata.twitter,
          instagram: this.socialdata.instagram,
          baobab: this.socialdata.baobab,
        });
      },
      error: (error) => {
        console.log('Error:', error);
        // Handle the error here
      },
      complete: () => {},
    });
  }

  submit() {
    console.log(this.socialForm.value);

    //=============================edit social medial====================================
    if (this.data.data.editAdd === 'edit' || this.data.data === 'edit') {
      console.log('dddada', this.data.data);
      this.urlUpdateSocials =
        this.http.serverUrl + 'socials/' + this.userId + '/update';
      this.http
        .putData(this.urlUpdateSocials, this.socialForm.value)
        .subscribe({
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
    //===================================add user social media ===========================
    else if (this.data.data.editAdd === 'add' || this.data.data === 'add') {
      this.urlAddSocials =
        this.http.serverUrl + 'socials/' + this.userId + '/add';
      this.http.postData(this.urlAddSocials, this.socialForm.value).subscribe({
        next: () => {
          this.dialogRef.close();
        },
        error: (error) => {
          console.log('Error:', error);
          // Handle the error here
        },
        complete: () => {},
      });
    }
  }
}
