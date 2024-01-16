import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { AdminJourneyComponent } from '../admin-journey/admin-journey.component';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { AdminApplicationFormComponent } from '../admin-application-form/admin-application-form.component';
export interface PeriodicElement {
  name: string;
  status: string;
  year: number;
  branch: string;
}

@Component({
  selector: 'app-admin-scholar-table',
  templateUrl: './admin-scholar-table.component.html',
  styleUrls: ['./admin-scholar-table.component.scss'],
})
export class AdminScholarTableComponent {
  constructor(
    public dialog: MatDialog,

    private http: HttpServiceService
  ) {}

  // Sort functionality
  @ViewChild(MatSort) empTbSort = new MatSort();

  // Paginator functionality
  @ViewChild(MatPaginator) paginator!: MatPaginator; //  '!' to indicate that it will be initialized later
  url!: string;
  displayedColumns: string[] = [
    'name',
    'applicationStatus',
    'dateOfAwarding',
    'branch',
    'button',
  ];
  dataSource = new MatTableDataSource();

  ngOnInit() {
    const storedData = localStorage.getItem('userData');

    this.url = this.http.serverUrl + 'applications/display-applications';

    this.http.getData(this.url).subscribe({
      next: (response) => {
        this.dataSource.data = response.filter(
          (data: any) => data.applicationStatus === 'AWARDED'
        );
        console.log(this.dataSource.data);
      },
      error: (error) => {
        console.log('Error:', error);
        // Handle the error here
      },
      complete: () => {},
    });
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
  applicationDialog(): void {
    // Open the dialog using the MatDialog service
    const dialogRef: MatDialogRef<AdminApplicationFormComponent> =
      this.dialog.open(AdminApplicationFormComponent, {
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
  profileDialog(id: string): void {
    // Open the dialog using the MatDialog service
    const dialogRef: MatDialogRef<UserProfileComponent> = this.dialog.open(
      UserProfileComponent,
      {
        width: '70%',
        // Set the width of the dialog

        data: { data: id }, // You can pass data to the dialog component using the `data` property
      }
    );

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
