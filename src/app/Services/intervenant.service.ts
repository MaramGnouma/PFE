import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Intervenant } from '../Models/intervenant';

@Injectable({
  providedIn: 'root'
})
export class IntervenantService {

  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  getAllintervenat(): Observable<any> {
    return this.http.get(`${this.apiUrl}/intervenants`);
  }
  getIntervenantById(id: string): Observable<Intervenant> {
    return this.http.get<Intervenant>(`${this.apiUrl}/intervenants/${id}`);
  }
}
