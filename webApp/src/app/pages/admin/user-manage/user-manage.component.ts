import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserDetailsService } from '../../../services/user-details.service';

@Component({
  selector: 'app-user-manage',
  standalone: true, // Make this a standalone component
  imports: [CommonModule, MatTableModule, MatInputModule, MatFormFieldModule], // Add CommonModule here
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss']
})
export class UserManageComponent {
  users: any[] = []; // Array to hold user data
  userDetailsService = inject(UserDetailsService);

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
    console.log(`Update user with ID: ${userId}`);
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
