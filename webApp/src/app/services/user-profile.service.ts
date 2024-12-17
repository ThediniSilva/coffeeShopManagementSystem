import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private apiUrl = 'http://localhost:8081/user'; // Update with your API base URL

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  getUserDetails() {
    return this.http.get(`${this.apiUrl}/user`);
  }

  updateUserDetails(user: any) {
    return this.http.put(`${this.apiUrl}/user`, user);
  }

  deleteUser() {
    return this.http.delete(`${this.apiUrl}/user`);
  }
}



