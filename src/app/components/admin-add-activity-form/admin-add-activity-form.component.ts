import { Component, Inject } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-add-activity-form',
  templateUrl: './admin-add-activity-form.component.html',
  styleUrls: ['./admin-add-activity-form.component.scss'],
})
export class AdminAddActivityFormComponent {
  userId!: string;
  imageUrl!: string;
  activityForm!: FormGroup;
  activityTypeOptions!: any[];
  selectedImage!: File;

  constructor(
    private http: HttpServiceService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AdminAddActivityFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  url!: string;

  ngOnInit() {
    // form builder
    this.activityForm = this.fb.group({
      activityName: ['', Validators.required],
      activityDate: ['', Validators.required],
      activityType: [''],
      activityDescription: ['', Validators.required],
      activityImage: [null],
      activityLocation: ['', Validators.required],
      contribution: ['', Validators.required],
    });

    console.log('chapterId in activity form', typeof this.data.data);
    this.url =
      this.http.serverUrl +
      'activities/' +
      this.data.data +
      '/add-new-activity';
    // method to get activitytypes
    this.getActivityTypes();
  }

  // method to handle selected image
  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      this.selectedImage = event.target.files[0];
      this.activityForm.get('activityImage')?.setValue(this.selectedImage);
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedImage);
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
    }
  }

  // ==============================get all the activity types from the server====================================
  getActivityTypes() {
    // url to get all the activity types from the server
    const urlGetActivityType = this.http.serverUrl + 'activity-types/all';

    // get all the activity types from the server
    this.http.getData(urlGetActivityType).subscribe({
      next: (response) => {
        console.log('Activity type', response);
        this.activityTypeOptions = response;
        console.log(typeof this.activityTypeOptions);
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
  // =====================================================================================================

  submit() {
    console.log(this.activityForm.value);
    // instantiate form data object
    const formData = new FormData();

    // add all the activityForm control to the form data object
    Object.keys(this.activityForm.controls).forEach((controlName) => {
      formData.append(controlName, this.activityForm.get(controlName)?.value);
    });

    //display form Data items in console
    formData.forEach((key, value) => {
      console.log(key, value);
    });
    //submit the form chapter data to the server

    this.http.postData(this.url, formData).subscribe({
      next: (response) => {
        console.log('POST request successful:', response);

        this.dialogRef.close();

        // Handle the response data here
        // localStorage.setItem('token', JSON.stringify(response));
      },
      error: (error) => {
        if (error.error.text === 'Activity created successfully') {
          this.dialogRef.close();
          console.log('POST request successful:');
        } else {
          console.log('Error:', error);
        }
        // Handle the error here
      },
      complete: () => {},
    });
  }
}
