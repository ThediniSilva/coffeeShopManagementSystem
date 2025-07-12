// login.component.ts
import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formbuilder = inject(FormBuilder);
  router = inject(Router);
  userService = inject(UserService);

  // Additional properties for UI enhancement
  showPassword = false;
  isLoading = false;

  loginForm = this.formbuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  // Toggle password visibility
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // Forgot password functionality
  forgotPassword(event: Event) {
    event.preventDefault();
    // Add your forgot password logic here
    alert('Forgot password functionality would be implemented here!');
  }

  // Your existing login function with loading state
  login() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      
      this.userService.login(this.loginForm.value.email!, this.loginForm.value.password!)
        .subscribe({
          next: (result: any) => {
            console.log(result);
            this.isLoading = false;

            // Save token and user details in localStorage
            localStorage.setItem("token", result.token);
            localStorage.setItem("user", JSON.stringify(result.user));

            // Redirect based on the user's role
            if (result.user.role === 'admin') {
              this.router.navigate(['/adminDashboard']);
            } else if (result.user.role === 'user') {
              this.router.navigate(['/home']);
            } else {
              console.error("Unknown user role:", result.user.role);
            }
          },
          error: (error) => {
            console.error("Login failed:", error);
            this.isLoading = false;
            alert(error.error.message || "Login failed");
          }
        });
    } else {
      // Mark all fields as touched to show validation errors
      this.loginForm.markAllAsTouched();
    }
  }
}