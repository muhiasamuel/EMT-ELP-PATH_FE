import { Component, Inject } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-add-school-form',
  templateUrl: './admin-add-school-form.component.html',
  styleUrls: ['./admin-add-school-form.component.scss'],
})
export class AdminAddSchoolFormComponent {
  // Declare class properties
  error!: any;
  url!: string;
  schoolform: FormGroup; // Form group for the application form

  constructor(
    private http: HttpServiceService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AdminAddSchoolFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Initialize the application form using FormBuilder
    this.schoolform = this.fb.group({
      schoolName: ['', Validators.required],
      additionalInformation: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Initialize URL for HTTP request
    this.url = this.http.serverUrl + 'schools/add-new-school';
    this.error = undefined;
  }

  // Handle form submission
  submit() {
    console.log(this.schoolform.value);

    this.http.postData(this.url, this.schoolform.value).subscribe({
      next: (response) => {
        this.dialogRef.close();
      },
      error: (error) => {
        console.log('Error:', error);
        if (error.error?.message1?.includes('Duplicate entry')) {
          this.error = 'School already an Exists!';
        } else {
          this.error = 'Server Error!';
        }

        // Handle the error here
      },
      complete: () => {},
    });
  }
}
