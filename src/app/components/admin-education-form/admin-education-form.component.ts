import { Component, Inject, ViewChild } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admin-education-form',
  templateUrl: './admin-education-form.component.html',
  styleUrls: ['./admin-education-form.component.scss'],
})
export class AdminEducationFormComponent {
  userId!: string;

  //forms options
  formsOptions: any[] = [
    { value: 1, viewValue: 'Form 1' },
    { value: 2, viewValue: 'Form 2' },
    { value: 3, viewValue: 'Form 3' },
    { value: 4, viewValue: 'Form 4' },
  ];
  //terms options
  termsOptions: any[] = [
    { value: 1, viewValue: 'Term 1' },
    { value: 2, viewValue: 'Term 2' },
    { value: 3, viewValue: 'Term 3' },
  ];

  // grades Options
  gradesOptions: any[] = [
    { value: 'A', viewValue: 'A' },
    { value: 'A-', viewValue: 'A-' },
    { value: 'B+', viewValue: 'B+' },
    { value: 'B', viewValue: 'B' },
    { value: 'B-', viewValue: 'B-' },
    { value: 'C+', viewValue: 'C+' },
    { value: 'C', viewValue: 'C' },
    { value: 'C-', viewValue: 'C-' },
    { value: 'D+', viewValue: 'D+' },
    { value: 'D', viewValue: 'D' },
    { value: 'D-', viewValue: 'D-' },
    { value: 'E', viewValue: 'E' },
    { value: 'FAIL', viewValue: 'FAIL' },
  ];
  constructor(
    private http: HttpServiceService,
    public dialogRef: MatDialogRef<AdminEducationFormComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  // form builder
  eduform = this.fb.group({
    closingGrade: [''],
    openingGrade: [''],
    midTermGrade: [''],
    term: [''],
    form: [''],
    opening_date: [''],
  });
  url!: string;
  ngOnInit() {
    const storedData = localStorage.getItem('userData');
    this.url =
      this.http.serverUrl + 'scholar/education/' + this.data.data + '/add';
  }
  submit() {
    console.log(this.eduform.value);
    this.http.postData(this.url, this.eduform.value).subscribe({
      next: (response) => {
        console.log('POST request successful:', response);
        console.log(this.eduform.value);
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
