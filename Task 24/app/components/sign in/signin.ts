import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  // Model for the form data (optional, but good practice)
  user = {
    email: '',
    password: ''
  };

  // State variables for messages
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) { }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.errorMessage = 'Please fill out all required fields correctly.';
      this.successMessage = '';
      return;
    }

    this.errorMessage = '';
    this.successMessage = 'Attempting to sign in...';

    // Call the service method
    this.authService.signIn(this.user).subscribe({
      next: (response) => {
        // Handle successful login (e.g., store token, redirect)
        this.successMessage = '✅ Sign In Successful! Welcome back.';
        this.errorMessage = '';
        console.log('Login successful:', response);
        // Reset form after success
        form.resetForm(); 
      },
      error: (error) => {
        // Handle error from backend/service
        this.errorMessage = `❌ Sign In Failed: ${error.message}`;
        this.successMessage = '';
        console.error('Login error:', error);
      }
    });
  }
}