import { Component } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-add-hubs-form',
  templateUrl: './admin-add-hubs-form.component.html',
  styleUrls: ['./admin-add-hubs-form.component.scss'],
})
export class AdminAddHubsFormComponent {
  userId!: string;
  imageUrl!: string;
  hubForm!: FormGroup;
  // hubTypeOptions!: any[];
  selectedImage!: File;

  //hubs type options
  // typeOptions: any[] = [
  //   { value: 'School', viewValue: 'School' },
  //   { value: 'Region', viewValue: 'Region' },
  //   { value: 'Profession', viewValue: 'Profession' },
  // ];

  constructor(
    private http: HttpServiceService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AdminAddHubsFormComponent>
  ) {}

  url!: string;

  ngOnInit() {
    // form builder
    this.hubForm = this.fb.group({
      hubName: ['', Validators.required],
      // hubType: ['', Validators.required],
      hubDescription: ['', Validators.required],
      file: [null],
      // hubAdmin: [''],
    });
    this.url = this.http.serverUrl + 'v2/hubs/create';
    // this.gethubTypes();

    // add hub types
    // const url = this.http.serverUrl + 'hub-types/add-new-HubType';

    // this.http
    //   .postData(url, { hubTypeName: 'new', hubTypeDescription: 'new' })
    // .getData(url)
    // .subscribe({
    //   next: (response) => {
    //     console.log('elps', response);

    //     this.dialogRef.close();

    // Handle the response data here
    // localStorage.setItem('token', JSON.stringify(response));
    // },
    // error: (error) => {
    //   console.log('Error:', error);
    // Handle the error here
    // },
    // complete: () => {},
    // });
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      this.selectedImage = event.target.files[0];
      this.hubForm.get('file')?.setValue(this.selectedImage);
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedImage);
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
    }
  }

  // ==============================get all the hub types from the server====================================
  // gethubTypes() {
  //   // url to get all the hub types from the server
  //   const urlGetHubType = this.http.serverUrl + 'hub-types/all';

  //   // get all the hubtypes from the server
  //   this.http.getData(urlGetHubType).subscribe({
  //     next: (response) => {
  //       console.log('Hub type', response);
  //       this.hubTypeOptions = response;
  //       console.log(typeof this.hubTypeOptions);
  //       // Handle the response data here
  //       // localStorage.setItem('token', JSON.stringify(response));
  //     },
  //     error: (error) => {
  //       console.log('Error:', error);
  //       // Handle the error here
  //     },
  //     complete: () => {},
  //   });
  // }
  // =====================================================================================================

  submit() {
    console.log(this.hubForm.value);
    const formData = new FormData();

    // add all the activityForm control to the form data object
    Object.keys(this.hubForm.controls).forEach((controlName) => {
      formData.append(controlName, this.hubForm.get(controlName)?.value);
    });

    //submit the form chapter data to the server

    this.http.postData(this.url, formData).subscribe({
      next: (response) => {
        console.log('POST request successful:', response);
        this.dialogRef.close();

        // Handle the response data here
        localStorage.setItem('token', JSON.stringify(response.payload));
      },
      error: (error) => {
        console.log('Error:', error);
        // Handle the error here
      },
      complete: () => {},
    });
  }
}
