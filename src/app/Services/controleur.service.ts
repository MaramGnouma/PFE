import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControleurService {

  private baseUrl = 'http://localhost:5000'; // Assurez-vous que l'URL est correcte

  constructor(private http: HttpClient) { }

  createController(controllerData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/controllers`, controllerData)
      .pipe(
        catchError(this.handleError)
      );
  }

  getControllers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/controllers`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getControllerById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/controllers/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Implementer les autres méthodes pour update et delete si nécessaire

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
