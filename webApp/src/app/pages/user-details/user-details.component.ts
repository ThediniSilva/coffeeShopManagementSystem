import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'app-user-manage',
  standalone: true, // Make this a standalone component
  imports: [CommonModule, MatTableModule, MatInputModule, MatFormFieldModule], // Add CommonModule here
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  
}



