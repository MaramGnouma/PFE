import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  private baseUrl = 'http://localhost:5000'; // Assurez-vous que l'URL est correcte

  constructor(private http: HttpClient) { }

  createMission(missionData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/missions`, missionData)
      .pipe(
        catchError(this.handleError)
      );
  }

  getMissions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/missions`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getMissionById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/missions/${id}`)
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
