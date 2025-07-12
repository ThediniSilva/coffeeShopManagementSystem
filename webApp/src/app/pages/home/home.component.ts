import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
