import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  currentUser: any; // Définir le type de l'utilisateur actuel en fonction de votre modèle utilisateur
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private apiKey = 'e65a1c335f3fa7b08d53fef28dc9df1c'; // Replace with your API key
  weatherData: any;
  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: any,
    private http: HttpClient,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
  }
  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((response: any) => {
      const currentUser = response.user;
      console.log(currentUser);
    });

  }
  formatTime(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString();
  }

  getWeather(latitude: number, longitude: number) {
    const params = new HttpParams()
      .set('lat', latitude.toString())
      .set('lon', longitude.toString())
      .set('appid', this.apiKey)
      .set('units', 'metric');

    console.log(params);
    return this.http.get(this.apiUrl, { params });
  }

  getRouteTitle(route: any): string {
    let title = '';
    if (route.data && route.data.title) {
      title = route.data.title;
    }
    if (route.firstChild) {
      title = this.getRouteTitle(route.firstChild);
    }
    return title;
  }

  showWeather() {
    if (isPlatformBrowser(this.platformId)) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        this.getWeather(latitude, longitude).subscribe(weatherData => {
          this.weatherData = weatherData;
          console.log(this.weatherData); // Déplacer ici
        });
      });
    }
  }

}
