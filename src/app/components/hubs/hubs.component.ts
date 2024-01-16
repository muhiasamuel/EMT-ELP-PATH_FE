import { Component } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { Observable, map, forkJoin, catchError } from 'rxjs';
import { of } from 'rxjs';

@Component({
  selector: 'app-hubs',
  templateUrl: './hubs.component.html',
  styleUrls: ['./hubs.component.scss'],
})
export class HubsComponent {
  // Constructor to inject the HttpServiceService
  constructor(public http: HttpServiceService) {}

  // Array to store chapter data
  chapterData: any[] = [];

  // Initialization function called when the component is initialized
  ngOnInit() {
    // Fetch all chapters and chapter members on component initialization
    this.getAllChapters();
    this.getChapterMembers('1').subscribe({
      next: (chapter) => {
        console.log('chapterMembers', chapter);
      },
    });
  }

  // Function to fetch all chapters
  getAllChapters() {
    const getChaptersUrl = this.http.serverUrl + 'v2/chapters/all';
    this.http.getData(getChaptersUrl).subscribe({
      next: (response) => {
        // Map each chapter response to a chapter member Observable
        const chapterObservables = response.payload.map((item: any) => {
          return this.getChapterMembers(item.id).pipe(
            map((chapterMember) => {
              const userData = localStorage.getItem('userData');

              // Check if the user is a member of the chapter
              if (userData) {
                const parsedData = JSON.parse(userData);
                let userDataId = parsedData.id;
                if (chapterMember.includes(userDataId)) {
                  return {
                    // Construct chapter data with user as a member
                    chapterName: item.chapterName,
                    chapterDescription: item.chapterDescription,
                    imageUrl:
                      item.chapterImage !== null ? item.chapterImage : null,
                    chapterType: item.chapterType.chapterTypeName,
                    chapterId: item.id.toString(),
                    chapterMember: 'yes',
                  };
                }
              }

              // Construct chapter data with user not as a member
              return {
                chapterName: item.chapterName,
                chapterDescription: item.chapterDescription,
                imageUrl: item.chapterImage !== null ? item.chapterImage : null,
                chapterType: item.chapterType.chapterTypeName,
                chapterId: item.id.toString(),
                chapterMember: 'no',
              };
            })
          );
        });

        // Combine chapter member observables and handle their responses
        forkJoin(chapterObservables).subscribe((feedsWithUserImages: any) => {
          this.chapterData = feedsWithUserImages;
          console.log(this.chapterData);
        });
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
  }

  // Function to fetch chapter members for a given chapterId
  getChapterMembers(chapterId: string): Observable<any> {
    const getChapterMembersUrl =
      this.http.serverUrl +
      'v2/chapters/' +
      chapterId +
      '/display-chapter-members';

    // Fetch chapter members and map response to an array of member IDs
    return this.http.getData(getChapterMembersUrl).pipe(
      map((response: any) => {
        return response.payload.map((responseData: any) => {
          return responseData.id;
        });
      }),
      catchError((error: any) => {
        return of([]);
      })
    );
  }
  joinChapter(chapterId: string) {
    const userData = localStorage.getItem('userData');

    // Check if the user is a member of the chapter
    if (userData) {
      const parsedData = JSON.parse(userData);
      let userDataId = parsedData.id;
      const urlLink =
        this.http.serverUrl +
        'v2/chapters/' +
        userDataId +
        '/' +
        chapterId +
        '/join';
      //post method
      this.http.postNoData(urlLink).subscribe({
        next: () => {
          // localStorage.setItem('token', JSON.stringify(response));
          console.log('success');
          this.ngOnInit();
        },
        error: (error) => {
          // Handle the error here
          console.log(error);
        },
        complete: () => {},
      });
    }
  }

  leaveChapter(chapterId: string) {
    const userData = localStorage.getItem('userData');

    // Check if the user is a member of the chapter
    if (userData) {
      const parsedData = JSON.parse(userData);
      let userDataId = parsedData.id;
      const urlLink =
        this.http.serverUrl +
        'v2/chapters/' +
        userDataId +
        '/' +
        chapterId +
        '/leave';
      //post method
      this.http.postNoData(urlLink).subscribe({
        next: () => {
          // localStorage.setItem('token', JSON.stringify(response));
          console.log('success');
          this.ngOnInit();
        },
        error: (error) => {
          // Handle the error here
          console.log(error);
        },
        complete: () => {},
      });
    }
  }
}
