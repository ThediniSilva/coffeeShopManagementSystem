import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private baseUrl = 'http://localhost:8081'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  // Fetch all categories
  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/category/getPublic`);
  }

  // Fetch products by category
  getProductsByCategory(categoryId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/product/getByCategory/${categoryId}`);
  }

  // Fetch all products with categories
  getAllProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/product/getPublic`);
  }
}
