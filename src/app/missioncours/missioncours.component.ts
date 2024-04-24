import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ChartType, Chart } from 'chart.js/auto';
import * as L from 'leaflet';

// Importez les échelles nécessaires
import { LinearScale, CategoryScale } from 'chart.js';

// Enregistrez les échelles dans Chart.js
Chart.register(LinearScale, CategoryScale);

@Component({
  selector: 'app-missioncours',
  templateUrl: './missioncours.component.html',
  styleUrls: ['./missioncours.component.css']
})
export class MissioncoursComponent implements OnInit {
  @ViewChild('heartRateChart') chartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('heartRateChart2') chartRef2!: ElementRef<HTMLCanvasElement>;
  @ViewChild('heartRateChart3') chartRef3!: ElementRef<HTMLCanvasElement>;

  heartRateChart: any;

  private centroid: L.LatLngExpression = [36.8065, 10.1815]
  map2!: L.Map;

  constructor(@Inject(PLATFORM_ID) private platformId: any, private http: HttpClient) {}

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.initializeChart();
    this.initMap();


}
initMap(): void {
  // Check if the map is already initialized
  if (!this.map2) {
    // Initialize the map only if it hasn't been initialized yet
    this.map2 = L.map('map2').setView([36.8065, 10.1815], 13);

    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map2);

    const marker = L.marker([36.8065, 10.1815]).addTo(this.map2)
      .bindPopup('<b>Tunis</b><br />').openPopup();
  }
}



initializeChart(): void {
  if (this.chartRef && this.chartRef.nativeElement && this.chartRef2 && this.chartRef2.nativeElement && this.chartRef3 && this.chartRef3.nativeElement) {
    const ctx1 = this.chartRef.nativeElement.getContext('2d');
    const ctx2 = this.chartRef2.nativeElement.getContext('2d');
    const ctx3 = this.chartRef3.nativeElement.getContext('2d');

    if (ctx1 && ctx2 && ctx3) {
      const labels = ['1', '2', '3', '4', '5']; // Sample labels
      const heartRateData = [65, 59, 80, 81, 56];
      const bloodPressureData = [120, 130, 125, 135, 140];
      const oxygenLevelData = [95, 98, 97, 96, 94];

      const chartOptions = {
        type: 'line' as ChartType, // Type assertion to specify the chart type
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Heart Rate',
              data: heartRateData,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
              fill: false
            },
            {
              label: 'Blood Pressure',
              data: bloodPressureData,
              borderColor: 'rgb(255, 99, 132)',
              tension: 0.1,
              fill: false
            },
            {
              label: 'Oxygen Level',
              data: oxygenLevelData,
              borderColor: 'rgb(54, 162, 235)',
              tension: 0.1,
              fill: false
            }
          ]
        },
        options: {
          scales: {
            y: {
              title: {
                display: true,
                text: 'Value'
              },
              suggestedMin: 50,
              suggestedMax: 180,
              beginAtZero: false
            },
            x: {
              title: {
                display: true,
                text: 'Hour'
              }
            }
          }
        }
      };

      // Create a single instance of Chart
      this.heartRateChart = new Chart(ctx1, chartOptions);
      // Apply the same instance to other canvases
      new Chart(ctx2, chartOptions);
      new Chart(ctx3, chartOptions);
    }
  } else {
    console.error('Chart reference is not available yet.');
  }
}
}

