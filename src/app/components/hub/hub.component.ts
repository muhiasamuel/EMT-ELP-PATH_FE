import { Component } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { Observable, map, forkJoin, catchError } from 'rxjs';
import { of } from 'rxjs';

@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.scss'],
})
export class HubComponent {
  // Constructor to inject the HttpServiceService
  constructor(public http: HttpServiceService) {}

  // Array to store chapter data
  hubData: any[] = [];

  // Initialization function called when the component is initialized
  ngOnInit() {
    // Fetch all chapters and chapter members on component initialization
    this.getAllHubs();
    this.getHubMembers('1').subscribe({
      next: (hub) => {
        console.log('hubMembers', hub);
      },
    });
  }

  // Function to fetch all chapters
  getAllHubs() {
    const getHubsUrl = this.http.serverUrl + 'hubs/all';
    this.http.getData(getHubsUrl).subscribe({
      next: (response) => {
        // Map each chapter response to a chapter member Observable
        const hubObservables = response.payload.map((item: any) => {
          return this.getHubMembers(item.id).pipe(
            map((hubMember) => {
              const userData = localStorage.getItem('userData');

              // Check if the user is a member of the chapter
              if (userData) {
                const parsedData = JSON.parse(userData);
                let userDataId = parsedData.id;

                if (hubMember.includes(userDataId)) {
                  return {
                    // Construct chapter data with user as a member
                    hubName: item.hubName,
                    hubDescription: item.hubDescription,
                    imageUrl: item.hubImage !== null ? item.hubImage : null,
                    hubId: item.id.toString(),
                    hubMember: 'yes',
                  };
                }
              }

              // Construct chapter data with user not as a member
              return {
                hubName: item.hubName,
                hubDescription: item.hubDescription,
                imageUrl: item.hubImage !== null ? item.hubImage : null,

                hubId: item.id.toString(),
                hubMember: 'no',
              };
            })
          );
        });

        // Combine chapter member observables and handle their responses
        forkJoin(hubObservables).subscribe((feedsWithUserImages: any) => {
          this.hubData = feedsWithUserImages;
          console.log(this.hubData);
        });
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
  }

  // Function to fetch chapter members for a given chapterId
  getHubMembers(hubId: string): Observable<any> {
    const getHubMembersUrl =
      this.http.serverUrl + 'hubs/' + hubId + '/display-hub-members';
    // Fetch chapter members and map response to an array of member IDs
    return this.http.getData(getHubMembersUrl).pipe(
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
  joinHub(hubId: string) {
    const userData = localStorage.getItem('userData');

    // Check if the user is a member of the chapter
    if (userData) {
      const parsedData = JSON.parse(userData);
      let userDataId = parsedData.id;
      const urlLink =
        this.http.serverUrl + 'hubs/' + userDataId + '/' + hubId + '/join';

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

  leaveHub(hubId: string) {
    const userData = localStorage.getItem('userData');

    // Check if the user is a member of the chapter
    if (userData) {
      const parsedData = JSON.parse(userData);
      let userDataId = parsedData.id;
      const urlLink =
        this.http.serverUrl + 'v2/hubs/' + userDataId + '/' + hubId + '/leave';
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
