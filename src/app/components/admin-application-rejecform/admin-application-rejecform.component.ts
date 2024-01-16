import { Component, Inject } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-admin-application-rejecform',
  templateUrl: './admin-application-rejecform.component.html',
  styleUrls: ['./admin-application-rejecform.component.scss'],
})
export class AdminApplicationRejecformComponent {
  applicationform!: FormGroup;
  urlGetApplicantData!: string;
  applicationId!: string;

  constructor(
    private http: HttpServiceService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AdminApplicationRejecformComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Initialize the application form using FormBuilder
    this.applicationform = this.fb.group({
      applicantFirstName: ['', Validators.required],
      applicantLastName: ['', Validators.required],
      applicationStatus: ['', Validators.required],
      dateOfApplication: ['', Validators.required],
      dateOfAwarding: [''],
      dateOfInterview: [''],
      branch: this.fb.group({
        id: ['', Validators.required],
      }),
    });
  }

  ngOnInit() {
    if (this.data.reject !== undefined) {
      console.log('applicant id in rejectform', this.data.reject);
      this.getApplicant(this.data.reject);
      this.applicationId = this.data.reject;
    }
  }

  // Fetch applicant data from the server
  getApplicant(id: string) {
    // Initialize URL for HTTP request
    this.urlGetApplicantData =
      this.http.serverUrl +
      'applications/display-applications/' +
      id.toString(); // URL to fetch applicant data
    this.http.getData(this.urlGetApplicantData).subscribe({
      next: (response) => {
        console.log('applicant data', response);

        this.applicationform
          .get('applicantFirstName')
          ?.setValue(response.applicantFirstName);
        this.applicationform
          .get('applicantLastName')
          ?.setValue(response.applicantLastName);
        this.applicationform.get('applicationStatus')?.setValue('NOT_AWARDED');
        this.applicationform
          .get('dateOfApplication')
          ?.setValue(response.dateOfApplication);
        this.applicationform
          .get('branch')
          ?.get('id')
          ?.setValue(response.branch.id);
      },
      error: (error) => {
        console.log('Error:', error);
      },
      complete: () => {},
    });
  }

  // Handle form submission
  submit() {
    console.log(this.applicationform.value);

    const url =
      this.http.serverUrl +
      'applications/update-application/' +
      this.applicationId.toString();
    // Submit application form data to the server

    this.http.putData(url, this.applicationform.value).subscribe({
      next: (response) => {
        console.log('POST request successful:', response);
        console.log(this.applicationform.value);

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
