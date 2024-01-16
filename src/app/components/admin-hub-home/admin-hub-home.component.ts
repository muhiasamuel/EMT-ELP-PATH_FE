import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminAddActivityFormComponent } from '../admin-add-activity-form/admin-add-activity-form.component';
import { AdminAddEventFormComponent } from '../admin-add-event-form/admin-add-event-form.component';
import { AdminHubEventsComponent } from '../admin-hub-events/admin-hub-events.component';
import { AdminHubActivitiesComponent } from '../admin-hub-activities/admin-hub-activities.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-hub-home',
  templateUrl: './admin-hub-home.component.html',
  styleUrls: ['./admin-hub-home.component.scss'],
})
export class AdminHubHomeComponent {
  @ViewChild(AdminHubEventsComponent)
  eventsComponent!: AdminHubEventsComponent;
  @ViewChild(AdminHubActivitiesComponent)
  activitiesComponent!: AdminHubActivitiesComponent;
  constructor(
    private route: ActivatedRoute,

    public dialog: MatDialog
  ) {}

  hubId!: string;
  loading: boolean = false;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.hubId = id;
    } else {
      // Handle the case when the id is null
    }
  }

  // add event form dialog
  addEventDialog(): void {
    // Open the dialog using the MatDialog service
    const dialogRef: MatDialogRef<AdminAddEventFormComponent> =
      this.dialog.open(AdminAddEventFormComponent, {
        width: '50%',

        // Set the width of the dialog

        data: { data: this.hubId }, // You can pass data to the dialog component using the `data` property
      });

    // Handle the dialog result (if needed)
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.eventsComponent.ngOnInit();
    });
  }

  // add activity form dialog
  addActivityDialog(): void {
    // Open the dialog using the MatDialog service
    const dialogRef: MatDialogRef<AdminAddActivityFormComponent> =
      this.dialog.open(AdminAddActivityFormComponent, {
        width: '50%',

        // Set the width of the dialog

        data: { data: this.hubId }, // You can pass data to the dialog component using the `data` property
      });

    // Handle the dialog result (if needed)
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.activitiesComponent.ngOnInit();
    });
  }
}
