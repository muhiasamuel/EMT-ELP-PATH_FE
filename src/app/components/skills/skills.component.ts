import { Component, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { CommonModule, NgForOf } from '@angular/common'; // Add this import
import {
  ProgressBarMode,
  MatProgressBarModule,
} from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CareerFormComponent } from '../career-form/career-form.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { SkillsFormComponent } from '../skills-form/skills-form.component';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatRadioModule,
    FormsModule,
    NgIf,
    MatSliderModule,
    MatProgressBarModule,
    CommonModule,
    MatIconModule,
  ],
})
export class SkillsComponent {
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  value = 50;
  bufferValue = 75;
  userId!: string;

  @Input() userIdadmin!: string;
  @Input() viewer!: string;
  @Input() skillsData: { name: string }[] = [];

  constructor(public dialog: MatDialog, public http: HttpServiceService) {}
  ngOnInit() {
    const storedData = localStorage.getItem('userData');
    if (this.userIdadmin) {
      console.log('useridadmin', this.userIdadmin.toString());
      this.userId = this.userIdadmin.toString();
    } else if (storedData) {
      const parsedData = JSON.parse(storedData);
      this.userId = parsedData.id;
    }
    //   // Use the parsed data in your application
    // this.url = this.http.serverUrl + 'education/' + this.userId + '/view';

    // this.http.getData(this.url).subscribe({
    //   next: (response) => {
    //     this.rowData = response;
    //     console.log('POST request successful:', response);

    //     // Handle the response data here
    //     // localStorage.setItem('token', JSON.stringify(response));
    //   },
    //   error: (error) => {
    //     console.log('Error:', error);
    //     // Handle the error here
    //   },
    //   complete: () => {},
    // });
  }
  sformDialog(): void {
    // Open the dialog using the MatDialog service
    const dialogRef: MatDialogRef<SkillsFormComponent> = this.dialog.open(
      SkillsFormComponent,
      {
        width: '40%', // Set the width of the dialog

        data: { data: this.userId }, // You can pass data to the dialog component using the `data` property
      }
    );

    // Handle the dialog result (if needed)
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }
}
