import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminJourneyComponent } from '../admin-journey/admin-journey.component';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { AdminApplicationFormComponent } from '../admin-application-form/admin-application-form.component';
import { AdminMakeElpFormComponent } from '../admin-make-elp-form/admin-make-elp-form.component';
import { UserProfileDialogComponent } from '../user-profile-dialog/user-profile-dialog.component';
import { NotificationsService } from 'src/app/services/notifications.service';
@Component({
  selector: 'app-admin-wfts-table',
  templateUrl: './admin-wfts-table.component.html',
  styleUrls: ['./admin-wfts-table.component.scss'],
})
export class AdminWftsTableComponent {
  constructor(
    private notificationApi: NotificationsService,
    public dialog: MatDialog,

    private http: HttpServiceService
  ) {}

  // Sort functionality
  @ViewChild(MatSort) empTbSort = new MatSort();

  // Paginator functionality
  @ViewChild(MatPaginator) paginator!: MatPaginator; //  '!' to indicate that it will be initialized later

  displayedColumns: string[] = [
    'name',
    'applicationStatus',
    'scholarcode',
    'dateOfAwarding',
    'branch',
    'button',
  ];
  dataSource = new MatTableDataSource();
  url!: string;
  loading: boolean = false;

  ngOnInit() {
    const storedData = localStorage.getItem('userData');
    this.loadData();
  }
  loadData(): void {
    this.url = this.http.serverUrl + 'applications/display-applications';
    this.loading = true;

    this.http.getData(this.url).subscribe({
      next: (response) => {
        this.notificationApi.alertSuccess('Success!');

        this.dataSource.data = response.filter(
          (data: any) => data.applicationStatus === 'AWARDED'
        );
        this.loading = false;

        console.log('Res', response);
      },
      error: (error) => {
        // this.loading = false;

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
  applicationDialog(wfts: string): void {
    // Open the dialog using the MatDialog service
    const dialogRef: MatDialogRef<AdminApplicationFormComponent> =
      this.dialog.open(AdminApplicationFormComponent, {
        width: '50%',
        // Set the width of the dialog

        data: { data: wfts }, // You can pass data to the dialog component using the `data` property
      });

    // Handle the dialog result (if needed)
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }

  makeElpFormDialog(id: string): void {
    // Open the dialog using the MatDialog service
    const dialogRef: MatDialogRef<AdminMakeElpFormComponent> = this.dialog.open(
      AdminMakeElpFormComponent,
      {
        width: '50%',
        // Set the width of the dialog

        data: { data: id }, // You can pass data to the dialog component using the `data` property
      }
    );
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
