import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { AdminJourneyComponent } from '../admin-journey/admin-journey.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { AdminApplicationFormComponent } from '../admin-application-form/admin-application-form.component';
import { AdminDeleteFormComponent } from '../admin-delete-form/admin-delete-form.component';
import { AddAdminFormComponent } from '../add-admin-form/add-admin-form.component';
import { RoleService } from 'src/app/services/role.service';
@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.scss'],
})
export class AdminTableComponent {
  constructor(
    private http: HttpServiceService,
    public dialog: MatDialog, 
    private roleService: RoleService) {}
  @ViewChild(MatSort) empTbSort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator; //  '!' to indicate that it will be initialized later

  url!: string;
  displayedColumns: string[] = [
    'name',
    'applicationStatus',
    'dateOfApplication',

    'button',
  ];
  dataSource = new MatTableDataSource();

  ngOnInit() {
    const storedData = localStorage.getItem('userData');
    
    this.getAllUsers();
    // this.getAllAdmins();

    this.url = this.http.serverUrl + 'users/view-admins';

    this.http.getData(this.url).subscribe({
      next: (response) => {
        console.log('Admins', response.data);
        this.dataSource.data = response.data;
        

        console.log(this.dataSource.data);
      },
      error: (error) => {
        console.log('Error:', error);
        // Handle the error here
      },
      complete: () => {},
    });
  }
  getAllUsers() {
    this.roleService.getAllAdmins().subscribe(
      (response) => {
        console.log('All Admins', response);
        this.dataSource.data = response;
      
      },
      (error) => {
        console.error('Error fetching Users', error);
      
      }
    );
  }

  // method to call dialog

  addAdminDialog() {
    // Open the dialog using the MatDialog service
    const dialogRef: MatDialogRef<AddAdminFormComponent> = this.dialog.open(
      AddAdminFormComponent,
      {
        width: '50%',
        // Set the width of the dialog

        // data: { data: adminId }, // You can pass data to the dialog component using the `data` property
      }
    );

    // Handle the dialog result (if needed)
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }

  deleteAdminDialog(adminId: string) {
    // Open the dialog using the MatDialog service
    const dialogRef: MatDialogRef<AdminDeleteFormComponent> = this.dialog.open(
      AdminDeleteFormComponent,
      {
        width: '50%',
        // Set the width of the dialog

        data: { data: adminId }, // You can pass data to the dialog component using the `data` property
      }
    );

    // Handle the dialog result (if needed)
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.empTbSort;
    this.dataSource.paginator = this.paginator;
  }
}
