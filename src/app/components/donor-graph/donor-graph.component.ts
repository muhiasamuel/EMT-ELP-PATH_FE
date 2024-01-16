import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-donor-graph',
  standalone: true,
  imports: [],
  templateUrl: './donor-graph.component.html',
  styleUrls: ['./donor-graph.component.scss']
})
export class DonorGraphComponent {
  private chart: any;

  constructor(private http: HttpServiceService) {}

  urlGetDonorData!: string;
  donorList: string[] = [];
  donorData: number[]  = [];

  ngOnInit() {
    this.getGenderStats();
  }

  setupChart() {
    const ctx = document.getElementById('expenses') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'line',
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
    const ctx = document.getElementById('expenses') as HTMLCanvasElement;
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
        this.donorData = response.payload.majorDonors.map((item: any) => item.count);
        this.donorList = response.payload.majorDonors.map((item: any) => item.donor);

        this.setupChart();
      },
      error: (error: any) => {},
      complete: () => {}
    })
  }
}
