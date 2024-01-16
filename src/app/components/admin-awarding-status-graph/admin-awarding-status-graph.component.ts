import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { HttpServiceService } from 'src/app/services/http-service.service';
@Component({
  selector: 'app-admin-awarding-status-graph',
  templateUrl: './admin-awarding-status-graph.component.html',
  styleUrls: ['./admin-awarding-status-graph.component.scss'],
})
export class AdminAwardingStatusGraphComponent {
  private chart: any;
  urlGetApplicationCount!: string;
  applicationCountData: any;
  labelList: string[] = [];
  totalCountList: string[] = [];

  constructor(private http: HttpServiceService) {}

  ngOnInit() {
    this.totalNotAwarded();
  }

  //===============================TOTAL NOT AWARDED =============================
  totalNotAwarded() {
    const url =
      this.http.serverUrl + 'applications/count-not-awarded-applications';
    this.http.getData(url).subscribe({
      next: (response) => {
        this.totalCountList.push(response.toString());
        this.labelList.push('Not Awarded Students');
        console.log(this.totalCountList);
        this.totalAwarded();
      },
      error: (error) => {
        console.log('Error:', error);
        // Handle the error here
        this.totalAwarded();
      },
      complete: () => {},
    });
  }

  //========================================TOTAL AWARDED ==================================================
  totalAwarded() {
    const url = this.http.serverUrl + 'applications/count-awarded-applications';
    this.http.getData(url).subscribe({
      next: (response) => {
        this.totalCountList.push(response.toString());
        this.labelList.push('Awarded Students');
        this.totalAwaiting();
      },
      error: (error) => {
        console.log('Error:', error);
        // Handle the error here
        this.totalAwaiting();
      },
      complete: () => {},
    });
  }

  //========================================TOTAL AWARDED ==================================================
  totalAwaiting() {
    const url =
      this.http.serverUrl + 'applications/count-awaiting-applications';
    this.http.getData(url).subscribe({
      next: (response) => {
        this.totalCountList.push(response.toString());
        this.labelList.push('Awaiting Students');
        this.setupChart(this.labelList, this.totalCountList);
      },
      error: (error) => {
        console.log('Error:', error);
        // Handle the error here
        this.setupChart(this.labelList, this.totalCountList);
      },
      complete: () => {},
    });
  }

  // method to set up chart data and configuration========================================================
  private setupChart(labelList: string[], totalCountList: string[]): void {
    // data for the chart

    const ctx = document.getElementById('status') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labelList,
        datasets: [
          {
            data: totalCountList,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
  //=====================================end of method functions============================================
}
