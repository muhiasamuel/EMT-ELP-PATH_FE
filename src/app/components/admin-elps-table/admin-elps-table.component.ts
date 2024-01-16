import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminJourneyComponent } from '../admin-journey/admin-journey.component';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { AdminAddElpFormComponent } from '../admin-add-elp-form/admin-add-elp-form.component';
import { UserProfileDialogComponent } from '../user-profile-dialog/user-profile-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { unis } from 'src/assets/json_files/schools';
import { cluster_groups } from 'src/assets/json_files/clusters';
import { branches } from 'src/assets/json_files/branches';
import { AdminAddScholarFormComponent } from '../admin-add-scholar-form/admin-add-scholar-form.component';
import { NotificationsService } from 'src/app/services/notifications.service';
import { countries } from 'src/assets/json_files/countries';

@Component({
  selector: 'app-admin-elps-table',
  templateUrl: './admin-elps-table.component.html',
  styleUrls: ['./admin-elps-table.component.scss'],
})
export class AdminElpsTableComponent {
  scholarTable!: FormGroup;

  scholarCategory: any[] = [
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

  scholarType: any[] = [
    { value: 'Local', viewValue: 'Local' },
    { value: 'Regional', viewValue: 'Regional' },
    { value: 'Global', viewValue: 'Global' },
  ];

  nationality: any[] = countries;

  branches: any[] = branches;

  genderOptions: string[] = ['Male', 'Female'];

  institutions: any[] = unis;

  clusters: any[] = cluster_groups;
  loading: boolean = false;

  constructor(
    public dialog: MatDialog,

    private http: HttpServiceService,
    private fb: FormBuilder,
    private notificationApi: NotificationsService
  ) {
    this.scholarTable = this.fb.group({
      scholarCategory: [''],
      scholarType: [''],
      nationality: [''],
      branch: [''],
      cluster: [''],
      institution: [''],
      gender: [''],
      year: [''],
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

  // Sort functionality
  @ViewChild(MatSort) empTbSort = new MatSort();

  // Paginator functionality
  @ViewChild(MatPaginator) paginator!: MatPaginator; //  '!' to indicate that it will be initialized later
  url!: string;

  displayedColumns: string[] = [
    'name',
    'pfno',
    'elp_wtf',
    'donor',
    'selectionDate',
    'branch',
    'gender',
    'scholarType',
    'homeCounty',
    'button',
  ];
  dataSource = new MatTableDataSource();

  ngOnInit() {
    const storedData = localStorage.getItem('userData');
    this.getData();
    //set range of years to list on the dropdown
    for (let i = 0; i < 20; i++) {
      this.range.push(this.startYear - i);
    }
  }

  getData() {
    const mockdata = [
      {
        id: 0,
        pfNumber: 'PF1234',
        scholarFirstName: 'Kim',
        scholarLastName: 'Mwangi',
        scholarDOB: '2023-10-27',
        scholarGender: 'MALE',
        homeBranch: {
          id: 0,
          recordDate: '2023-10-27T08:13:13.556Z',
          branchName: 'string',
          branchCode: 'string',
          bankCode: 'string',
          additionalInformation: 'string',
        },
        scholarCategory: 'W2F & ELP',
        yearOfJoiningHighSchoolProgram: '2020',
        yearOfJoiningTertiaryProgram: '2023-10-27',
        school: {
          id: 0,
          recordDate: '2023-10-27T08:13:13.556Z',
          schoolName: 'string',
          additionalInformation: 'string',
        },
        institution: {
          id: 0,
          chapterV2: {
            id: 0,
            nickName: 'string',
            description: 'string',
            imageUrl: ['string'],
          },
          name: 'string',
          countryCode: 'string',
          category: 'string',
          website: 'string',
        },
        donor: 'Mastercard',
        homeCounty: 'BARINGO',
        scholarType: 'GLOBAL',
        countryofOrigin: 'Kenya',
        user: {
          id: 0,
          userEmail: 'string',
          firstName: 'string',
          lastName: 'string',
          role: {
            id: 0,
            roleName: 'string',
            permissions: ['SOCIALS_UPDATE'],
          },
        },
      },
    ];

    this.url = this.http.serverUrl + 'scholars/display-scholars';
    this.loading = true;

    this.http.getData(this.url).subscribe({
      next: (response) => {
        this.notificationApi.alertSuccess('Success!');

        console.log(response);
        if (this.dataSource) {
          this.dataSource.data = response;
          // this.dataSource.data = mockdata;
          console.log('ScholarData', this.dataSource.data);
          this.loading = false;
        } else {
          this.dataSource = new MatTableDataSource<any>(response);
        }
      },
      error: (error) => {
        console.log('Error:', error);
        // Handle the error here
      },
      complete: () => {},
    });

    // this.dataSource.data = mockdata;
  }

  // Method to apply filters to the table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // After view initialization, set the sorting and pagination functionality for the table
  ngAfterViewInit() {
    this.dataSource.sort = this.empTbSort;
    this.dataSource.paginator = this.paginator;
  }

  // application form dialog
  addScholarFormDialog(): void {
    // Open the dialog using the MatDialog service
    const dialogRef: MatDialogRef<AdminAddScholarFormComponent> =
      this.dialog.open(AdminAddScholarFormComponent, {
        width: '50%',
        // Set the width of the dialog

        data: { data: 'john' }, // You can pass data to the dialog component using the `data` property
      });

    // Handle the dialog result (if needed)
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }
  // profile dialog
  profileDialog(id: string, firstName: string, lastName: string): void {
    // Open the dialog using the MatDialog service
    const dialogRef: MatDialogRef<UserProfileDialogComponent> =
      this.dialog.open(UserProfileDialogComponent, {
        width: '70%',
        // Set the width of the dialog

        data: { data: { id: id, firstName: firstName, lastName: lastName } }, // You can pass data to the dialog component using the `data` property
      });

    // Handle the dialog result (if needed)
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // journey dialog
  journeyDialog(id: string): void {
    // Open the dialog using the MatDialog service
    const dialogRef: MatDialogRef<AdminJourneyComponent> = this.dialog.open(
      AdminJourneyComponent,
      {
        width: '80%',
        // Set the width of the dialog

        data: { data: id }, // You can pass data to the dialog component using the `data` property
      }
    );

    // Handle the dialog result (if needed)
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
