import { Component, ViewChild } from '@angular/core';
import { AdminAddEventFormComponent } from '../admin-add-event-form/admin-add-event-form.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminChapterEventsComponent } from '../admin-chapter-events/admin-chapter-events.component';
@Component({
  selector: 'app-admin-events-home',
  templateUrl: './admin-events-home.component.html',
  styleUrls: ['./admin-events-home.component.scss'],
})
export class AdminEventsHomeComponent {
  @ViewChild(AdminChapterEventsComponent)
  eventsComponent!: AdminChapterEventsComponent;
  constructor(public dialog: MatDialog) {}

  ngOnInit() {}
  // add event form dialog
  addEventDialog(): void {
    // Open the dialog using the MatDialog service
    const dialogRef: MatDialogRef<AdminAddEventFormComponent> =
      this.dialog.open(AdminAddEventFormComponent, {
        width: '50%',

        // Set the width of the dialog

        data: { data: '' }, // You can pass data to the dialog component using the `data` property
      });

    // Handle the dialog result (if needed)
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.eventsComponent.ngOnInit();
    });
  }
}
