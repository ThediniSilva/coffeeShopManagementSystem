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
  addProduct(product: { name: string; categoryId: number; description: string; price: number }): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(
      this.apiUrl,
      product, // Pass the product object directly
      { headers } // Include Authorization token in headers
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
