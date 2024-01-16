// Import the Component class from the Angular core library
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { AdminDeleteroleFormComponent } from '../admin-deleterole-form/admin-deleterole-form.component';

// Define a constant object called permissionMappings, which maps permission names to an array of associated permissions
const permissionMappings: { [key: string]: string[] } = {
  edit: [
    'APPLICATIONS_UPDATE',
    'SCHOLAR_EXPENSE_UPDATE',
    'SCHOLAR_EDUCATION_UPDATE',
  ],
  add: [
    'APPLICATIONS_ADD',
    'APPLICATIONS_ADD_SCHOOL',
    'SCHOLAR_EXPENSE_ADD',
    'SCHOLAR_EDUCATION_ADD',
  ],
  view: [
    'APPLICATIONS_VIEW',
    'APPLICATIONS_BRANCH_VIEW',
    'APPLICATIONS_VIEW_ALL',
    'APPLICATIONS_NOT_AWARDED_COUNT',
    'APPLICATIONS_AWARDED_COUNT',
    'APPLICATIONS_YEAR_AWARDED_COUNT',
    'APPLICATIONS_AWAITING_COUNT',
    'APPLICATIONS_YEAR_COUNT',
    'APPLICATIONS_ALL_COUNT',
    'SCHOOL_VIEW_ALL',
    'SCHOOL_APPLICANT_VIEW',
    'SCHOLAR_EXPENSE_VIEW',
    'SCHOLAR_EXPENSE_VIEW_YEAR_TOTALS',
    'SCHOLAR_EXPENSE_VIEW_STUDENT_TOTAL',
    'SCHOLAR_EXPENSE_VIEW_GRAND_TOTAL',
    'SCHOLAR_EDUCATION_VIEW',
    'BRANCH_VIEW',
    'BRANCH_VIEW_ALL',
  ],
  delete: [
    'APPLICATIONS_DELETE',
    'SCHOLAR_EXPENSE_DELETE',
    'SCHOLAR_EDUCATION_DELETE',
  ],
};

// Declare a new Angular component
@Component({
  selector: 'app-admin-applications-permission', // Selector for this component
  templateUrl: './admin-applications-permission.component.html', // HTML template for the component
  styleUrls: ['./admin-applications-permission.component.scss'], // Styles for the component
})
export class AdminApplicationsPermissionComponent {
  // Initialize an array called adminRole with role information
  adminRole: any = [
    {
      roleName: 'admin',
      id: '1',
      permissions: [],
    },
    {
      roleName: 'branch champion Word',
      id: '2',
      permissions: [],
    },
    { roleName: 'chapter leader', id: '3', permissions: [] },
    { roleName: 'leader', id: '3', permissions: [] },
  ];

  // adminRole: any;

  isChecked: boolean = false; // Initialize a boolean variable

  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  constructor(public http: HttpServiceService, public dialog: MatDialog) {}

  ngOnInit() {
    const url = this.http.serverUrl + 'roles/all';
    this.http.getData(url).subscribe({
      next: (response: any) => {
        console.log(response.data);
        // this.adminRole = response.data;
      },
    });
  }

  // Function to handle changes in checkboxes
  handleCheckboxChange(event: any, adminId: string, permissionName: string) {
    this.isChecked = event.target.checked; // Update isChecked based on the checkbox state

    // Find the admin role in the adminRole array
    const adminToUpdate = this.adminRole.find(
      (admin: any) => admin.id === adminId
    );

    if (adminToUpdate) {
      const existingPermissions = new Set(adminToUpdate.permissions); // Create a Set to manage unique permissions
      const newPermissions = permissionMappings[permissionName]; // Get the associated permissions

      // Add or remove permissions based on the checkbox state
      if (this.isChecked) {
        newPermissions.forEach((perm) => existingPermissions.add(perm));
      } else {
        newPermissions.forEach((perm) => existingPermissions.delete(perm));
      }

      adminToUpdate.permissions = Array.from(existingPermissions); // Convert Set back to an array

      console.log(this.adminRole); // Log the updated adminRole array
    }
  }

