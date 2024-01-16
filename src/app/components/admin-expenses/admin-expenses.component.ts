import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { AdminExpenseFormComponent } from '../admin-expense-form/admin-expense-form.component';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-expenses',
  templateUrl: './admin-expenses.component.html',
  styleUrls: ['./admin-expenses.component.scss'],
})
export class AdminExpensesComponent {
  constructor(
    public dialog: MatDialog,
    public http: HttpServiceService,
    public fb: FormBuilder
  ) {}
  @Input() applicantid!: string;
  url!: string;
  expensedata!: any;
  userId!: string;
  urlGetSchools!: string;
  schoolOptions!: any[];
  applicantSchoolId!: any;
  schoolPlaceholderValue: string = 'Select School';

  selectSchool = this.fb.group({
    id: ['', Validators.required],
  });

  ngOnInit() {
    this.getExpenses();
    this.getApplicantSchool();
    console.log(this.selectSchool);
  }
  // ========================method to get specific schooler============================================
  getApplicantSchool() {
    this.url =
      this.http.serverUrl +
      'schools/' +
      this.applicantid.toString() +
      '/display-school';

    this.http.getData(this.url).subscribe({
      next: (response) => {
        console.log('School_id', response.id);
        this.applicantSchoolId = response.id;
        //patch applicant school id to the formcontrol
        this.selectSchool.patchValue({
          id: this.applicantSchoolId.toString(),
        });

        // method to get all schools
        this.getSchool();
        // Handle the response data here
        // localStorage.setItem('token', JSON.stringify(response));
      },
      error: (error) => {
        console.log('Error getApplicantSchool:', error.message);
        // Handle the error here
        this.getSchool();
      },
      complete: () => {},
    });
  }

  // ============================method to get all the schools from the server=============================
  getSchool() {
    // url to get all the schools from the server
    this.urlGetSchools = this.http.serverUrl + 'schools/all';

    // get all the schools from the server
    this.http.getData(this.urlGetSchools).subscribe({
      next: (response) => {
        this.schoolOptions = response;
        console.log('schoolOptions', this.schoolOptions);
        if (this.applicantSchoolId) {
          this.filterObjectByKey(this.applicantSchoolId, this.schoolOptions);
        }
        // localStorage.setItem('token', JSON.stringify(response));
      },
      error: (error) => {
        console.log('Error:', error);
        // Handle the error here
      },
      complete: () => {},
    });
  }
  //=======================================================================================================

  // ============================method to link the school with application ==============================
  linkSchoolApplication(school_id: string, applicationid: string) {
    // url to link the application with school
    const urlLink =
      this.http.serverUrl +
      'applications/' +
      applicationid +
      '/add-school/' +
      school_id;

    //post method
    this.http.postNoData(urlLink).subscribe({
      next: () => {
        // localStorage.setItem('token', JSON.stringify(response));
      },
      error: (error) => {
        // Handle the error here
      },
      complete: () => {},
    });
  }
  //======================================================================================================

  //======================method to get or filter object value by key===============
  filterObjectByKey(schoolId: any, object: any) {
    const filteredItem = object.filter(
      (objects: any) => objects.id === schoolId
    );

    this.schoolPlaceholderValue = filteredItem[0].schoolName;
    console.log('schoolplaceholder', filteredItem[0].schoolName);
  }

  // ==============================method to get expenses for a scholar ===============================
  getExpenses() {
    this.url =
      this.http.serverUrl +
      'scholar/expenses/' +
      this.applicantid.toString() +
      '/view';

    this.http.getData(this.url).subscribe({
      next: (response) => {
        this.expensedata = response;
        console.log('POST request successful:', response);

        // Handle the response data here
        // localStorage.setItem('token', JSON.stringify(response));
      },
      error: (error) => {
        console.log('Error :', error.message);
        // Handle the error here
      },
      complete: () => {},
    });
  }
  //=======================================================================================================

  //==================================  open expensesform dialog ===================================================
  expenseformDialog(): void {
    if (!this.applicantSchoolId) {
      const schoolid = this.selectSchool.value.id;
      console.log('me', typeof schoolid);
      const applicantid = this.applicantid.toString();

      console.log('me2', typeof applicantid);
      this.linkSchoolApplication(schoolid ? schoolid : '', applicantid);
    }

    // Open the dialog using the MatDialog service
    const dialogRef: MatDialogRef<AdminExpenseFormComponent> = this.dialog.open(
      AdminExpenseFormComponent,
      {
        width: '60%', // Set the width of the dialog

        data: { data: this.applicantid.toString() }, // You can pass data to the dialog component using the `data` property
      }
    );

    // Handle the dialog result (if needed)
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }
}
//=======================================================================================================
