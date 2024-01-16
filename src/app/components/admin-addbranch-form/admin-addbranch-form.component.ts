import { Component, Inject } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-addbranch-form',
  templateUrl: './admin-addbranch-form.component.html',
  styleUrls: ['./admin-addbranch-form.component.scss'],
})
export class AdminAddbranchFormComponent {
  // Declare class properties
  error!: any;
  url!: string;
  branchform: FormGroup; // Form group for the application form

  constructor(
    private http: HttpServiceService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AdminAddbranchFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Initialize the application form using FormBuilder
    this.branchform = this.fb.group({
      branchName: ['', Validators.required],
      additionalInformation: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Initialize URL for HTTP request
    this.url = this.http.serverUrl + 'branch/add-new-branch';
    this.error = undefined;
  }

  // Handle form submission
  submit() {
    console.log(this.branchform.value);

    this.http.postData(this.url, this.branchform.value).subscribe({
      next: (response) => {
        this.dialogRef.close();
      },
      error: (error) => {
        console.log('Error:', error);
        if (error.error?.message1?.includes('Duplicate entry')) {
          this.error = 'branch already an Exists!';
        } else {
          this.error = 'Server Error!';
        }

        // Handle the error here
      },
      complete: () => {},
    });
  }
}
