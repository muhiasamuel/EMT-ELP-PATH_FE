import { Component, Inject } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-deleterole-form',
  templateUrl: './admin-deleterole-form.component.html',
  styleUrls: ['./admin-deleterole-form.component.scss'],
})
export class AdminDeleteroleFormComponent {
  constructor(
    private http: HttpServiceService,
    public dialogRef: MatDialogRef<AdminDeleteroleFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    console.log('roles id', this.data.data);
  }

  // method to delete a role
  deleteRole() {
    const url = this.http.serverUrl + `roles/${this.data.data}/delete`;
    this.http.deleteData(url).subscribe({
      next: (res) => {
        console.log(res);
        this.dialogRef.close();
      },
    });
  }
}
