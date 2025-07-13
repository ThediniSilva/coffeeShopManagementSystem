import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:8081/cart';       // For cart operations
  private orderUrl = 'http://localhost:8081/api/orders';   // For order operations

  constructor(private http: HttpClient) {}

  // Utility method to attach Authorization header
  private getAuthHeaders() {
    const token = localStorage.getItem('token'); // Ensure token is stored after login
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  // Add item to cart
  addToCart(productId: number, quantity: number): Observable<any> {
    const body = { product_id: productId, quantity };
    console.log("Request Payload:", body);
    return this.http.post(`${this.apiUrl}/add`, body, this.getAuthHeaders());
  }

  // Get all cart items for the logged-in user
  getCartItems(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`, this.getAuthHeaders());
  }

  // Delete one item from the cart
  deleteCartItem(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${productId}`, this.getAuthHeaders());
  }

  // Clear all items from the cart
  clearCart(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clear`, this.getAuthHeaders());
  }

  // Update quantity of a specific item
  updateCartItemQuantity(productId: number, quantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, { product_id: productId, quantity }, this.getAuthHeaders());
  }

  // 🆕 Place the order (confirm order)
  placeOrder(): Observable<any> {
    return this.http.post(`${this.orderUrl}/place`, {}, this.getAuthHeaders());
  }

  getMyOrders() {
  return this.http.get('http://localhost:8081/api/orders/my-orders', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
}


getOrderDetails(orderId: number) {
  return this.http.get(`http://localhost:8081/api/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
}

}
