import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PostFormComponent } from '../post-form/post-form.component';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  imageUrl!: string;
  @Output() someChangeEvent = new EventEmitter<void>();

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    const userImageData = localStorage.getItem('userImageData');
    if (userImageData) {
      this.imageUrl = JSON.parse(userImageData);
      // console.log('userImageData', typeof this.imageUrl);
    }
    console.log(localStorage.getItem('userData'));
  }

  openDialog(): void {
    // Open the dialog using the MatDialog service
    const dialogRef: MatDialogRef<PostFormComponent> = this.dialog.open(
      PostFormComponent,
      {
        panelClass: 'dialog-responsive',
        width: '40%', // Set the width of the dialog
        //set the height of the dialog

        data: { name: 'John' }, // You can pass data to the dialog component using the `data` property
      }
    );

    // Handle the dialog result (if needed)
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.someChangeEvent.emit();
    });
  }
}
