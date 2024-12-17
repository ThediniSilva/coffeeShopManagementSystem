import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserDetailsService } from '../../../services/user-details.service';
import { UpdateUserDetailsComponent } from '../../update-user-details/update-user-details.component';
import { RouterModule, Routes } from '@angular/router';

import { Router } from '@angular/router';  // Import Router

@Component({
  selector: 'app-user-manage',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatInputModule, MatFormFieldModule],
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss']
})
export class UserManageComponent {
  users: any[] = [];
  userDetailsService = inject(UserDetailsService);
  router = inject(Router);  // Inject the Router service

  constructor() {
    this.fetchUserDetails();
  }

  fetchUserDetails() {
    this.userDetailsService.getUserDetails().subscribe({
      next: (result: any) => {
        this.users = result;
      },
      error: (err) => {
        console.error('Error fetching users:', err.message);
      }
    });
  }

  onUpdate(userId: number) {
    // Navigate to the update page with the user ID as a route parameter
    this.router.navigate(['/UpdateUserDetailsComponent', userId]);
  }

  onDelete(userId: number) {
    console.log(`Delete user with ID: ${userId}`);
    if (confirm('Are you sure you want to delete this user?')) {
      this.userDetailsService.deleteUser(userId).subscribe({
        next: () => {
          console.log('User deleted successfully');
          this.fetchUserDetails();
        },
        error: (err) => {
          console.error('Error deleting user:', err.message);
        }
      });
    }
  }
}
