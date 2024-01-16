import { Component, Inject } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-admin-make-elp-form',
  templateUrl: './admin-make-elp-form.component.html',
  styleUrls: ['./admin-make-elp-form.component.scss'],
})
export class AdminMakeElpFormComponent {
  // Declare class properties
  applicantId!: string;
  error!: any;
  url!: string;
  makeElpform: FormGroup; // Form group for the application form

  constructor(
    private http: HttpServiceService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AdminMakeElpFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Initialize the application form using FormBuilder
    this.applicantId = this.data.data;
    this.makeElpform = this.fb.group({
      pfNumber: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Initialize URL for HTTP request
    this.url =
      this.http.serverUrl + 'elps/' + this.applicantId.toString() + '/make-elp';
    this.error = undefined;
  }

  // Handle form submission
  submit() {
    console.log(this.makeElpform.value.pfNumber);

    this.http.postData(this.url, this.makeElpform.value.pfNumber).subscribe({
      next: (response) => {
        console.log('POST request successful:', response);

        this.dialogRef.close();
      },
      error: (error) => {
        console.log('Error:', error);
        if (error.error.message1?.includes('Duplicate entry')) {
          this.error = 'Scholar already an ELP!';
        } else {
          this.error = 'Server Error!';
        }

        // Handle the error here
      },
      complete: () => {},
    });
  }
}
