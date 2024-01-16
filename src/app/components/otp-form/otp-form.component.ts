import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { OtpService } from 'src/app/services/otp.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-otp-form',
  templateUrl: './otp-form.component.html',
  styleUrls: ['./otp-form.component.scss'],
})
export class OtpFormComponent implements OnInit {
  url: string = this.urlService.serverUrl;
  generatedOTP!: string;
  enteredOTP!: string;
  isOTPValid!: boolean;
  loading = false;

  additionalRegForm!: FormGroup;
  pfForm!: FormGroup;
  data: any;
  register!: string;
  login!: string;

  constructor(
    public http: HttpClient,
    private urlService: HttpServiceService,
    private otpservice: OtpService,
    private fb: FormBuilder,
    public  httpservice:HttpServiceService
  ) {}

  ngOnInit() {
    this.additionalRegForm = this.fb.group({
    
      userName: ['', Validators.required],
      userEmail: ['', [Validators.email, Validators.required]],
      userPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      data: [''],
      isChecked: ['', Validators.required],
    });

    this.pfForm = this.fb.group({
      pfNo: ['', [Validators.required]],
    });
  }


  generateOTP() {
    this.http.post(this.url + 'generate-otp', {}).subscribe((response: any) => {
      this.generatedOTP = response.otp;
    });
  }

  validateOTP() {
    this.http.post(this.url + 'verify-otp', { otp: this.enteredOTP }).subscribe((response: any) => {
      this.isOTPValid = response.isValid;
    });
  }
}