  //checkbox true or false function
  checkboxTrueFalse(data: any, permission: string): boolean {
    return (
      permissionMappings[permission]
        .map((item: string) => {
          return data.permissions.indexOf(item) !== -1;
        })
        .filter((item: any) => item !== false).length ===
      permissionMappings[permission].length
    );
  }
  // method to send permissions to server
  submitPermissions() {
    this.adminRole.forEach((role: any) => {
      const adminRolePermissions: any = [];
      adminRolePermissions.push({
        permissions: role.permissions,
      });
      const url = this.http.serverUrl + `roles/${role.id}/update`;
      console.log(adminRolePermissions[0]);

      this.http.putData(url, adminRolePermissions[0]).subscribe({
        next: (response) => {
          console.log(response);
        },
      });
    });
  }

  // method to call dialog
  deleteRoleDialog(roleId: string) {
    // Open the dialog using the MatDialog service
    const dialogRef: MatDialogRef<AdminDeleteroleFormComponent> =
      this.dialog.open(AdminDeleteroleFormComponent, {
        width: '50%',
        // Set the width of the dialog

        data: { data: roleId }, // You can pass data to the dialog component using the `data` property
      });

    // Handle the dialog result (if needed)
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.notifyParent.emit();
    });
  }
}

// import { Component } from '@angular/core';

// interface AdminRole {
//   roleName: string;
//   id: string;
//   permissions: string[];
// }

// @Component({
//   selector: 'app-admin-applications-permission',
//   templateUrl: './admin-applications-permission.component.html',
//   styleUrls: ['./admin-applications-permission.component.scss'],
// })
// export class AdminApplicationsPermissionComponent {
//   adminRole: AdminRole[] = [
//     { roleName: 'admin', id: '1', permissions: [] },
//     { roleName: 'chapter leader', id: '2', permissions: [] },
//     { roleName: 'branch champion', id: '3', permissions: [] },
//     { roleName: 'branch champion 2', id: '4', permissions: [] },
//   ];

//   isChecked: boolean = false;

//   handleCheckboxChange(event: any, adminId: string, permissionName: string) {
//     this.isChecked = event.target.checked;

//     const newPermissions = this.getNewPermissions(permissionName);

//     const adminIndex = this.adminRole.findIndex((item) => item.id === adminId);

//     if (adminIndex !== -1) {
//       const admin = this.adminRole[adminIndex];
//       if (this.isChecked) {
//         admin.permissions.push(...newPermissions);
//       } else {
//         newPermissions.forEach((perm) => {
//           const permissionIndexToRemove = admin.permissions.indexOf(perm);
//           if (permissionIndexToRemove !== -1) {
//             admin.permissions.splice(permissionIndexToRemove, 1);
//           }
//         });
//       }
//     }

//     console.log(this.adminRole);
//   }

//   private getNewPermissions(permissionName: string): string[] {
//     switch (permissionName) {
//       case 'edit':
//         return ['edit1', 'edit2', 'edit3'];
//       case 'add':
//         return ['add1', 'add2', 'add3'];
//       case 'view':
//         return ['view1', 'view2', 'view3'];
//       case 'delete':
//         return ['delete'];
//       default:
//         return [];
//     }
//   }
// }

// import { Component } from '@angular/core';

// // Define an enumeration for permission types
// enum PermissionType {
//   Edit = 'edit',
//   Add = 'add',
//   View = 'view',
//   Delete = 'delete',
// }

// // Define a mapping of permission types to their corresponding permissions
// const permissionMap: Record<PermissionType, string[]> = {
//   [PermissionType.Edit]: ['edit1', 'edit2', 'edit3'],
//   [PermissionType.Add]: ['add1', 'add2', 'add3'],
//   [PermissionType.View]: ['view1', 'view2', 'view3'],
//   [PermissionType.Delete]: ['delete'],
// };

// @Component({
//   selector: 'app-admin-applications-permission',
//   templateUrl: './admin-applications-permission.component.html',
//   styleUrls: ['./admin-applications-permission.component.scss'],
// })
// export class AdminApplicationsPermissionComponent {
//   // Expose the PermissionType enum to the component's template
//   PermissionType = PermissionType;

//   // Initialize an array of admin roles
//   adminRole: any[] = [
//     { roleName: 'admin', id: '1', permissions: [] },
//     { roleName: 'chapter leader', id: '2', permissions: [] },
//     { roleName: 'branch champion', id: '3', permissions: [] },
//     { roleName: 'branch champion 2', id: '4', permissions: [] },
//   ];

//   // Initialize a flag to track the checkbox state
//   isChecked: boolean = false;

//   // Handler for checkbox change event
//   handleCheckboxChange(
//     event: any,
//     adminId: string,
//     permissionType: PermissionType
//   ) {
//     this.isChecked = event.target.checked;

