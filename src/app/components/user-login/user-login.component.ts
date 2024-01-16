import { Component, ViewChild } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { TermsAndConditionsComponent } from '../terms-and-conditions/terms-and-conditions.component';
import { OtpVerificationFormComponent } from '../otp-verification-form/otp-verification-form.component';
import { CheckboxService } from 'src/app/services/checkbox.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { config } from 'rxjs';
import { NotificationsService } from 'src/app/services/notifications.service';
import { MatStepper } from '@angular/material/stepper';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent {
  @ViewChild('stepper') stepper!: MatStepper;
  url: string = this.http.serverUrl;
  error: string = '';
  register: string = '';
  scholarVerify: string = '';
  login: string = '';
  data: any;
  hide: boolean = false;
  scholarNo: any;

  // Forms using FormBuilder
  scholarVerForm!: FormGroup;
  forgotPfForm!: FormGroup;
  loginRegForm!: FormGroup;
  additionalRegForm!: FormGroup;
  pfForm!: FormGroup;
  snackBarConfig: MatSnackBarConfig = {
    horizontalPosition: 'center',
    verticalPosition: 'top'
  };
  pfNumber: any;

  constructor(
    private http: HttpServiceService,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
    public checkboxService: CheckboxService,
    private snackBar: MatSnackBar,
    private notficationService: NotificationsService
    
  ) {}
  isLinear:boolean = true

  ngOnInit() {
    this.initForms();
    this.subscribeToCheckboxChanges();
  }

  private initForms() {
    this.scholarVerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      highSchool: this.fb.group({
        schoolName: ['',Validators.required],
      }),
      branch: this.fb.group({
        branchName: ['', Validators.required],
      }),
      dob: ['', [Validators.required, this.dateValidator]],
    });

    this.forgotPfForm = this.fb.group({
      firstName: [''],
      secondName: [''],
      school: [''],
      branch: [''],
      dob: [''],
      email: [''],
      isChecked: new FormControl(this.checkboxService.isChecked),
    });

    this.loginRegForm = this.fb.group({
      scholarPfNo: [''],
      scholarEmail: ['', [Validators.email, Validators.required]],
      scholarPassword: ['', [Validators.required]],
    });

    this.additionalRegForm = this.fb.group({
      userName: ['',Validators.required],
      userEmail: ['', [Validators.email, Validators.required]],
      userPassword: ['', [Validators.required,Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      data: [''],
      isChecked: ['',Validators.required],
    });

    this.pfForm = this.fb.group({
      pfNo: ['', [Validators.required]],
    });
  }

  passwordsDoNotMatch() {
    const passwordControl = this.additionalRegForm.get('userPassword');
    const confirmPasswordControl = this.additionalRegForm.get('confirmPassword');

     // Check if controls are not null before accessing the value property
  if (passwordControl && confirmPasswordControl) {
    const password = passwordControl.value;
    const confirmPassword = confirmPasswordControl.value;

    return password !== confirmPassword;
  }

  // Handle the case where controls are null (e.g., log an error, return a default value, etc.)
  return false;
  }

  private subscribeToCheckboxChanges() {
    this.additionalRegForm
      .get('isChecked')
      ?.valueChanges.subscribe((value) => {
        if (this.checkboxService) {
          this.checkboxService.isChecked = value;
        }
      });

    this.checkboxService?.isChecked$.subscribe((isChecked) => {
      if (this.additionalRegForm?.get('isChecked')) {
        this.additionalRegForm.get('isChecked')?.setValue(isChecked, {
          emitEvent: false,
        });
      }
    });
  }

  dateValidator(control: FormControl) {
    if (control.value && isNaN(Date.parse(control.value))) {
      return { invalidDate: true };
    }
    return null;
  }
  tcformDialog(): void {
    // Open the dialog using the MatDialog service
    const dialogue: MatDialogRef<TermsAndConditionsComponent> =
      this.dialog.open(TermsAndConditionsComponent, {
        width: '35%', // Set the width of the dialog
        // data: { data: this.userId }, // You can pass data to the dialog component using the `data` property
      });

    // Handle the dialog result (if needed)
    dialogue.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }
  otpformDialog(): void {
    // Open the dialog using the MatDialog service
    const dialogue: MatDialogRef<OtpVerificationFormComponent> =
      this.dialog.open(OtpVerificationFormComponent, {
        width: '35%', // Set the width of the dialog
        // data: { data: this.userId }, // You can pass data to the dialog component using the `data` property
      });

    // Handle the dialog result (if needed)
    dialogue.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }

  forgotPfSubmit() {}

  // Method to submit scholar verification data
  scholarVerSubmit() {
    const formData = {
      firstName: this.scholarVerForm.value.firstName,
      lastName: this.scholarVerForm.value.lastName,
      highSchool: this.scholarVerForm.value.highSchool?.schoolName,
      homeBranch: this.scholarVerForm.value.branch?.branchName,
      pfNumberOrscholarCode: this.pfForm.value.pfNo
      // dob: moment(this.scholarVerForm.value.dob).format('YYYY-MM-DD'),
    };

    const url = this.url + 'join-request/alumni/verify-details';


    console.log("this is the info to verify:",formData),
    this.http.postScholarDataForVerification(url, formData).subscribe({
      next: (response) => {
        if (response.success) {
          this.stepper.selectedIndex=1
          // this.register = 'register';
          console.log("reg value is "+this.register)
          this.notficationService.alertSuccess("Details verified, register here")
          this.data = formData;
        } else {
          this.error = 'Verification Failed, Contact us.';
          console.log('ErrorMSG', this.error);
        }
      },
      error: (error) => {
        this.error =
          error.error.message || 'Error occurred during verification.';
        console.log('Errormsg', this.error);
      },
      complete: () => {},
    });
  }

  displayedForm: string = ''; // Variable to track which form to display

  showForm(forgotPf: string) {
    this.displayedForm = 'forgotPf'; // Set which form to display based on the button click
  }
  // Method to submit login data to server
  loginSubmit() {
    this.loginRegForm.value.scholarPfNo = this.pfForm.value.pfNo
    console.log(this.loginRegForm.value);
    //send the from data to the server for validation
    this.http
      .postData(this.url + 'auth/confirm/scholar-email', this.loginRegForm.value)
      .subscribe({
        next: (response) => {
          console.log('request successful:', response.payload);
          localStorage.setItem('userData', JSON.stringify(response.payload));
          //redirect to home page if authenticated
          this.router.navigate(['/home']);
        },
        error: (error) => {
          // error message handling
          if (error.error.message) {
            this.error = error.error.message;
            this.notficationService.alertWarning(this.error)
            // this.snackBar.open(this.error, 'Close', this.snackBarConfig)
          } else {
            this.error = 'Server connection error';
          }
          console.log('Error:', error);
        },
        complete: () => {},
      });
  }

  password: any = document.getElementById('password');
  confirm_password: any = document.getElementById('confirmPassword');

  validatePassword() {
    if (this.password.value != this.confirm_password.value) {
      this.confirm_password.setCustomValidity("Passwords Don't Match");
    } else {
      this.confirm_password.setCustomValidity('');
    }
  }

  // this.password.onchange.validatePassword();
  // this.confirm_password.onkeyup.validatePassword();

  // Method to submit register data to server
 
  registerSubmit() {
  
    if (this.additionalRegForm.valid) {
      const obj = {
        username: this.additionalRegForm.value.userName || null,
        email: this.additionalRegForm.value.userEmail || null,
        password: this.additionalRegForm.value.userPassword || null,
        // data: this.additionalRegForm.value.data || null,
        pfNumberOrScholarCode: this.pfNumber,
        acceptedTermsAndConditions: this.checkboxService.isChecked
      };

      const urls = this.url + `join-request/alumni/register`;

      this.http.postData(urls, obj).subscribe({
        next: (response) => {
          console.log(response)
          if(response.success) {
            // this.snackBar.open('Registration Successful, Continue to login')
            this.register = '';
            this.scholarVerify = '';
            this.login = 'login';
            console.log('Request successful:', response);
          }
        },
        error: (error) => {
          console.log('Error:', error);
        },
        complete: () => {
          // You can add finalization logic here if needed
        },
      });
    } else {
      // Handle invalid form submission (optional)
      console.log('Form is invalid. Cannot submit.');
      
    }
  
  }

  // Method to submit PF number
  pfSubmit() {
    const url = this.url + `join-request/${this.pfForm.value.pfNo}/join`;

    this.http.postNoData(url).subscribe({
      next: (response) => {
        if (!response.success) {
          this.scholarVerify = 'scholarVerify';
          this.data = this.pfForm.value.pfNo;
          this.pfNumber= this.pfForm.value.pfNo;
        } else if (response.success && response.message.includes('Login')) {
          this.scholarNo = this.pfForm.value.pfNo
          this.loginRegForm.value.scholarPfNo = this.pfForm.value.pfNo
          console.log("Pf Number is "+this.loginRegForm.value.scholarPfNo)
          this.login = 'login';
        } else {
          this.error = 'Invalid PF/SCH Code';
          console.log('ErrorMSG', this.error);
        }
      },
      error: (error) => {
        this.error =
          error.error.message || 'Error occurred during PF submission.';
        console.log('Errormsg', this.error);
      },
      complete: () => {},
    });
  }
 
}
