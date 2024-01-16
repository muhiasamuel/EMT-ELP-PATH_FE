import { Component, Inject, ViewChild } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admin-expense-form',
  templateUrl: './admin-expense-form.component.html',
  styleUrls: ['./admin-expense-form.component.scss'],
})
export class AdminExpenseFormComponent {
  userId!: string;
  url!: string;

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

  constructor(
    private http: HttpServiceService,
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<AdminExpenseFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  expenseform = this.fb.group({
    shopping: [''],
    schoolFees: [''],
    transport: [''],
    term: [''],
    form: [''],
    upkeep: [''],
    start_date: [''],
  });

  ngOnInit() {
    console.log(this.data.data);
    this.url =
      this.http.serverUrl + 'scholar/expenses/' + this.data.data + '/add';
  }
  submit() {
    console.log(this.expenseform.value);
    this.http.postData(this.url, this.expenseform.value).subscribe({
      next: (response) => {
        // console.log('POST request successful:', response);
        console.log(this.expenseform.value);
        // Handle the response data here
        this.dialogRef.close();
      },
      error: (error) => {
        console.log('Error:', error);
        // Handle the error here
      },
      complete: () => {},
    });
  }
}
