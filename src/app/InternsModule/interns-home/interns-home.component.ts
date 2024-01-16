import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-interns-home',
  templateUrl: './interns-home.component.html',
  styleUrl: './interns-home.component.scss'
})
export class InternsHomeComponent implements OnInit{
myForm!: FormGroup;


constructor(private fb: FormBuilder, private notificationService: NotificationsService, private router: Router){}

ngOnInit(): void {
    this.buildForm();
}

buildForm() {
  this.myForm = this.fb.group({
    fullName: ['', [Validators.required]],
    indexNo: ['', [Validators.required]]
  });
}

onSubmit() {
  if (this.myForm.invalid) {
    this.notificationService.alertSuccess("Info is Valid");
    this.router.navigate(['/intern-details'])
  } else {
    this.notificationService.alertWarning("Form Not valid")
  }
}
}
