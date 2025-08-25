import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  // Full model for all fields
  newUser = {
    name: '',
    email: '',
    photo: '', // Assuming photo is a URL or Base64 string for simplicity
    password: '',
    confirmPassword: '',
    phone: '', // Additional field
    gender: '' // Additional field
  };
  
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) { }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.errorMessage = 'Please fill out all required fields correctly.';
      this.successMessage = '';
      return;
    }
    
    // Check for password mismatch
    if (this.newUser.password !== this.newUser.confirmPassword) {
      this.errorMessage = 'Password and Confirm Password do not match.';
      this.successMessage = '';
      return;
    }

    this.errorMessage = '';
    this.successMessage = 'Attempting to register user...';
    
    // Destructure to remove 'confirmPassword' before sending to backend
    const { confirmPassword, ...dataToSend } = this.newUser;

    // Call the service method
    this.authService.signUp(dataToSend).subscribe({
      next: (response) => {
        this.successMessage = '🎉 Registration Successful! You can now sign in.';
        this.errorMessage = '';
        console.log('Registration successful:', response);
        form.resetForm();
      },
      error: (error) => {
        this.errorMessage = `❌ Registration Failed: ${error.message}`;
        this.successMessage = '';
        console.error('Registration error:', error);
      }
    });
  }
}