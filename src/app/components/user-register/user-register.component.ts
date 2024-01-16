import { Component } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
})
export class UserRegisterComponent {
  constructor(
    private http: HttpServiceService,
    private router: Router,
    private fb: FormBuilder
  ) {}
  hide = true;
  //email error message from the server
  errorEmail!: any;
  // scholarnumber error message from the server
  errorScholarNo!: any;

  confirmPassword!: string;
  //url for registration
  url = this.http.serverUrl + 'auth/register';

  // form builder ,intializing register form
  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    userEmail: ['', [Validators.email, Validators.required]],
    userPassword: ['', [Validators.required]],
    scholarNumber: ['', [Validators.required]],
  });
  submit() {
    console.log('Form Submitted !', this.registerForm.value);
    //initalize the email error message to null when the form is submitted
    this.errorEmail = null;
    //initalize the scholar number error message to null when the form is submitted
    this.errorScholarNo = null;

    //send the registration form data to the server
    this.http.postData(this.url, this.registerForm.value).subscribe({
      next: (response) => {
        // Handle the response data here
        console.log('request successful:', response);
        this.router.navigate(['/']);
      },
      error: (error) => {
        // error message handling
        console.log('Error:', error.error.errorMessage);
        //set email error message from the server
        if (
          error.error.errorMessage === 'User with this email already exists'
        ) {
          this.errorEmail = 'User with this email already exists';
        }
        // set scholar number error message from the server
        else if (
          error.error.errorMessage ===
          'User with this scholar code already exists'
        ) {
          this.errorScholarNo = 'User with this scholar code already exists';
        }
      },
      complete: () => {},
    });
  }
}
