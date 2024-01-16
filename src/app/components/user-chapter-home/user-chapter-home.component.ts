import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-chapter-home',
  templateUrl: './user-chapter-home.component.html',
  styleUrls: ['./user-chapter-home.component.scss'],
})
export class UserChapterHomeComponent {
  constructor(
    private route: ActivatedRoute,

    public dialog: MatDialog
  ) {}

  chapterId!: string;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.chapterId = id;
    } else {
      // Handle the case when the id is null
    }
    console.log('chapter id: ', typeof this.chapterId);
  }
}
