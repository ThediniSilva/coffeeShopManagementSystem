// coffee-details.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coffee-details',
  standalone: true, // Standalone component
  imports: [CommonModule], // ✅ Import CommonModule here
  templateUrl: './coffee-details.component.html',
  styleUrls: ['./coffee-details.component.scss']
})
export class CoffeeDetailsComponent {
  isLoggedIn = true; // Or get value from AuthService
}
