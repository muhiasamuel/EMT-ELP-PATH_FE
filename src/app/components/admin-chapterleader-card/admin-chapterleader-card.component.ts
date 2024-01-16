import { Component } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-admin-chapterleader-card',
  templateUrl: './admin-chapterleader-card.component.html',
  styleUrls: ['./admin-chapterleader-card.component.scss'],
})
export class AdminChapterleaderCardComponent {
  url!: string;
  totalChapteradmin!: any;
  constructor(private http: HttpServiceService) {}

  ngOnInit() {
    this.url = this.http.serverUrl + 'countchapteradmin';

    this.http.getData(this.url).subscribe({
      next: (response) => {
        this.totalChapteradmin! = response;

        console.log(this.totalChapteradmin!);
      },
      error: (error) => {
        console.log('Error:', error);
        // Handle the error here
      },
      complete: () => {},
    });
  }
}
