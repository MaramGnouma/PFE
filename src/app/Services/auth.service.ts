import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: any;
  constructor(private http: HttpClient) {}

  forgotPassword(email: string) {
    return this.http.post<any>('http://localhost:5000/forgot-password', { email });
  }

  resetPassword(id: string, token: string, password: string) {
    return this.http.post<any>(`http://localhost:5000/reset-password/${id}/${token}`, { password });
  }


  register(userDetails: any): Observable<any> {
    return this.http.post('http://localhost:5000/register', userDetails);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:5000/login-user', { email, password });
}

getCurrentUser() {
  return this.http.get('http://localhost:5000/user'); // Assurez-vous d'ajuster l'URL selon votre configuration de backend
}

}
