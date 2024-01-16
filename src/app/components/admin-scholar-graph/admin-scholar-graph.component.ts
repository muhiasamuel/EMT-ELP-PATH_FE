import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { HttpServiceService } from 'src/app/services/http-service.service';
@Component({
  selector: 'app-admin-scholar-graph',
  templateUrl: './admin-scholar-graph.component.html',
  styleUrls: ['./admin-scholar-graph.component.scss'],
})
export class AdminScholarGraphComponent {
  private chart: any;
  urlGetApplicationCount!: string;
  applicationCountData: any;
  labelList: string[] = [];
  totalCountList: string[] = [];
  wtf!: any;

  constructor(private http: HttpServiceService) {}

  ngOnInit() {
    this.getScholars();
    this.retrieveScholarData();
  }

  getScholars() {
    this.http.getData(this.http.serverUrl+'scholars/scholar-stats').subscribe({
      next: (response: any) => {
        this.wtf = response.payload.scholarCount;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {}
    });
  }

  retrieveScholarData() {
    const url = this.http.serverUrl + 'scholars/scholar-stats';

    this.http.getData(url).subscribe({
      next: (response) => {
        this.calculateAndPushData(
          response.payload.localScholars || 0,
          // 'ELP_Pre_University_Intern' ||
          //   'Elimu_Alumni_and_ELP_Pre_University_Intern' ||
          //   'WTF_Alumni_and_ELP_Pre_University_Intern',
          'ELP Scholars'
        );
        this.calculateAndPushData(
          0,
          // 'WTF_Alumni' ||
          //   'WTF_Alumni_and_TVET' ||
          //   'WTF_Alumni_and_ELP_Pre_University_Intern',
          'Wings To Fly Scholars'
        );
        this.calculateAndPushData(
          response.payload.tvetScholars,
          // 'TVET' || 'WTF_Alumni_and_TVET' || 'Elimu_Alumni_and_TVET',
          'TVET Scholars'
        );
        this.calculateAndPushData(
          0,
          // 'Elimu_Alumni' ||
          //   'Elimu_Alumni_and_ELP_Pre_University_Intern' ||
          //   'Elimu_Alumni_and_TVET',
          'Elimu Scholars'
        );

        this.setupChart(this.labelList, this.totalCountList); // Set up chart once data is processed
      },
      error: (error) => {
        console.log('Error:', error);
        // Handle the error here gracefully, perhaps show a user-friendly message
        this.setupChart(this.labelList, this.totalCountList); // Setup chart with available data
      },
      complete: () => {},
    });
  }

  calculateAndPushData(total: any, label: string) {
    this.totalCountList.push(total);
    this.labelList.push(label);
  }

  private setupChart(labelList: string[], totalCountList: string[]): void {
    // data for the chart

    const ctx = document.getElementById('scholars') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labelList,
        datasets: [
          {
            data: totalCountList,
            backgroundColor: ['#2596be', '#be4d25', '#a32a29', '#041014'],
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
