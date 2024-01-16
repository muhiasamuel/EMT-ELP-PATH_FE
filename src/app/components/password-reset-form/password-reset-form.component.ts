import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-password-reset-form',
  templateUrl: './password-reset-form.component.html',
  styleUrls: ['./password-reset-form.component.scss'],
})
export class PasswordResetFormComponent {
  constructor(
    private route: ActivatedRoute,
    private http: HttpServiceService
  ) {}
  token = this.route.snapshot.paramMap.get('token');
  newpassword!: string;
  ngOnInit() {
    console.log('Token', this.token);
  }

  submit() {
    const url =
      this.http.serverUrl +
      `reset-password/reset?token=${this.token}&newPassword=${this.newpassword}`;
    console.log('URL', url);
    this.http.postNoData(url).subscribe({
      next: (res) => {
        console.log('Response', res);
      },
      error: (error) => {
        console.error('Error', error);
      },
    });
  }
}
