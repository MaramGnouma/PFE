import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { MissioncoursComponent } from './missioncours/missioncours.component';
import { SoldatsComponent } from './soldats/soldats.component';
import { ListemissiontermineesComponentComponentComponent } from './listemissionterminees-component-component/listemissionterminees-component-component.component';
import { DetailmissionComponentComponentComponent } from './detailmission-component-component/detailmission-component-component.component';

const routes: Routes = [
  { path: '', redirectTo: 'dash', pathMatch: 'full' }, // Redirection vers la route 'menu' si le chemin est vide
  { path: 'dash', component: DashboardComponent ,data: { title: 'Dashboard' }},
  { path: 'menu', component: MenuComponent  ,data: { title: 'Dashboard' }},
  { path: 'missioncour', component: MissioncoursComponent ,data: { title: 'Mission en cours' } },
  { path: 'soldats', component: SoldatsComponent ,data: { title: 'Soldats' } },
  { path: 'detailssoldat/:id', component: DetailmissionComponentComponentComponent } ,// Définition de la route pour les détails du soldat avec un paramètre d'itinéraire pour l'ID
  { path: 'missionterminees', component: ListemissiontermineesComponentComponentComponent ,data: { title: 'Mission Terminées' } },
  { path: 'detailsmission', component: DetailmissionComponentComponentComponent ,data: { title: 'Détails Mission' } },
  { path: 'sign', component: SignupComponent ,data: { title: 'Détails Soldat' }  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
