import { Component, Inject } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { branches } from 'src/assets/json_files/branches';

@Component({
  selector: 'app-admin-add-elp-form',
  templateUrl: './admin-add-elp-form.component.html',
  styleUrls: ['./admin-add-elp-form.component.scss'],
})
export class AdminAddElpFormComponent {
  // Declare class properties
  userId!: string;
  url!: string;
  addelpform: FormGroup; // Form group for the application form
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
  constructor(
    private http: HttpServiceService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AdminAddElpFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Initialize the application form using FormBuilder
    this.addelpform = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      pfNumber: ['', Validators.required],
      donor: [''],
      branch: [''],
      applicantGender: ['', Validators.required],
      scholarYear: [''],
      applicantDOB: ['', Validators.required],
      homeCounty: ['', Validators.required],
    });
  }

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

  ngOnInit() {
    // Initialize URL for HTTP request
    this.url = this.http.serverUrl + '/scholars/add-new-scholar';
    //set range of years to list on the dropdown
    for (let i = 0; i < 20; i++) {
      this.range.push(this.startYear - i);
    }
  }

  // Handle form submission
  submit() {
    console.log(this.addelpform.value);
    // Submit application form data to the server

    this.http.postData(this.url, this.addelpform.value).subscribe({
      next: (response) => {
        console.log('POST request successful:', response);
        console.log(this.addelpform.value);

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
