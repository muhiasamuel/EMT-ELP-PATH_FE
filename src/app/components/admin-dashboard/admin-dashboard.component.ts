import { Component, NgModule, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ScholarsCardComponent } from '../scholars-card/scholars-card.component';
import { DashboardDataService } from 'src/app/dashboard-data.service';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from 'src/app/services/http-service.service';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})

export class AdminDashboardComponent {
  @ViewChild(ScholarsCardComponent)
  totalscholars!: ScholarsCardComponent;
  url: any;
  country: string = '';
  region: string = '';
  cluster: string = '';
  branches: string = '';
  gender: string = '';
  urlGetBranches!: any;
  branchOptions!: any;
  urlGetCluster!: any;
  clusterOptions!: any;
 

  filterstatus: boolean = false;
  scholarStats: any;
  totalSum: any;
  allTime: boolean = true;
  year: string = "2022";

  constructor(
    private dashboardData: DashboardDataService,
    private http: HttpServiceService
  ) {}
  ngOnInit() {
    this.getBranches();
    this.getClusters;
    this.getData()
  }

  filterToggle() {
    this.filterstatus = !this.filterstatus;
  }

  applyFilter() {
    this.dashboardData
      .fetchDataWithFilters(
        this.country,
        this.region,
        this.cluster,
        this.branches,
        this.gender
      )
      .subscribe((data) => {
        // Update cards and graphs with new data
      });
    //   this.totalscholars.ngOnInit(
    //     this.country,
    //     this.region,
    //     this.cluster,
    //     this.gender
    //   );
  }
  getBranches() {
    this.urlGetBranches = this.http.serverUrl + 'branch/all'; // URL to fetch insitiutuion data
    this.http.getData(this.urlGetBranches).subscribe({
      next: (response) => {
        this.branchOptions = response; // Set Branch options array
      },
      error: (error) => {
        console.log('Error:', error);
      },
      complete: () => {},
    });
  }

  getClusters() {
    // Set the URL to fetch cluster data
    this.urlGetCluster = this.http.serverUrl + `education/course-clusters/all`;

    // Send an HTTP GET request to fetch cluster data
    this.http.getData(this.urlGetCluster).subscribe({
      next: (response) => {
        // When the request is successful, store the cluster data in the 'clusterOptions' variable
        this.clusterOptions = response.payload;
        console.log('Cluster', this.clusterOptions);
      },
      error: (error) => {
        // Handle and log any errors that occur during the request
        console.log('Error:', error);
      },
      complete: () => {},
    });
  }

getData(){
  this.url =this.http.serverUrl+'scholars/scholar-stats'
   this.http.getData(this.url).subscribe(
    (response: any)=>{
      this.scholarStats = response.payload
      console.log(response)
   
    this.totalSum = response['Male'] + response['Female'];


    let totalscholars = 0;

    // Iterate over the properties of the object and sum their values
    for (const key in response) {
      if (response.hasOwnProperty(key) && typeof response[key] === 'number') {
        totalscholars += response[key];
      }
    }
    },

   )
}


}
