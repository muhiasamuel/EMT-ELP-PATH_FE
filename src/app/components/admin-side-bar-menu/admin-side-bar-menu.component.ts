import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminAddChaptersFormComponent } from '../admin-add-chapters-form/admin-add-chapters-form.component';
import { AddAdminFormComponent } from '../add-admin-form/add-admin-form.component';
import { AdminAddHubsFormComponent } from '../admin-add-hubs-form/admin-add-hubs-form.component';

@Component({
  selector: 'app-admin-side-bar-menu',
  templateUrl: './admin-side-bar-menu.component.html',
  styleUrls: ['./admin-side-bar-menu.component.scss'],
})
export class AdminSideBarMenuComponent {
  
  constructor(public dialog: MatDialog) {}
  // add chapter form dialog
  addChapterDialog(): void {
    // Open the dialog using the MatDialog service
    const dialogRef: MatDialogRef<AdminAddChaptersFormComponent> =
      this.dialog.open(AdminAddChaptersFormComponent, {
        width: '50%',

        // Set the width of the dialog

        data: { data: 'john' }, // You can pass data to the dialog component using the `data` property
      });

    // Handle the dialog result (if needed)
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  addHubDialog(): void {
    // Open the dialog using the MatDialog service
    const dialogRef: MatDialogRef<AdminAddHubsFormComponent> = this.dialog.open(
      AdminAddHubsFormComponent,
      {
        width: '50%',

        // Set the width of the dialog

        data: { data: 'john' }, // You can pass data to the dialog component using the `data` property
      }
    );

    // Handle the dialog result (if needed)
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // add chapter form dialog
  addAdminDialog(): void {
    // Open the dialog using the MatDialog service
    const dialogRef: MatDialogRef<AddAdminFormComponent> = this.dialog.open(
      AddAdminFormComponent,
      {
        width: '50%',

        // Set the width of the dialog

        data: { data: 'john' }, // You can pass data to the dialog component using the `data` property
      }
    );

    // Handle the dialog result (if needed)
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
