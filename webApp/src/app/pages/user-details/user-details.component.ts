import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core'; // for Angular DI in the constructor
import { UserProfileService } from '../../services/user-profile.service';
import { CommonModule } from '@angular/common'; // This should be imported in the module, not the component.

@Component({
  selector: 'app-user-details',
  standalone: true,  // Make it standalone if necessary (for Angular 14+)
  imports: [CommonModule],
  templateUrl: './user-details.component.html',  
  styleUrls: ['./user-details.component.scss']  // Corrected 'styleUrl' to 'styleUrls'
})
export class UserDetailsComponent implements OnInit {
  user: any = null; // To store user data
  errorMessage: string = ''; // To store error messages

  // Inject the UserProfileService
  userProfileService = inject(UserProfileService);

  ngOnInit(): void {
    this.fetchUserProfile(); // Fetch user profile data when component is initialized
  }

  // Method to fetch user profile data
  fetchUserProfile(): void {
    this.userProfileService.getUserProfile().subscribe({
      next: (result: any) => {
        this.user = result;  // Assign the user details to the 'user' variable
        console.log('User Profile:', result);  // Debug: Log user profile to console
      },
      error: (err) => {
        this.errorMessage = 'Error fetching user profile data'; // Set error message
        console.error('Error fetching user profile:', err); // Log error to console
      },
    });
  }
}
