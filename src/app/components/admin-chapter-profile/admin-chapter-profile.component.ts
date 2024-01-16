import { Component, Input } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
@Component({
  selector: 'app-admin-chapter-profile',
  templateUrl: './admin-chapter-profile.component.html',
  styleUrls: ['./admin-chapter-profile.component.scss'],
})
export class AdminChapterProfileComponent {
  constructor(public http: HttpServiceService) {}
  @Input() chapterid!: string;

  countMembers!: number;
  chapterData!: any;
  chapterDescription!: string;
  chapterName!: string;
  chapterId!: string;

  imageUrl!: string;
  ngOnInit() {
    this.getChapter();
  }

  // method to get chapter details
  getChapter() {
    const getChapterUrl =
      this.http.serverUrl + 'v2/hubs/' + this.chapterid + '/view';

    this.http.getData(getChapterUrl).subscribe({
      next: (response) => {
        this.chapterData = response.payload;
        console.log('chapter info', typeof this.chapterData);
        this.imageUrl = response.payload.chapterImage;

        this.chapterDescription = response.chapterDescription;
        this.chapterName = response.payload.chapterName;

        this.getChapterMembers();
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
  }
  // method to get chapter members
  getChapterMembers() {
    const getChapterMembers =
      this.http.serverUrl +
      'v2/hubs/' +
      this.chapterid +
      '/display-hub-members';
    this.http.getData(getChapterMembers).subscribe({
      next: (response) => {
        console.log('members', response.length);
        this.countMembers = response.payload.length;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
  }
}
