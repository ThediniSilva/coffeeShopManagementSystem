import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  private apiUrl = 'http://localhost:8081/user/users'; // Backend API URL

  constructor(private http: HttpClient) {}

  // Get all users with Authorization token
  getUserDetails(): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(this.apiUrl, { headers });
  }

  // Delete user by ID
  deleteUser(userId: number): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<any>(`${this.apiUrl}/${userId}`, { headers });
  }
}
