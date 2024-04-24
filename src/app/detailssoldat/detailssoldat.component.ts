import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { Intervenant } from 'src/app/Models/intervenant';
import { IntervenantService } from 'src/app/Services/intervenant.service';

@Component({
  selector: 'app-detailssoldat',
  templateUrl: './detailssoldat.component.html',
  styleUrls: ['./detailssoldat.component.css']
})
export class DetailssoldatComponent implements OnInit{
  intervenants!: Intervenant; // Définir intervenants comme un seul objet Intervenant plutôt qu'un tableau d'objets
  soldatId!: string;
  constructor(
    private http: HttpClient,
    private intervenantservice:IntervenantService ,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.renderChart();
    this.intervenantservice.getAllintervenat().subscribe(data => {
      this.intervenants = data;
    });
    this.route.params.subscribe(params => {
      this.soldatId = params['id'];
      this.intervenantservice.getIntervenantById(this.soldatId).subscribe(
        data => {
          this.intervenants = data;
          console.log(this.intervenants.image)
        },
        error => {
          console.error(error);
          // Gérer l'erreur ici
        }
      );
    });

  }

  renderChart(): void {
    const data = {
      labels: ['2018', '2019', '2020', '2021','2022'], // Modifier avec les années pertinentes
      datasets: [{
        label: 'Participations en mission par année',
        data: [5, 10, 15,10,12], // Modifier avec les données réelles
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)'
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
          text: 'Participations en mission par année'
        }
      }
    };

    const ctx = document.getElementById('missionParticipationChart') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'pie',
      data: data,

    });
  }
}
