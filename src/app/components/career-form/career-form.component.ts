import { Component, ViewChild, Inject } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-career-form',
  templateUrl: './career-form.component.html',
  styleUrls: ['./career-form.component.scss'],
})
export class CareerFormComponent {
  @ViewChild('careerform', { static: false }) careerform!: NgForm;
  end_date!: string;
  start_date!: string;
  description!: string;
  companyName!: string;
  title!: string;
  userId!: string;
  constructor(
    private http: HttpServiceService,
    public dialogRef: MatDialogRef<CareerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  url!: string;
  ngOnInit() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      // Use the parsed data in your application
      this.userId = parsedData.id;
      this.url = this.http.serverUrl + 'career/' + this.userId + '/create';
    }
  }
  submit() {
    console.log('Form Submitted !', this.careerform.value);
    this.http.postData(this.url, this.careerform.value).subscribe({
      next: (response) => {
        console.log('POST request successful:', response);
        console.log(this.careerform.value);
        // Handle the response data here
        // localStorage.setItem('token', JSON.stringify(response));
        this.dialogRef.close();
      },
      error: (error) => {
        console.log('Error:', error);
        // Handle the error here
      },
      complete: () => {},
    });
  }
}
