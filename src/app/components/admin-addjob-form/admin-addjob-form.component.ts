import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { AdminAddOrganizationFormComponent } from '../admin-add-organization-form/admin-add-organization-form.component';
import { ServiceService } from 'src/app/services/service.service';



@Component({
  selector: 'app-admin-addjob-form',
  templateUrl: './admin-addjob-form.component.html',
  styleUrls: ['./admin-addjob-form.component.scss'],
})
export class AdminAddjobFormComponent {
  // Declare class properties
  jobPostings: any[] = [];
  jobQualifications!: FormArray;
  jobResponsibilities!: FormArray;
  error: string = '';
  url!: string;
  jobform: FormGroup; // Form group for the application form
  qualification!: any;
  responsibility!: any;
  imageUrl!: string;
  selectedImage: File | null = null; // To hold the selected image
  IevelOptions: string[] = [
    'PHD',
    'MASTERS',
    'DEGREE',
    'DIPLOMA',
    'KCSE',
    'KCPE',
    'NONE',
  ];
  organizationOptions: any;
  urlGetorganization!: string;
  organizationId: any;
 

  constructor(
    private service: ServiceService,
    private fb: FormBuilder,
    private http: HttpServiceService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AdminAddjobFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.jobQualifications = this.fb.array([this.fb.control('')]);
    this.jobResponsibilities = this.fb.array([this.fb.control('')]);
       this.jobform= this.fb.group({
        jobTitle: ['', Validators.required],
        jobType: ['', Validators.required],
        jobSalary: ['', Validators.required],
        educationLevel: ['', Validators.required],
        applicationDeadLine: ['', Validators.required], 
        organization: ['', Validators.required], 
        jobDescription: ['', Validators.required], 
        howToApply: ['', Validators.required],
        jobQualifications: this.jobQualifications,
        jobResponsibilities: this.jobResponsibilities,
        jobPoster: [null, Validators.required],
       })
   

    // Initialize the application form using FormBuilder
  
  }

    
  ngOnInit() {
    // Initialize URL for HTTP request
    // this.getorganization();
  }

  onSubmit() {
    if(this.jobform.valid){
      const formData= new FormData();


      formData.append('jobTitle', this.jobform.get('jobTitle')!.value);
      formData.append('jobType', this.jobform.get('jobType')!.value);
      formData.append('jobSalary', this.jobform.get('jobSalary')!.value);
      formData.append('educationLevel', this.jobform.get('educationLevel')!.value);
      formData.append('applicationDeadLine', this.jobform.get('applicationDeadLine')!.value);
      formData.append('organization', this.jobform.get('organization')!.value);
      formData.append('jobDescription', this.jobform.get('jobDescription')!.value);
      formData.append('howToApply', this.jobform.get('howToApply')!.value);


      const jobQualifications = this.jobform.get('jobQualifications') as FormArray;
    for (const qualificationControl of jobQualifications.controls) {
      formData.append('jobQualifications[]', qualificationControl.value);
    }
  
    const jobResponsibilities = this.jobform.get('jobResponsibilities') as FormArray;
    for (const responsibilityControl of jobResponsibilities.controls) {
      formData.append('jobResponsibilities[]', responsibilityControl.value);
    }
    
      if (this.selectedImage) {
        formData.append('jobPoster', this.selectedImage);
      }

      this.service.postJobPosting(formData).subscribe(
        (res)=>{
          console.log('Form data submitted successfully:', res)
        },(error)=>{
          console.log('error:', Error)
        }
      )
    }
  }
  

  onFileChange(event: any) {

    if (event.target.files && event.target.files.length) {
      this.selectedImage = event.target.files[0];
      const fileNameParts = this.selectedImage!.name.split('.');
    const imageFormat = fileNameParts[fileNameParts.length - 1];

    console.log('Image format:', imageFormat); // Log the image format

    this.jobform.get('jobPoster')!.setValue(this.selectedImage);

    // Optionally, you can preview the image in your UI if needed.
    this.imageUrl = URL.createObjectURL(this.selectedImage!);
    }
  }

addQualification() {
  const qualificationsArray = this.jobform.get('jobQualifications') as FormArray<FormControl>;
  qualificationsArray.push(this.fb.control(''));
  this.jobQualifications.push(this.qualification);
  this.qualification = '';
}

addResponsibilities() {
  const responsibilitiesArray = this.jobform.get('jobResponsibilities') as FormArray<FormControl>;
  responsibilitiesArray.push(this.fb.control(''));
  this.jobResponsibilities.push(this.responsibility);
  this.responsibility = '';
}
  
  
  // addQualification() {
  //   if (this.qualification !== undefined) {
  //     this.jobform.value.jobQualifications.push(this.qualification);
  //     this.qualifications.push(this.qualification);
  //     this.qualification = undefined;
  //   }
  // }

  // addResponsibilities() {
  //   if (this.responsibility !== undefined) {
  //     this.jobform.value.jobResponsibilities.push(this.responsibility);
  //     this.responsibilities.push(this.responsibility);
  //     this.responsibility = undefined;
  //   }
  // }

  // open bio dialog
  addorganizationDialog() {
    // Open the dialog using the MatDialog service
    const dialogRef: MatDialogRef<AdminAddOrganizationFormComponent> =
      this.dialog.open(AdminAddOrganizationFormComponent, {
        width: '60%', // Set the width of the dialog
        data: { data: '' }, // You can pass data to the dialog component using the `data` property
      });

    // Handle the dialog result (if needed)
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }

  // Fetch branch data from the server
  getorganization() {
    this.urlGetorganization = this.http.serverUrl + 'organization/all'; // URL to fetch organization data
    this.http.getData(this.urlGetorganization).subscribe({
      next: (response) => {
        console.log('organization id', response.id);
        this.organizationOptions = response; // Set organizationOptionss array
        console.log(this.organizationOptions);
        this.organizationId = response.id;
      },
      error: (error) => {
        console.log('Error:', error);
      },
      complete: () => {},
    });
  }

  addItemsToFormData(formData: FormData, formArray: FormArray, fieldName: string) {
    for (let i = 0; i < formArray.length; i++) {
      formData.append(`${fieldName}[${i}]`, formArray.at(i).value);
    }
  }
}
