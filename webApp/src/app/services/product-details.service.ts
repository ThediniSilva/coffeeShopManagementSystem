import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

 private apiUrl = 'http://localhost:8081/product'; // Backend API URL
 
   constructor(private http: HttpClient) {}
 
   // Get all users with Authorization token
   getproductDetails(): Observable<any> {
     const token = localStorage.getItem('token'); // Retrieve token from local storage
     const headers = new HttpHeaders({
       'Authorization': `Bearer ${token}`
     });
 
     return this.http.get<any>(`${this.apiUrl}/getPublic`, { headers });
   }
 
   // Delete user by ID
   deleteProduct(id: number): Observable<any> {
     const token = localStorage.getItem('token'); // Retrieve token
     const headers = new HttpHeaders({
       'Authorization': `Bearer ${token}`
     });
 
     return this.http.delete<any>(`${this.apiUrl}/delete/${id}`, { headers });
   }
}
