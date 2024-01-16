import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { countries } from 'src/assets/json_files/countries';

@Component({
  selector: 'app-more-people',
  templateUrl: './more-people.component.html',
  styleUrls: ['./more-people.component.scss'],
})
export class MorePeopleComponent {
  filterPeople!: FormGroup;

  scholarCategory: any[] = [
    { value: 'All', viewValue: 'All' },
    { value: 'ELP', viewValue: 'ELP' },
    { value: 'W2F', viewValue: 'W2F' },
    { value: 'W2F & ELP', viewValue: 'W2F & ELP' },
    { value: 'Elimu', viewValue: 'Elimu' },
    { value: 'Elimu & ELP', viewValue: 'Elimu & ELP' },
    { value: 'Elimu & TVET', viewValue: 'Elimu & TVET' },
    { value: 'W2F & TVET', viewValue: 'W2F & TVET' },
    { value: 'TVET', viewValue: 'TVET' },
  ];

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
      this.userId = parsedData.id;
    }

    this.getPeopleProfileUrl = this.http.serverUrl + 'profile/people-i-know/'+this.userId;

    // ====================================get method=======================================

    this.http.getData(this.getPeopleProfileUrl).subscribe({
      next: (response) => {
        console.log(response);


        this.PeopleProfileData = response.payload
          .map((item: any) => {
            if (userData) {
              const parsedData = JSON.parse(userData);
              let userDataId = parsedData.id;
              if (userDataId !== item.userId) {
                return {
                  title: item.scholarName,
                  imageUrl: item.profileImage !== null ? item.profileImage : null,
                  branch: item.branch,
                  school: item.school,
                  userId: item.userid,
                };
              }
            }
            // Return null when conditions aren't met
            return null;
          })
          .filter((item: any) => item !== null);
        console.log(this.PeopleProfileData);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });

    // ============================================================================
  }
}
