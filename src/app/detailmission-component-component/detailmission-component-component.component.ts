import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-detailmission-component-component',
  templateUrl: './detailmission-component-component.component.html',
  styleUrls: ['./detailmission-component-component.component.css']
})
export class DetailmissionComponentComponentComponent implements OnInit {
  @ViewChild('missionSuccessFailureChart') missionChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('equipement') equipmentChartRef!: ElementRef<HTMLCanvasElement>;

  constructor() { }

  ngOnInit(): void {
    this.renderChart();
    this.createEquipmentChart();
  }


  renderChart(): void {
    const successRate = 80; // Taux de réussite (en pourcentage)
    const failureRate = 100 - successRate; // Calcul du taux d'échec

    const data = {
      labels: ['Taux de réussite', 'Taux d\'échec'],
      datasets: [{
        data: [successRate, failureRate],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }]
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Taux de réussite et d\'échec de la mission'
        }
      }
    };

    const ctx = document.getElementById('missionSuccessFailureChart') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'pie',
      data: data,
    });
  }

  createEquipmentChart(): void {
    const data = {
      labels: ['GPS', 'Caméra', 'Montre connectée', 'AR'], // Modifier avec les années pertinentes
      datasets: [{
        label: "Nombre d'équipement utilisée",
        data: [10, 3, 10, 20], // Modifier avec les données réelles
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          '#4BC0C0'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
      }]
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: "Nombre d'équipement utilisée"
        }
      }
    };

    const ctx = document.getElementById('equipement') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'pie',
      data: data,
    });

}

}
