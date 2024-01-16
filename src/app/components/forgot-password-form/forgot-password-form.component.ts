import { Component } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.scss'],
})
export class ForgotPasswordFormComponent {
  constructor(
    // private route: ActivatedRoute,
    private http: HttpServiceService,
    private notificationService: NotificationsService
  ) {}
  // token = this.route.snapshot.paramMap.get('token');
  userEmail!: string;
  ngOnInit() {}

  submit() {
    const url =
      this.http.serverUrl +
      `reset-password/request?userEmail=${this.userEmail}`;
    console.log('URL', url);
    this.http.postNoData(url).subscribe({
      next: (res) => {
        console.log('Response', res);
      },
      error: (error) => {
        console.error('Error', error);
        this.notificationService.alertWarning(error.error.message)
      },
    });
  }
}
