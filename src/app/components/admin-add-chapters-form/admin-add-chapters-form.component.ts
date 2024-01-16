import { Component } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-admin-add-chapters-form',
  templateUrl: './admin-add-chapters-form.component.html',
  styleUrls: ['./admin-add-chapters-form.component.scss'],
})
export class AdminAddChaptersFormComponent {
  userId!: string;
  imageUrl!: string;
  chapterForm!: FormGroup;
  chapterTypeOptions!: any[];
  selectedImage!: File;

  //chapters type options
  chaperTypeOptions: any[] = [
    { value: 'School', viewValue: 'School' },
    { value: 'Region', viewValue: 'Region' },
    { value: 'Profession', viewValue: 'Profession' },
  ];

  constructor(
    private http: HttpServiceService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AdminAddChaptersFormComponent>
  ) {}

  url!: string;

  ngOnInit() {
    // form builder
    this.chapterForm = this.fb.group({
      chapterName: ['', Validators.required],
      chapterType: ['', Validators.required],
      chapterDescription: ['', Validators.required],
      file: [null],
      // chapterAdmin: [''],
    });
    this.url = this.http.serverUrl + 'chapters/create';
    this.getchapterTypes();

    // add chapter types
    const url = this.http.serverUrl + 'chapter-types/add-new-ChapterType';

    this.http
      .postData(url, { chapterTypeName: 'new', chapterTypeDescription: 'new' })
      // .getData(url)
      .subscribe({
        next: (response) => {
          console.log('elps', response);

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

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      this.selectedImage = event.target.files[0];
      this.chapterForm.get('file')?.setValue(this.selectedImage);
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedImage);
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
    }
  }

  // ==============================get all the chapter types from the server====================================
  getchapterTypes() {
    // url to get all the chapter types from the server
    const urlGetChapterType = this.http.serverUrl + 'chapter-types/all';

    // get all the chaptertypes from the server
    this.http.getData(urlGetChapterType).subscribe({
      next: (response) => {
        console.log('Chapter type', response);
        this.chapterTypeOptions = response;
        console.log(typeof this.chapterTypeOptions);
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
  // =====================================================================================================

  submit() {
    console.log(this.chapterForm.value);
    const formData = new FormData();

    // add all the activityForm control to the form data object
    Object.keys(this.chapterForm.controls).forEach((controlName) => {
      formData.append(controlName, this.chapterForm.get(controlName)?.value);
    });

    //submit the form chapter data to the server

    this.http.postData(this.url, formData).subscribe({
      next: (response) => {
        console.log('POST request successful:', response);
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
}
