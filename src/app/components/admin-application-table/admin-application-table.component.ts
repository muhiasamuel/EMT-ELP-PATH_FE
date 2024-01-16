import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { AdminApplicationFormComponent } from '../admin-application-form/admin-application-form.component';
import { AdminApplicationAwardformComponent } from '../admin-application-awardform/admin-application-awardform.component';
import { AdminApplicationRejecformComponent } from '../admin-application-rejecform/admin-application-rejecform.component';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-admin-application-table',
  templateUrl: './admin-application-table.component.html',
  styleUrls: ['./admin-application-table.component.scss'],
})
export class AdminApplicationTableComponent {
  constructor(
    private http: HttpServiceService,
    public dialog: MatDialog,
    private notificationApi: NotificationsService
  ) {}

  // ViewChild decorators to get references to MatSort and MatPaginator
  @ViewChild(MatSort) empTbSort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator; // '!' to indicate that it will be initialized later

  url!: string;
  displayedColumns: string[] = [
    'name',
    'applicationStatus',
    'dateOfApplication',
    'branch',
    'button',
  ];
  dataSource = new MatTableDataSource();
  loading: boolean = false;

  // This function is called when the component is initialized
  ngOnInit() {
    // Retrieve stored data from local storage
    const storedData = localStorage.getItem('userData');

    // Construct the URL for fetching application data
    this.url = this.http.serverUrl + 'applications/display-applications';
    this.loading = true;

    // Fetch data using the HttpServiceService
    this.http.getData(this.url).subscribe({
      next: (response) => {
        this.notificationApi.alertSuccess('Success!');

        // Populate the data source with the fetched data
        this.dataSource.data = response;
        console.log(this.dataSource.data);
        this.loading = false;
      },
      error: (error) => {
        console.log('Error:', error);
        // Handle the error here
      },
      complete: () => {},
    });
  }

  // Function to open the application form dialog
  applicationDialog(): void {
    // Open the dialog using the MatDialog service
    const dialogRef: MatDialogRef<AdminApplicationFormComponent> =
      this.dialog.open(AdminApplicationFormComponent, {
        width: '50%', // Set the width of the dialog
        data: { data: null }, // Pass data to the dialog component using the `data` property
      });

    // Handle the dialog result (if needed)
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit(); // Refresh the component after the dialog is closed
    });
  }

  // Function to open application form dialog with status award update
  applicationAwardDialog(id: string): void {
    // Open the dialog using the MatDialog service
    const dialogRef: MatDialogRef<AdminApplicationAwardformComponent> =
      this.dialog.open(AdminApplicationAwardformComponent, {
        width: '50%', // Set the width of the dialog
        data: { award: id }, // Pass data to the dialog component using the `data` property
      });

    // Handle the dialog result (if needed)
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }

  // Function to open application form dialog with status rejected update
  applicationRejectDialog(id: string): void {
    // Open the dialog using the MatDialog service
    const dialogRef: MatDialogRef<AdminApplicationRejecformComponent> =
      this.dialog.open(AdminApplicationRejecformComponent, {
        width: '50%', // Set the width of the dialog
        data: { reject: id }, // Pass data to the dialog component using the `data` property
      });

    // Handle the dialog result (if needed)
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }

  // Function to apply filtering on the data source
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // This function is called after the view and child views are initialized
  ngAfterViewInit() {
    // Connect sorting and pagination controls to the data source
    this.dataSource.sort = this.empTbSort;
    this.dataSource.paginator = this.paginator;
  }
}
