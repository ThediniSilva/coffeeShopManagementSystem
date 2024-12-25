import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductUpdateService {
  private apiUrl = 'http://localhost:8081/product'; // Base URL for product API

  constructor(private http: HttpClient) {}

  // Fetch product details by ID
  getUserById(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/getById/${id}`, { headers });
    // Correct endpoint for fetching product by ID
  }

  // Update product details
  updateUser(id: string, userData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/update`, { id, ...userData }, { headers }); // Updated payload for update API
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



