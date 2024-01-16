import { Component } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent {
  //dependancy injection
  constructor(
    private http: HttpServiceService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  url = this.http.serverUrl + 'auth/authenticate';
  userLogData!: any;
  error!: any;
  hide: boolean = false;

  loginRegForm = this.fb.group({
    userEmail: ['', [Validators.email, Validators.required]],
    userPassword: ['', [Validators.required]],
  });

  // method to submit login data to server
  loginSubmit() {
    console.log(this.loginRegForm);

    //send the from data to the server for validation
    this.http.postData(this.url, this.loginRegForm.value).subscribe({
      next: (response) => {
        console.log('request successful:', response);
        localStorage.setItem('userData', JSON.stringify(response));
        //redirect to home page if authenticated
        this.router.navigate(['/admin/dashboard']);
      },
      error: (error) => {
        // error message handling
        if (error.error.errorMessage) {
          this.error = error.error.errorMessage;
        } else {
          this.error = 'Server connection error';
        }
        console.log('Error:', error);
      },
      complete: () => {},
    });
  }
}
