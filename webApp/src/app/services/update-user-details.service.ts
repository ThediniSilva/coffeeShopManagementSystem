import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateUserDetailsService {
  private apiUrl = 'http://localhost:8081/user/users'; // Backend API URL

  constructor(private http: HttpClient) {}

  // Fetch user details by ID
  getUserById(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/${id}`, { headers });
  }

  // Update user details
  updateUser(id: string, userData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/${id}`, userData, { headers });
  }

  // Function to dynamically get the Authorization header
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Fetch token from localStorage
    if (!token) {
      console.error("No authentication token found in localStorage.");
      throw new Error("Authentication token is missing");
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
