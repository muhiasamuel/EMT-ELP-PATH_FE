import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-journey',
  templateUrl: './admin-journey.component.html',
  styleUrls: ['./admin-journey.component.scss'],
})
export class AdminJourneyComponent {
  constructor(
    public dialogRef: MatDialogRef<AdminJourneyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any //data from the component where the dialogue is invoked
  ) {}

  activeTab: string = 'application';
  showTab(tab: string) {
    this.activeTab = tab;
  }
}
