import { Component, OnInit, Inject, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-admin-news-udate-putform',
  templateUrl: './admin-news-udate-putform.component.html',
  styleUrls: ['./admin-news-udate-putform.component.scss']
})
export class AdminNewsUdatePutformComponent implements OnInit {
  newsForm: FormGroup;
  previewImage: string | undefined;
  constructor(
    private dialogRef: MatDialogRef<AdminNewsUdatePutformComponent>,
    private service: ServiceService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private zone: NgZone,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.newsForm = this.formBuilder.group({
      title: [this.data?.title || '', Validators.required],
      message: [this.data?.message || '', Validators.required],
      image: [this.data?.image || null],
    });
  }

  ngOnInit(): void {}

  private openSnackBar(message: string, panelClass?: string): void {
    // Run inside Angular zone
    this.zone.run(() => {
      this.snackBar.open(message, 'Close', {
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
    formData.append('title', this.newsForm.value.title);
    formData.append('message', this.newsForm.value.message);
    
    if (this.newsForm.value.image) {
      formData.append('image', this.newsForm.value.image, this.newsForm.value.image.name);
    }

    this.service.updateNews(formData, id).subscribe({
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
