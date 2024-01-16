import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-admin-scholargender-graph',
  templateUrl: './admin-scholargender-graph.component.html',
  styleUrls: ['./admin-scholargender-graph.component.scss'],
})
export class AdminScholargenderGraphComponent implements OnInit {
  private chart: any;

  constructor(private http: HttpServiceService) {}

  urlGetScholarsData!: string;
  genderStats!: any;
  yearsList: string[] = [];
  maleData: number[]  = [];
  femaleData: number[] = [];

  ngOnInit() {
    this.getGenderStats();
  }

  setupChart() {
    const ctx = document.getElementById('gender') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.yearsList,
        datasets: [
          {
            label: 'Female',
            data: this.femaleData.map((count) => count === null ? 0 : count),
            borderColor: '#041014',

            // fill: false,
          },
          {
            label: 'Male',
            data: this.maleData,
            borderColor: '#a32a29',

            // fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  private setupDefaultChart(): void {
    const ctx = document.getElementById('gender') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Year 1', 'Year 2'],
        datasets: [
          {
            label: 'Total Males',
            data: [0, 0],
            backgroundColor: '#a32a29',
            borderColor: '#a32a29',
            fill: false,
          },
          {
            label: 'Total Females',
            data: [0, 0],
            backgroundColor: '#041014',
            borderColor: '#041014',
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  getGenderStats() {
    this.urlGetScholarsData = this.http.serverUrl + 'scholars/gender-stats';
    this.http.getData(this.urlGetScholarsData).subscribe({
      next: (response: any) => {
        const maleYears = response.payload.male.map((item: any) => item.year);
        const femaleYears = response.payload.male.map((item: any) => item.year);
        this.yearsList = Array.from(new Set([...maleYears, ...femaleYears]));

        this.maleData = this.yearsList.map((year) => response.payload.male.find((item: any) => item.year === year)?.count || 0);
        this.femaleData = this.yearsList.map((year) => response.payload.female.find((item: any) => item.year === year)?.count || 0);

        this.setupChart();
      },
      error: (error: any) => {},
      complete: () => {}
    })
  }
}
