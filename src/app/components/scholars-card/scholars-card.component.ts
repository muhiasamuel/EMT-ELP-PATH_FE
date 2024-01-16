import { Component, Input } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-scholars-card',
  templateUrl: './scholars-card.component.html',
  styleUrls: ['./scholars-card.component.scss'],
})
export class ScholarsCardComponent {
  @Input() country!: string;
  @Input() region!: string;
  @Input() cluster!: string;
  @Input() gender!: string;
  @Input() branch!: string;

  // urlGetWtf!: string;
  // urlGetElp!: string;
  urlGetTotal!: string;
  totalScholar: number = 0;
  totalelps!: number;
  totalWtfs!: number;
  url!: string;
  constructor(private http: HttpServiceService) {}

  ngOnInit() {
    console.log('country', this.country);
    console.log('region', this.region);
    console.log('cluster', this.cluster);
    console.log('gender', this.gender);
    console.log('branch', this.branch);

    this.url = this.http.serverUrl + 'scholars/display-scholars';

    this.http.getData(this.url).subscribe({
      next: (response) => {
        this.totalScholar = response.length;
      },
      error: (error) => {
        console.log('Error:', error);
        // Handle the error here
      },
      complete: () => {},
    });

    // this.urlGetElps = this.http.serverUrl + 'elps/all';

    // get elps students
    // this.http.getData(this.urlGetElps).subscribe({
    //   next: (response) => {
    //     this.totalelps = response.length;
    //     console.log(this.totalelps);
    //     this.totalScholar += this.totalelps;
    //   },
    //   error: (error) => {
    //     console.log('Error:', error);
    // Handle the error here
    //   },
    //   complete: () => {},
    // });
    // get total wtf
    // this.http.getData(this.urlGetWtf).subscribe({
    //   next: (response) => {
    //     this.totalWtfs = response;
    //     console.log(this.totalWtfs);
    //     this.totalScholar += this.totalWtfs;
    //   },
    //   error: (error) => {
    //     console.log('Error:', error);
    // Handle the error here
    //     },
    //     complete: () => {},
    //   });
    // }
    // ngAfterViewInit() {}
  }
}