//     // Retrieve the permissions corresponding to the permission type
//     const permissionsToAdd = permissionMap[permissionType];

//     // Find the index of the admin role in the array
//     const adminIndex = this.findAdminIndexById(adminId);

//     if (adminIndex !== -1) {
//       if (this.isChecked) {
//         // Add permissions to the admin role
//         this.addPermissionsToAdmin(adminIndex, permissionsToAdd);
//       } else {
//         // Remove permissions from the admin role
//         this.removePermissionsFromAdmin(adminIndex, permissionsToAdd);
//       }
//     }

//     // Log the updated admin roles
//     console.log(this.adminRole);
//   }

//   // Find the index of an admin role by its ID
//   private findAdminIndexById(adminId: string): number {
//     return this.adminRole.findIndex((item) => item.id === adminId);
//   }

//   // Add permissions to an admin role
//   private addPermissionsToAdmin(
//     adminIndex: number,
//     permissions: string[]
//   ): void {
//     this.adminRole[adminIndex].permissions.push(...permissions);
//   }

//   // Remove permissions from an admin role
//   private removePermissionsFromAdmin(
//     adminIndex: number,
//     permissions: string[]
//   ): void {
//     const adminPermissions = this.adminRole[adminIndex].permissions;
//     permissions.forEach((permission) => {
//       const permissionIndex = adminPermissions.indexOf(permission);
//       if (permissionIndex !== -1) {
//         adminPermissions.splice(permissionIndex, 1);
//       }
//     });
//   }
// }

// // Importing the Component decorator from Angular core
// import { Component } from '@angular/core';

// // Declaring a component with a selector, template, and styles
// @Component({
//   selector: 'app-admin-applications-permission',
//   templateUrl: './admin-applications-permission.component.html',
//   styleUrls: ['./admin-applications-permission.component.scss'],
// })
// export class AdminApplicationsPermissionComponent {
//   // Define an array of admin roles with initial values
//   adminRole: any = [
//     { roleName: 'admin', id: '1', permissions: [] },
//     { roleName: 'chapter leader', id: '2', permissions: [] },
//     { roleName: 'branch champion', id: '3', permissions: [] },
//     { roleName: 'branch champion 2', id: '4', permissions: [] },
//   ];

//   // Initialize a boolean variable to track checkbox state
//   isChecked: boolean = false;

//   // Function to handle checkbox change event
//   handleCheckboxChange(event: any, adminId: string, permissionName: string) {
//     // Update the isChecked variable based on the checkbox state
//     this.isChecked = event.target.checked;

//     // Create an array to store new permissions
//     var newperm: any = [];
//     // add permissions based on permissionName
//     if (permissionName === 'edit') {
//       newperm = ['edit1', 'edit2', 'edit3'];
//     } else if (permissionName === 'add') {
//       newperm = ['add1', 'add2', 'add3'];
//     } else if (permissionName === 'view') {
//       newperm = ['view1', 'view2', 'view3'];
//     } else if (permissionName === 'delete') {
//       newperm = ['delete'];
//     }

//     if (this.isChecked) {
//       // If the checkbox is checked

//       // Find the index of the admin role in the adminRole array
//       const existingAdminIndex = this.adminRole.findIndex(
//         (item: any) => item['id'] === adminId
//       );

//       // If the admin role exists, add the new permissions to it
//       if (existingAdminIndex !== -1) {
//         newperm.map((perm: any) =>
//           this.adminRole[existingAdminIndex]['permissions'].push(perm)
//         );
//       }
//     } else {
//       // If the checkbox is unchecked

//       // Find the index of the admin role to remove permissions from
//       const adminIndexToRemove = this.adminRole.findIndex(
//         (item: any) => item['id'] === adminId
//       );

//       // If the admin role exists, remove the specified permissions
//       if (adminIndexToRemove !== -1) {
//         newperm.map((perm: any) => {
//           const permissionIndexToRemove =
//             this.adminRole[adminIndexToRemove]['permissions'].indexOf(perm);

//           // Remove the permission if found in the admin's permissions array
//           if (permissionIndexToRemove !== -1) {
//             this.adminRole[adminIndexToRemove]['permissions'].splice(
//               permissionIndexToRemove,
//               1
//             );
//           }
//         });
//       }
//     }

//     // Log the updated adminRole array to the console
//     console.log(this.adminRole);
//   }
// }
