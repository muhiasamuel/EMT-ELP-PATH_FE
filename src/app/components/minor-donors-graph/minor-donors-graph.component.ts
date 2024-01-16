import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-minor-donors-graph',
  standalone: true,
  imports: [],
  templateUrl: './minor-donors-graph.component.html',
  styleUrls: ['./minor-donors-graph.component.scss']
})
export class MinorDonorsGraphComponent {
  private chart: any;

  constructor(private http: HttpServiceService) {}

  urlGetDonorData!: string;
  donorList: string[] = [];
  donorData: number[]  = [];

  ngOnInit() {
    this.getGenderStats();
  }

  setupChart() {
    const ctx = document.getElementById('donors') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.donorList,
        datasets: [
          {
            label: 'Donor',
            data: this.donorData,
            borderColor: '#041014',

            // fill: false,
          }
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
    const ctx = document.getElementById('donors') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Year 1', 'Year 2'],
        datasets: [
          {
            label: 'Donors',
            data: [0, 0],
            backgroundColor: '#a32a29',
            borderColor: '#a32a29',
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
    this.urlGetDonorData = this.http.serverUrl + 'scholars/donor-stats';
    this.http.getData(this.urlGetDonorData).subscribe({
      next: (response: any) => {
        this.donorData = response.payload.minorDonors.map((item: any) => item.count);
        this.donorList = response.payload.minorDonors.map((item: any) => item.donor);

        this.setupChart();
      },
      error: (error: any) => {},
      complete: () => {}
    })
  }
}
