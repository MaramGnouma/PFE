import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { ForgetComponent } from './forget/forget.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailmissionComponentComponentComponent } from './detailmission-component-component/detailmission-component-component.component';
import { DetailssoldatComponent } from './detailssoldat/detailssoldat.component';
import { HeaderComponent } from './header/header.component';
import { ListemissiontermineesComponentComponentComponent } from './listemissionterminees-component-component/listemissionterminees-component-component.component';
import { MenuComponent } from './menu/menu.component';
import { MissioncoursComponent } from './missioncours/missioncours.component';
import { SoldatsComponent } from './soldats/soldats.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    ForgetComponent,
    DashboardComponent,
    DetailmissionComponentComponentComponent,
    DetailssoldatComponent,
    HeaderComponent,
    ListemissiontermineesComponentComponentComponent,
    MenuComponent,
    MissioncoursComponent,
    SoldatsComponent,
    AppComponent

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatDatepickerModule,
    MatNativeDateModule,
    MatOptionModule,
    NgbModule,
    MatDialogModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
