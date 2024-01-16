import { ParsedEvent } from '@angular/compiler';
import { Component } from '@angular/core';
import { count } from 'rxjs';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-more-people-card',
  templateUrl: './more-people-card.component.html',
  styleUrls: ['./more-people-card.component.scss'],
})
export class MorePeopleCardComponent {
  constructor(public http: HttpServiceService) {}

  PeopleProfileData: any[] = [];
  getPeopleProfileUrl!: string;
  userId: any;
  ngOnInit() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.getPeopleProfile();
    }
  }

  // method to get PeopleProfile by chapter id or all PeopleProfile
  getPeopleProfile() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      this.userId = parsedData.id
    }
    this.getPeopleProfileUrl = this.http.serverUrl + 'profile/people-i-know/'+this.userId;

    // ====================================get method=======================================

    this.http.getData(this.getPeopleProfileUrl).subscribe({
      next: (response) => {
        console.log(response);
        let count = 0;

        this.PeopleProfileData = response.payload

       
          .map((item: any) => {
            console.log('count', count);
            const userData = localStorage.getItem('userData');
            if (userData) {
              const parsedData = JSON.parse(userData);
              let userDataId = parsedData.id;
              if (userDataId !== item.userId) {
                count++;
                if (count <= 6) {
                  return {
                    title: item.scholarName,
                    imageUrl:
                      item.profileImage !== null ? item.profileImage : null,
                    branch: item.branchName,
                    school: item.school,
                    userId: item.userId,
                  };
                }
              }
            }
            // Return null when conditions aren't met
            return null;
          })
          .filter((item: any) => item !== null);
        // console.log(this.PeopleProfileData);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });

    // ============================================================================
  }
}


// import { Component } from '@angular/core';
// import { HttpServiceService } from 'src/app/services/http-service.service';
// import { Observable, catchError, forkJoin } from 'rxjs';
// import { useAnimation } from '@angular/animations';

// @Component({
//   selector: 'app-more-people-card',
//   templateUrl: './more-people-card.component.html',
//   styleUrls: ['./more-people-card.component.scss'],
// })
// export class MorePeopleCardComponent {
//   idsData: any;
//   constructor(public http: HttpServiceService) {}
//   specificUserDataUrl: any;
//   PeopleProfileData: any[] = [];
//   getPeopleProfileUrl!: string;

//   ngOnInit() {
//     const userData = localStorage.getItem('userData');
//     if (userData) {
//       this.getPeopleProfile();
//     }
//   }

//   getPeopleProfile(): any {
//     this.getPeopleProfileUrl = this.http.serverUrl + 'profile/all';

//     this.http.getData(this.getPeopleProfileUrl).subscribe(
//       (allData: any) => {
//         console.log('profile/all', allData.payload)
//         const userIds = allData.payload.map((item: any) => item.id);
//         console.log('users ids', userIds);
//         this.idsData=userIds
//         // Use forkJoin to combine all requests into one observable
//         // const userRequests = userIds.forEach((userId: any) => {
//         //   const specificUserDataUrl = `${this.http.serverUrl}/privacy/${userId}/view`;
//         //   return this.http.getData(specificUserDataUrl);
//         // });
//       const requests: Observable<any>[] = [];
//        userIds.forEach( (item: any)=>{
//           requests.push(
//             this.http.getData(`http://52.15.152.26:5555/privacy/${item}/view`).pipe(
//               catchError((error: any)=> {

//                 if(error.status === 404){
//                   return [error.error]
//                 }
//                 throw error

//               }
//               )
//             )
//           )

//         }

//         );
  

//         console.log('users urls', requests)

//         // Use forkJoin to wait for all specific user data requests to complete
//         forkJoin(requests).subscribe({
//           next: (responses: any) => {
//             // console.log('users ids data', responses)
           
//             responses.forEach((response: any) => {
//               let count = 0;
              
//               console.log('users ids data', response.payload)
              
//               this.PeopleProfileData= response.payload.map((item: any) => {
//                   console.log('count', count);
//                   const userData = localStorage.getItem('userData');
//                   console.log('users ids data urls', userData)
            
//                   if (userData) {
//                     const parsedData = JSON.parse(userData);
//                     let userDataId = parsedData.id;
            
//                     if (!userIds.some((item: any) => item === userDataId)) {
//                       count++;
//                       // console.log('users ids data urls', userIds)
//                       if (count <= 4) {
//                         console.log('users ids data urls', response.payload)
//                         return {
                    
//                           title: item.title,
//                           imageUrl: item.profileImage !== null ? item.profileImage : null,
//                           firstName: item.firstName,
//                           lastName: item.lastName,
//                           userId: item.profileId,
//                         };
//                       }
//                     }
//                   }
//                   // Return null when conditions aren't met
//                   return null;
//                 })
//                 .filter((item: any) => item !== null);

//               // Concatenate the specificUserData arrays for each user
             

//               console.log('response-people', this.PeopleProfileData);
//             });
//           },
//           error: (error:any) => {
//             console.log('no data', error);
//           },
//           complete: () => {},
//         });
//       }
//     );
//   }
// }
