import { Component, Inject } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-delete-form',
  templateUrl: './admin-delete-form.component.html',
  styleUrls: ['./admin-delete-form.component.scss'],
})
export class AdminDeleteFormComponent {
  constructor(
    private http: HttpServiceService,
    public dialogRef: MatDialogRef<AdminDeleteFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    console.log('admin id', this.data.data);
  }

  // method to delete a role
  deleteRole() {
    const url = this.http.serverUrl + `users/${this.data.data}/delete`;
    this.http.deleteData(url).subscribe({
      next: (res) => {
        console.log(res);
        this.dialogRef.close();
      },
    });
  }
}
