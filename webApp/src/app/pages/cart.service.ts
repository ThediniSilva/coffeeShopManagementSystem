import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:8081/cart'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  addToCart(productId: number, quantity: number): Observable<any> {
    const body = { product_id: productId, quantity };
    console.log("Request Payload:", body); // Debug log to verify request payload
    return this.http.post(`${this.apiUrl}/add`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // Ensure token is present
      }
    });
  }
  

  getCartItems(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // Ensure the token is present
      }
    });
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }
}
