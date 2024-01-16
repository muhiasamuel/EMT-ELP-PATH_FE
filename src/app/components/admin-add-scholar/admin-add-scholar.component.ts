import { Component, Inject } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-admin-add-scholar',
  templateUrl: './admin-add-scholar.component.html',
  styleUrls: ['./admin-add-scholar.component.scss']
})
export class AdminAddScholarComponent {
  addScholarForm!: FormGroup;
  genderOptions: string[]= ['Male', 'Female'];
  url!: string;
  constructor(
    private http: HttpServiceService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AdminAddScholarComponent>,
    @Inject (MAT_DIALOG_DATA) public data:any
  ){
    this.addScholarForm= this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      scholarCode: ['', Validators.required],
      instituition: ['', Validators.required],
      cluster: ['', Validators.required],
      course: ['', Validators.required],
      branch: ['', Validators.required],


    })
  }
 ngOnInit(){
  this.url = this.http.serverUrl + 'scholars/create-scholars';
 }

 submit(){
  
  this.http.postData(this.url, this.addScholarForm.value).subscribe({
    next: (response) => {
      console.log('POST request successful:', response);
      console.log(this.addScholarForm.value);

      this.dialogRef.close();

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
 cancel(){
  this.dialogRef.close()
 }
}
