// mission.model.ts

import { Controller } from './controleur';
import { Intervenant } from './intervenant';
import { Equipement } from './equipement';
import { Notification } from './notification';

export class Mission {
  constructor(
    public _id: string, // si vous avez besoin d'identifiants MongoDB
    public name: string,
    public objectif: string,
    public adresse: string,
    public datedebut: Date,
    public typemission: string,
    public controllers: Controller[],
    public intervenants: Intervenant[],
    public equipements: { equipementId: string, quantiteUtilisee: number }[] // Tableau d'objets d'équipements avec ID et quantité
    ) {}
}
