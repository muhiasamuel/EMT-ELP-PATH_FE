import { Component, ViewChild } from '@angular/core';
import { AdminAddRolesFormComponent } from '../admin-add-roles-form/admin-add-roles-form.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminActivityPermissionComponent } from '../admin-activity-permission/admin-activity-permission.component';
import { AdminRolesPermissionComponent } from '../admin-roles-permission/admin-roles-permission.component';
import { AdminChaptersPermissionComponent } from '../admin-chapters-permission/admin-chapters-permission.component';
import { AdminEventsPermissionComponent } from '../admin-events-permission/admin-events-permission.component';
import { UserFeedsPermissionComponent } from '../user-feeds-permission/user-feeds-permission.component';
import { UserProfilePermissionComponent } from '../user-profile-permission/user-profile-permission.component';
import { AdminApplicationsPermissionComponent } from '../admin-applications-permission/admin-applications-permission.component';
import { AdminAdminsPermissionComponent } from '../admin-admins-permission/admin-admins-permission.component';

@Component({
  selector: 'app-admin-roles',
  templateUrl: './admin-roles.component.html',
  styleUrls: ['./admin-roles.component.scss'],
})
export class AdminRolesComponent {
  @ViewChild(AdminActivityPermissionComponent)
  activityPermission!: AdminActivityPermissionComponent;
  @ViewChild(AdminRolesPermissionComponent)
  rolesPermission!: AdminRolesPermissionComponent;
  @ViewChild(AdminChaptersPermissionComponent)
  chaptersPermission!: AdminChaptersPermissionComponent;
  @ViewChild(AdminEventsPermissionComponent)
  eventsPermission!: AdminEventsPermissionComponent;
  @ViewChild(UserFeedsPermissionComponent)
  feedsPermission!: UserFeedsPermissionComponent;
  @ViewChild(UserProfilePermissionComponent)
  profilePermission!: UserProfilePermissionComponent;
  @ViewChild(AdminApplicationsPermissionComponent)
  applicationsPermission!: AdminApplicationsPermissionComponent;
  @ViewChild(AdminAdminsPermissionComponent)
  adminsPermission!: AdminAdminsPermissionComponent;

  constructor(public dialog: MatDialog) {}
  // profile dialog
  addRole(): void {
    // Open the dialog using the MatDialog service
    const dialogRef: MatDialogRef<AdminAddRolesFormComponent> =
      this.dialog.open(AdminAddRolesFormComponent, {
        width: '50%',
        // Set the width of the dialog

        data: { data: 'john' }, // You can pass data to the dialog component using the `data` property
      });

    // Handle the dialog result (if needed)
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.childInit();
    });
  }

  //method to initalize all children components
  childInit() {
    this.activityPermission.ngOnInit();
    this.adminsPermission.ngOnInit();
    this.applicationsPermission.ngOnInit();
    this.chaptersPermission.ngOnInit();
    this.eventsPermission.ngOnInit();
    this.feedsPermission.ngOnInit();
    this.profilePermission.ngOnInit();
    this.rolesPermission.ngOnInit();
  }

  //get update from child
  onNotify() {
    this.childInit();
  }
}
