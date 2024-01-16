import { Component, Input } from '@angular/core';
import { EducationFormComponent } from '../education-form/education-form.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpServiceService } from 'src/app/services/http-service.service';
@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
})
export class EducationComponent {
  constructor(public dialog: MatDialog, public http: HttpServiceService) {}
  userId!: string;
  url!: string;
  rowData!: any[];
  @Input() userIdadmin!: string;
  @Input() viewer!: string;
  ngOnInit() {
    const storedData = localStorage.getItem('userData');
    if (this.userIdadmin) {
      console.log('useridadmin', this.userIdadmin.toString());
      this.userId = this.userIdadmin.toString();
    } else if (storedData) {
      const parsedData = JSON.parse(storedData);
      this.userId = parsedData.id;
    }
    // Use the parsed data in your application
    this.url = this.http.serverUrl + 'education/' + this.userId + '/view';

    this.http.getData(this.url).subscribe({
      next: (response) => {
        this.rowData = response.payload;
        console.log('POST request successful:', response);

        // Handle the response data here
        // localStorage.setItem('token', JSON.stringify(response));
      },
      error: (error) => {
        console.log('Error:', error);
        // Handle the error here
      },
      complete: () => {},
    });
  }

  // open eduaction form dialog
  eformDialog(editAdd: string): void {
    // Open the dialog using the MatDialog service
    const dialogRef: MatDialogRef<EducationFormComponent> = this.dialog.open(
      EducationFormComponent,
      {
        width: '45%',
        height: '80%', // Set the width of the dialog

        data: { data: editAdd }, // You can pass data to the dialog component using the `data` property
      }
    );

    // Handle the dialog result (if needed)
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }
}
