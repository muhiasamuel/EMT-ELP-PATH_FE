import { Component, Inject } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { AdminAddbranchFormComponent } from '../admin-addbranch-form/admin-addbranch-form.component';

@Component({
  selector: 'app-admin-application-form',
  templateUrl: './admin-application-form.component.html',
  styleUrls: ['./admin-application-form.component.scss'],
})
export class AdminApplicationFormComponent {
  // Declare class properties
  userId!: string;
  url!: string;
  urlGetBranch!: string;
  urlGetSchool!: string;
  urlLinkApplicationSchool!: string;
  applicationform: FormGroup; // Form group for the application form

  // Initialize branch and school options arrays
  branchOptions!: any[];
  schoolOptions!: any[];
  genderOptions: string[] = ['MALE', 'FEMALE'];
  locationOptions: string[] = [
    'BARINGO',
    'BOMET',
    'BUNGOMA',
    'BUSIA',
    'ELGEYO_MARAKWET',
    'EMBU',
    'GARISSA',
    'HOMA_BAY',
    'ISIOLO',
    'KAJIADO',
    'KAKAMEGA',
    'KERICHO',
    'KIAMBU',
    'KILIFI',
    'KIRINYAGA',
    'KISII',
    'KISUMU',
    'KITUI',
    'KWALE',
    'LAIKIPIA',
    'LAMU',
    'MACHAKOS',
    'MAKUENI',
    'MANDERA',
    'MARSABIT',
    'MERU',
    'MIGORI',
    'MOMBASA',
    'MURANGA',
    'NAIROBI_CITY',
    'NAKURU',
    'NANDI',
    'NAROK',
    'NYAMIRA',
    'NYANDARUA',
    'NYERI',
    'SAMBURU',
    'SIAYA',
    'TAITA_TAVETA',
    'TANA_RIVER',
    'THARAKA_NITHI',
    'TRANS_NZOIA',
    'TURKANA',
    'UASIN_GISHU',
    'VIHIGA',
    'WAJIR',
    'WEST_POKOT',
  ];

  constructor(
    private http: HttpServiceService,

    private fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AdminApplicationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Initialize the application form using FormBuilder
    this.applicationform = this.fb.group({
      applicantFirstName: ['', Validators.required],
      applicantLastName: ['', Validators.required],
      applicationStatus: ['', Validators.required],
      dateOfApplication: ['', Validators.required],
      applicantGender: ['', Validators.required],
      applicantDOB: ['', Validators.required],
      location: ['', Validators.required],
      scholarCode: [null],
      dateOfAwarding: [''],
      dateOfInterview: [''],
      branch: this.fb.group({
        id: ['', Validators.required],
      }),
    });
  }

  ngOnInit() {
    // Initialize URL for HTTP request
    this.url = this.http.serverUrl + 'applications/add-new-application';

    // Fetch branch options from the server
    this.getBranch();
    this.defaultStatus();
  }

  // Set default application status if accessed from specific data
  defaultStatus() {
    if (this.data.data === 'wtfs') {
      this.applicationform.get('applicationStatus')?.setValue('AWARDED');
      console.log(this.applicationform.get('applicationStatus')?.value);
    } else {
      this.applicationform.get('applicationStatus')?.setValue('AWAITING');
      console.log(this.applicationform.get('applicationStatus')?.value);
    }
  }

  // Fetch branch data from the server
  getBranch() {
    this.urlGetBranch = this.http.serverUrl + 'branch/all'; // URL to fetch branch data
    this.http.getData(this.urlGetBranch).subscribe({
      next: (response) => {
        console.log(response);
        this.branchOptions = response; // Set branch options array
        console.log(this.branchOptions);
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
    // Submit application form data to the server

    this.http.postData(this.url, this.applicationform.value).subscribe({
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

  // open bio dialog
  addbranchDialog(): void {
    // Open the dialog using the MatDialog service
    const dialogRef: MatDialogRef<AdminAddbranchFormComponent> =
      this.dialog.open(AdminAddbranchFormComponent, {
        width: '60%', // Set the width of the dialog

        data: { data: '' }, // You can pass data to the dialog component using the `data` property
      });

    // Handle the dialog result (if needed)
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }
}
