import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryDetailsService {
  private apiUrl = 'http://localhost:8081/category'; // Backend API URL

  constructor(private http: HttpClient) {}

  // Get all users with Authorization token
  getcategoryDetails(): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiUrl}/get`, { headers });
  }

  // Delete user by ID
  deleteUser(id: number): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`, { headers });
  }
}

