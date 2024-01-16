import { Component, OnInit, Inject, NgZone } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceService } from 'src/app/services/service.service';
@Component({
  selector: 'app-admin-add-job-update',
  templateUrl: './admin-add-job-update.component.html',
  styleUrls: ['./admin-add-job-update.component.scss']
})
export class AdminAddJobUpdateComponent implements OnInit {
  jobPostings: any[] = [];
  jobQualifications!: FormArray;
  jobResponsibilities!: FormArray;
  jobform!: FormGroup;
  error: string = '';
  url!: string;
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
 
  newsForm: FormGroup;
  previewImage: string | undefined;
  constructor(
    private dialogRef: MatDialogRef<AdminAddJobUpdateComponent>,
    private service: ServiceService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private zone: NgZone,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.jobQualifications = this.formBuilder.array([this.formBuilder.control('')]);
      this.jobResponsibilities = this.formBuilder.array([this.formBuilder.control('')]);
    this.newsForm = this.formBuilder.group({
      
      image: [],
          jobTitle: [this.data?.jobTitle ||'', Validators.required],
          jobType: [this.data?.jobType ||'', Validators.required],
          jobSalary: [this.data?.jobSalary ||'', Validators.required],
          educationLevel: [this.data?.educationLevel ||'', Validators.required],
          applicationDeadLine: [this.data?.applicationDeadLine ||'', Validators.required], 
          organization: [this.data?.organization ||'', Validators.required], 
          jobDescription: [this.data?.jobDescription ||'', Validators.required], 
          howToApply: [this.data?.howToApply ||'', Validators.required],
          jobQualifications:[this.data?.jobQualifications||'', Validators.required],
          jobResponsibilities: [this.data?.jobResponsibilities||'', Validators.required],
          jobPoster: [this.data?.jobPoste || null],
         
    });
  }

  ngOnInit(): void {}

  private openSnackBar(content: string, panelClass?: string): void {
    // Run inside Angular zone
    this.zone.run(() => {
      this.snackBar.open(content, 'Close', {
        duration: 3000,
        panelClass: panelClass || undefined,
      });
    });
  }

  onSubmit() {

    if (this.newsForm.invalid) {
      this.openSnackBar('Please fill in all required fields');
      return;
    }

    const id = this.data?.id;
    console.log('Form Values:', this.newsForm.value);

    const formData = new FormData();
    formData.append('jobTitle', this.newsForm.value.title);
    formData.append('jobType', this.newsForm.value.content);
    formData.append('jobSalary', this.newsForm.value.title);
    formData.append('educationLevel', this.newsForm.value.content);
    formData.append('applicationDeadLine', this.newsForm.value.title);
    formData.append('organization', this.newsForm.value.content);
    formData.append('jobDescription', this.newsForm.value.title);
    formData.append('howToApply', this.newsForm.value.content);

    const jobQualifications = this.jobform.get('jobQualifications') as FormArray;
    for (const qualificationControl of jobQualifications.controls) {
      formData.append('jobQualifications[]', qualificationControl.value);
    }
  
    const jobResponsibilities = this.jobform.get('jobResponsibilities') as FormArray;
    for (const responsibilityControl of jobResponsibilities.controls) {
      formData.append('jobResponsibilities[]', responsibilityControl.value);
    }
    
    if (this.newsForm.value.image) {
      formData.append('image', this.newsForm.value.image, this.newsForm.value.image.name);
    }

    this.service.updateSpolight(formData, id).subscribe({
      next: (res) => {
        console.log('Update Response:', res);
    
        if (res.payload) {
          this.dialogRef.close(res.payload);
          this.snackBar.open('Update successful', 'Close', { duration: 3000 }); 
        } else {
          console.warn('Update response is missing payload.');
          this.snackBar.open('Update failed', 'Close', { duration: 3000 });
        }
      },
      error: (error) => {
        console.error('Update failed:', error)
        this.snackBar.open('Update failed', 'Close', { duration: 3000, panelClass: 'error-snackbar' });
      }
    }
    
    
    );
    
    
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
  
    if (input.files && input.files.length) {
      const updatedValue = { ...this.newsForm.value, image: input.files[0] };
      this.newsForm.setValue(updatedValue);
     
      const file = input.files[0];

    // Read the file as a data URL
    const reader = new FileReader();
    reader.onload = (e) => {
      // Set the preview image
      this.previewImage = e.target?.result as string;
    };

    reader.readAsDataURL(file);

    // Update the form control
    this.newsForm.patchValue({
      image: file
    });
      
    }
  }
}

