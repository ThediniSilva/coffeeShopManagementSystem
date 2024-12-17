import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateUserDetailsService } from '../../services/update-user-details.service';
import { FormsModule } from '@angular/forms'; // Required for ngModel
import { CommonModule } from '@angular/common'; // Required for *ngIf

@Component({
  selector: 'app-update-user',
  imports: [
    FormsModule, // Import FormsModule here
    CommonModule // Import CommonModule for *ngIf
  ],
  templateUrl: './update-user-details.component.html',
  styleUrls: ['./update-user-details.component.scss'],
})
export class UpdateUserDetailsComponent implements OnInit {
  userId: string = '';
  userData = {
    name: '',
    contactNumber: '',
    email: '',
    status: '',
  };
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private UpdateUserDetailsService: UpdateUserDetailsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get user ID from route
    this.userId = this.route.snapshot.paramMap.get('id') || '';

    // Fetch existing user data
    this.UpdateUserDetailsService.getUserById(this.userId).subscribe({
      next: (data) => {
        this.userData = data;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load user data.';
      },
    });
  }

  // Submit updated data
  updateUser() {
    console.log('Sending Data:', this.userData);
  
    this.UpdateUserDetailsService.updateUser(this.userId, this.userData).subscribe({
      next: () => {
        alert('User updated successfully!');
        this.router.navigate(['/userManageDetails']);
      },
      error: (err) => {
        console.error('Update Failed:', err);
        this.errorMessage = `Failed to update user data: ${err.error?.message || err.message}`;
      },
    });
  }
  
}


