import { Component, ViewChild, Inject } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-skills-form',
  templateUrl: './skills-form.component.html',
  styleUrls: ['./skills-form.component.scss'],
})
export class SkillsFormComponent {
  // @ViewChild('skillsform', { static: false }) skillsform!: NgForm;
  skillName!: string;
  level!: number;
  userId!: string;
  value: number = 1;
  skillsForm!: FormGroup;

  constructor(
    private http: HttpServiceService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SkillsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  url!: string;
  ngOnInit() {
    console.log('user id in bio', this.data.data.toString());

    if (this.data.data) {
      this.userId = this.data.data.toString();
      // Use the parsed data in your application
      this.skillsForm = this.fb.group({
        skillName: ['', Validators.required],
        level: ['', Validators.required],
      });
      this.url = this.http.serverUrl + 'skills/' + this.userId + '/create';
    }
  }
  onSliderChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = +target.value;
  }

  submit() {
    console.log('Form Submitted !', this.skillsForm.value);
    this.http.postData(this.url, this.skillsForm.value).subscribe({
      next: (response) => {
        console.log('POST request successful:', response);
        console.log(this.skillsForm.value);
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
