import { Component, OnInit } from '@angular/core';
import { UserEmailService } from 'src/app/services/user-email.service';
import { OtpFormComponent } from '../otp-form/otp-form.component';
import { OtpService } from 'src/app/services/otp.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
// import { UserLoginComponent } from '../user-login/user-login.component';


@Component({
  selector: 'app-otp-verification-form',
  templateUrl: './otp-verification-form.component.html',
  styleUrls: ['./otp-verification-form.component.scss']
})
export class OtpVerificationFormComponent implements OnInit {
   
  currentUser: any = this.userEmailService.getCurrentUser();
  contact: any = {}; // Replace with the actual user ID
  generatedOTP!: string;

  constructor(
    public dialog: MatDialog,
    public otpService: OtpService,
    private userEmailService: UserEmailService
  ) {}

  ngOnInit() {
    this.getData(); // Assuming you want to get data when the component initializes
    this.generateOTP();
   
  }

  getData(): void {
    this.userEmailService.getUserData(this.currentUser.id).subscribe({
      next: (res) => {
        this.contact = res.payload;
        console.log(res);
      },
      error: (err) => {
        console.error("user not found", err)
      }
    });
  }

  generateOTP() {
    const { email, phone } = this.contact;
    this.otpService.generateOTP(email, phone).subscribe((response: any) => {
      this.generatedOTP = response.otp; 
    });
  }

  otpformDialog(): void {
    this.generateOTP() //generate OTP before opening the dialog
    // Open the dialog using the MatDialog service
    const dialogue: MatDialogRef<OtpFormComponent> = this.dialog.open(OtpFormComponent, {
      width: '45%',  // Set the width of the dialog
      // data: { data: this.userId }, // You can pass data to the dialog component using the `data` property
    });

    // Handle the dialog result (if needed)
    dialogue.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }
}
