import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-login',
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formbuilder = inject(FormBuilder);
  router = inject(Router); // Inject Router for redirection
  userService = inject(UserService);

  loginForm = this.formbuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  login() {
    this.userService.login(this.loginForm.value.email!, this.loginForm.value.password!)
      .subscribe((result: any) => {
        console.log(result);

        // Save token and user details in localStorage
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));

        // Redirect based on the user's role
        if (result.user.role === 'admin') {
          this.router.navigate(['/adminDashboard']); // Admin Dashboard Route
        } else if (result.user.role === 'customer') {
          this.router.navigate(['/userDetails']); // Customer Details Route
        } else {
          console.error("Unknown user role:", result.user.role);
        }
      }, (error) => {
        console.error("Login failed:", error);
        alert(error.error.message || "Login failed");
      });
  }
}
