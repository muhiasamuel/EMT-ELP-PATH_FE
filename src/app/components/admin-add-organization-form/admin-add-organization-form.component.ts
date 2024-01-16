import { Component, Inject } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-add-organization-form',
  templateUrl: './admin-add-organization-form.component.html',
  styleUrls: ['./admin-add-organization-form.component.scss'],
})
export class AdminAddOrganizationFormComponent {
  userId!: string;
  imageUrl!: string;
  activityForm!: FormGroup;
  activityTypeOptions!: any[];
  selectedImage!: File;

  constructor(
    private http: HttpServiceService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AdminAddOrganizationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  url!: string;

  ngOnInit() {
    // form builder
    this.activityForm = this.fb.group({
      organizationName: ['', Validators.required],
      organizationLocation: ['', Validators.required],
      industry: ['', Validators.required],
      organizationLogo: [null],
    });

    this.url = this.http.serverUrl + 'organization/create';
    // method to get activitytypes
  }

  // method to handle selected image
  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      this.selectedImage = event.target.files[0];
      this.activityForm.get('organizationLogo')?.setValue(this.selectedImage);
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedImage);
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
    }
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
        console.log('Error:', error);

        // Handle the error here
      },
      complete: () => {},
    });
  }
}
