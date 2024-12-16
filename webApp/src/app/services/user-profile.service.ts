import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private apiUrl = 'http://localhost:8081/user/user';  // Correct API endpoint

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<any> {
    // Retrieve token from localStorage or any other method you're using
    const token = localStorage.getItem('auth_token'); 

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(this.apiUrl, { headers });
  }
}
