import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminAddActivityFormComponent } from '../admin-add-activity-form/admin-add-activity-form.component';
import { AdminAddEventFormComponent } from '../admin-add-event-form/admin-add-event-form.component';
import { ActivatedRoute } from '@angular/router';
import { AdminChapterEventsComponent } from '../admin-chapter-events/admin-chapter-events.component';
import { AdminChapterActivitiesComponent } from '../admin-chapter-activities/admin-chapter-activities.component';

@Component({
  selector: 'app-admin-chapter-home',
  templateUrl: './admin-chapter-home.component.html',
  styleUrls: ['./admin-chapter-home.component.scss'],
})
export class AdminChapterHomeComponent {
  @ViewChild(AdminChapterEventsComponent)
  eventsComponent!: AdminChapterEventsComponent;
  @ViewChild(AdminChapterActivitiesComponent)
  activitiesComponent!: AdminChapterActivitiesComponent;
  constructor(
    private route: ActivatedRoute,

    public dialog: MatDialog
  ) {}

  chapterId!: string;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.chapterId = id;
    } else {
      // Handle the case when the id is null
    }
    console.log('chapter id: ', typeof this.chapterId);
  }

  // add event form dialog
  addEventDialog(): void {
    // Open the dialog using the MatDialog service
    const dialogRef: MatDialogRef<AdminAddEventFormComponent> =
      this.dialog.open(AdminAddEventFormComponent, {
        width: '50%',

        // Set the width of the dialog

        data: { data: this.chapterId }, // You can pass data to the dialog component using the `data` property
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

        data: { data: this.chapterId }, // You can pass data to the dialog component using the `data` property
      });

    // Handle the dialog result (if needed)
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.activitiesComponent.ngOnInit();
    });
  }
}
