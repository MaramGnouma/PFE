import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private baseUrl = 'http://localhost:5000'; // Assurez-vous que l'URL est correcte

  constructor(private http: HttpClient) { }

  createNotification(sujet: string, contenu: string, type: string): Observable<any> {
    const notificationData = { sujet, contenu, type };
    return this.http.post<any>(`${this.baseUrl}/notifications`, notificationData)
      .pipe(
        catchError(this.handleError)
      );
  }

  getNotifications(): Observable<any[]> {
    let params = new HttpParams();
    return this.http.get<any[]>(`${this.baseUrl}/notifications`, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  getNotificationById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/notifications/${id}`)
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
