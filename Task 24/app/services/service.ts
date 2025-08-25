import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // **REPLACE WITH YOUR ACTUAL BACKEND API BASE URL**
  private apiUrl = 'http://localhost:3000/api/v1/users'; 

  constructor(private http: HttpClient) { }

  // Generic error handler
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error (check backend structure)
      errorMessage = error.error.message || `Backend returned code ${error.status}, body was: ${error.error}`;
    }
    console.error(error);
    return throwError(() => new Error(errorMessage));
  }

  // API Call for Sign In
  signIn(credentials: any): Observable<any> {
    const url = `${this.apiUrl}/login`; // Example endpoint
    return this.http.post(url, credentials).pipe(
      catchError(this.handleError)
    );
  }

  // API Call for Sign Up
  signUp(userData: any): Observable<any> {
    const url = `${this.apiUrl}/register`; // Example endpoint
    // Note: For 'photo' (file upload), you might need FormData, but for simplicity here we assume a URL or base64 string.
    return this.http.post(url, userData).pipe(
      catchError(this.handleError)
    );
  }
}