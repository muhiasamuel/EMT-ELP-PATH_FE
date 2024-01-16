import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { HttpServiceService } from 'src/app/services/http-service.service';
@Component({
  selector: 'app-admin-applications-graph',
  templateUrl: './admin-applications-graph.component.html',
  styleUrls: ['./admin-applications-graph.component.scss'],
})
export class AdminApplicationsGraphComponent {
  private chart: any;
  urlGetApplicationCount!: string;
  applicationCountData: any;
  yearList: string[] = [];
  totalCountList: string[] = [];

  constructor(private http: HttpServiceService) {}

  ngOnInit() {
    //============url to get applications data =================
    this.urlGetApplicationCount =
      this.http.serverUrl + 'scholars/display-scholars';

    //=============================get application data from the server===========
    this.http.getData(this.urlGetApplicationCount).subscribe({
      next: (response) => {
        this.applicationCountData = response;
        this.loopThroughObject(response);
        console.log('ScholarData', this.applicationCountData);
        this.setupChart(this.yearList, this.totalCountList);
      },
      error: (error) => {
        console.log('Error:', error);
        // Handle the error here
      },
      complete: () => {},
    });
  }
  //======================method to loop through an object item objects key and value to a list===============

  // Method to loop through object properties and extract year and counts
  loopThroughObject(response: any) {
    for (const year in this.applicationCountData) {
      if (this.applicationCountData.hasOwnProperty(year)) {
        // Assuming the year is a string representing a year
        this.yearList.push(year);
        this.totalCountList.push(this.applicationCountData[year]);
      }
    }
  }

  //  configuration========================================================
  private setupChart(yearList: string[], totalCountList: string[]): void {
    // data for the chart

    const ctx = document.getElementById('applications') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: yearList,
        datasets: [
          {
            label: 'Number of Scholars',
            data: totalCountList,
            backgroundColor: ['#fff'],
            borderColor: ['#19b159'],
            tension: 0.35,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            display: true,
          },
          y: {
            display: true,
            beginAtZero: true,
          },
        },
      },
    });
  }
  //=====================================end of method functions=============================================
}
