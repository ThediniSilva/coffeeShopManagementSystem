import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common'; // ✅ ADD THIS

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    NgIf // ✅ ADD THIS
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'webApp';

  constructor(private router: Router) {}

  // Check if user is logged in by checking localStorage
  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
