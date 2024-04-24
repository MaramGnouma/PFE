import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Intervenant } from 'src/app/Models/intervenant';
import { IntervenantService } from 'src/app/Services/intervenant.service';

@Component({
  selector: 'app-soldats',
  templateUrl: './soldats.component.html',
  styleUrls: ['./soldats.component.css']
})
export class SoldatsComponent implements OnInit {
  intervenants!: Intervenant[];
  intervenantsChunked: any[][] = [];

  constructor(
    private http: HttpClient,
    private intervenantservice:IntervenantService ,
  ){}
  ngOnInit(): void {

    this.intervenantservice.getAllintervenat().subscribe(
      (data: Intervenant[]) => { // Assurez-vous de typer 'data' comme un tableau d'objets Soldat
        this.intervenants = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des données des soldats :', error);
      }
    );
  }

  }



