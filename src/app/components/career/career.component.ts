import { Component, Input } from '@angular/core';
import { CareerFormComponent } from '../career-form/career-form.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpServiceService } from 'src/app/services/http-service.service';
@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss'],
})
export class CareerComponent {
  constructor(public dialog: MatDialog, public http: HttpServiceService) {}
  url!: string;
  rowData!: any[];
  userId!: string;
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
    this.url = this.http.serverUrl + 'career/' + this.userId + '/view';
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

  // open career form dialog
  cformDialog(editAdd: string): void {
    // Open the dialog using the MatDialog service
    const dialogRef: MatDialogRef<CareerFormComponent> = this.dialog.open(
      CareerFormComponent,
      {
        width: '45%', // Set the width of the dialog

        // data: { data: this.userId }, // You can pass data to the dialog component using the `data` property
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
