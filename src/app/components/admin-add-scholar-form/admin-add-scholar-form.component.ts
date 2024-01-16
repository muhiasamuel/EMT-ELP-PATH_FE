import { Component, Inject } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { branches } from 'src/assets/json_files/branches';

@Component({
  selector: 'app-admin-add-scholar-form',
  templateUrl: './admin-add-scholar-form.component.html',
  styleUrls: ['./admin-add-scholar-form.component.scss'],
})
export class AdminAddScholarFormComponent {
  // Declare class properties
  userId!: string;
  url!: string;
  addscholarform: FormGroup; // Form group for the application form
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
  donors: string[] = ['MasterCard', 'WorldBank'];
  genderOptions: string[] = ['MALE', 'FEMALE'];
  homebranches: any[] = branches;
  scholarCategories: any[] = [
    { value: 'All', viewValue: 'All' },
    { value: 'ELP', viewValue: 'ELP' },
    { value: 'W2F', viewValue: 'W2F' },
    { value: 'W2F & ELP', viewValue: 'W2F & ELP' },
    { value: 'Elimu', viewValue: 'Elimu' },
    { value: 'Elimu & ELP', viewValue: 'Elimu & ELP' },
    { value: 'Elimu & TVET', viewValue: 'Elimu & TVET' },
    { value: 'W2F & TVET', viewValue: 'W2F & TVET' },
    { value: 'TVET', viewValue: 'TVET' },
  ];

  // Year Logic
  startYear: number = new Date().getFullYear();
  range: number[] = [];
  display: boolean = true;
  Filter() {
    this.display = false;
    setTimeout(() => {
      this.display = true;
    }, 1);
  }

  constructor(
    private http: HttpServiceService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AdminAddScholarFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Initialize the application form using FormBuilder
    this.addscholarform = this.fb.group({
      scholarFirstName: ['', Validators.required],
      scholarLastName: ['', Validators.required],
      pfNumber: ['', Validators.required],
      donor: ['', Validators.required],
      branch: ['', Validators.required],
      applicantGender: ['', Validators.required],
      scholarCategory: ['', Validators.required],
      scholarYear: ['', Validators.required],
      applicantDOB: ['', Validators.required],
      homeCounty: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Initialize URL for HTTP request
    this.url = this.http.serverUrl + 'scholars/add-new-scholar';
    //set range of years to list on the dropdown
    for (let i = 0; i < 20; i++) {
      this.range.push(this.startYear - i);
    }
  }

  // Handle form submission
  submit() {
    console.log('SubmitForm', this.addscholarform.value);

    // Submit application form data to the server
    this.http.postData(this.url, this.addscholarform.value).subscribe({
      next: (response) => {
        console.log('POST request successful:', response);
        console.log(this.addscholarform.value);

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
