import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-admin-elps-graph',
  templateUrl: './admin-elps-graph.component.html',
  styleUrls: ['./admin-elps-graph.component.scss'],
})
export class AdminElpsGraphComponent {
  private chart: any;

  ngOnInit() {
    this.setupChart();
  }

  private setupChart(): void {
    // Sample data for the chart (replace this with your actual data)

    const ctx = document.getElementById('elps') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [
          '2001',
          '2002',
          '2003',
          '2004',
          '2005',
          '2006',
          '2007',
          '2008',
        ],
        datasets: [
          {
            label: 'Number of Elps',
            data: ['10', '15', '50', '5', '100', '60', '20', '120'],
            backgroundColor: ['#fff'],
            borderColor: ['#01b8ff'],
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
            ticks: {
              stepSize: 10,
            },
          },
        },
      },
    });
  }
}
