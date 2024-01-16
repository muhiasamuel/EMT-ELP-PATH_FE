import { Component, OnInit, ViewChild } from '@angular/core';
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
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-admin-scholars-table',
  templateUrl: './admin-scholars-table.component.html',
  styleUrls: ['./admin-scholars-table.component.scss'],
})
export class AdminScholarsTableComponent implements OnInit {
  scholarTable!: FormGroup;
  userId!: number;

  uniqueBranches: string[] = [];
  uniqueCategories: string[]=[];
  uniqueGender: string[] = [];
  uniqueInstitution: string[]=[];
  uniqueNationality: string[] = [];
  uniqueScholarType: string[]=[];
  uniqueHighSchool: string[]=[];


  selectedCategories: string='All';
  selectedBranch: string = 'All';
  selectedGender: string='All';
  selectedInstitution: string = 'All';
  selectedNationality: string='All';
  selectedScholarType: string = 'All';
  selectedHighSchool: string='All';


 

  loading: boolean = false;

  items = [
    /* Your data goes here */
  ];
  id: any;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private http: HttpServiceService,
    private service: SearchService,
    private notificationApi: NotificationsService
  ) {
    
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
    this.route.params.subscribe(params => {
      const userId = params['id']; // Retrieve the user ID from the route parameters
      if (userId) {
        this.getDataForUser(userId); // Fetch data for specific user
      } else {
        this.getData(); // Fetch all data
      }

    });
    
    const storedData = localStorage.getItem('userData');
    this.getData();
    //set range of years to list on the dropdown
    for (let i = 0; i < 20; i++) {
      this.range.push(this.startYear - i);
    }


    
   this.paginator.page.subscribe(() => {
  this.filterByBranch();
});
  }
  getDataForUser(id: number): void {
    this.url = `http://52.15.152.26:5555/scholars/display-scholars/${id}`;

    this.loading = true;
    this.http.getData(this.url).subscribe({
      next: (response) => {
        // Assuming the response is just the data for the single user
        this.dataSource.data = [response]; // Wrap the response in an array if necessary
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
        // Handle the error here. For example, show a message to the user.
        this.loading = false;
      }
    });
  }
  
  getData(): void {
    this.url =this.http.serverUrl+'scholars/filterScholars';
    this.loading = true;

    this.http.getData(this.url).subscribe({
      next: (response) => {
        this.notificationApi.alertSuccess('Success!');
          this.dataSource.data = response.payload;
          console.log('ScholarData', this.dataSource.data);
          this.filterByBranch();
          this.loading = false;

          this.dataSource = new MatTableDataSource<any>(response.payload);
          this.extractUniqueBranches();
          this.items = response.payload;
          this.paginator.length = this.dataSource.data.length;
          

        
      },
      error: (error) => {
        console.log('Error:', error);
        // Handle the error here
      },
      complete: () => {},
    });

    // this.dataSource.data = mockdata;
  }

  extractUniqueBranches() {
  
  
    this.uniqueBranches = Array.from(new Set(this.dataSource.data.map((item:any) => item.branch))).sort();
    this.uniqueCategories=Array.from(new Set(this.dataSource.data.map((item:any)=> item.scholarCategory))).sort();
    this.uniqueGender=Array.from(new Set(this.dataSource.data.map((item:any)=> item.gender))).sort();
    this.uniqueInstitution=Array.from(new Set(this.dataSource.data.map((item:any)=> item.institution))).sort();
    this.uniqueNationality=Array.from(new Set(this.dataSource.data.map((item:any)=> item.nationality))).sort();
    this.uniqueScholarType=Array.from(new Set(this.dataSource.data.map((item:any)=> item.scholarType))).sort();
    this.uniqueHighSchool=Array.from(new Set(this.dataSource.data.map((item:any)=> item.school))).sort();
   
  }


  filterByBranch() {

    this.paginator.length = this.dataSource.data.length;
    this.paginator.pageIndex = 0;
    this.dataSource.data = this.items.filter((item: any) =>
    (this.selectedBranch === 'All' || item.branch === this.selectedBranch) &&
    (this.selectedCategories === 'All' || item.scholarCategory === this.selectedCategories)&&
    (this.selectedGender === 'All' || item.gender === this.selectedGender)&&
    (this.selectedInstitution === 'All' || item.institution === this.selectedInstitution)&&
    (this.selectedNationality === 'All' || item.nationality === this.selectedNationality)&&
    (this.selectedScholarType === 'All' || item.scholarType === this.selectedScholarType)&&
    (this.selectedHighSchool === 'All' || item.school === this.selectedHighSchool)
  );
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

    console.log(this.dataSource);

    // Handle the dialog result (if needed)
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }


 
 
}
