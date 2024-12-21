import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddProductService {

 private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8081/product/productadd'; // Backend API URL

  // Add category method with token-based authentication
  addCategory(name: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(
      this.apiUrl,
      { name }, // Request body
      { headers } // Headers including the Authorization token
    );
  }

  private getAuthHeaders(): HttpHeaders {
    const authToken = localStorage.getItem('token'); // Ensure you're using the correct key here
    if (!authToken) {
      console.error("No authentication token found in localStorage.");
      throw new Error("Authentication token is missing");
    }
    return new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
  }
}
