import { ChangeDetectionStrategy, Component, computed, signal, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Movie {
  id: number;
  title: string;
  director: string;
  releaseYear: number;
  email: string;
  description: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col md:flex-row">
      <aside class="w-full md:w-64 bg-gray-800 dark:bg-gray-950 p-6 flex flex-col">
        <div class="text-white text-2xl font-bold mb-8">Movie Dashboard</div>
        <nav class="space-y-4">
          <a class="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span>Dashboard</span>
          </a>
        </nav>
      </aside>

      <main class="flex-1 p-6 lg:p-12 overflow-y-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="md:col-span-1 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">{{ isEditing() ? 'Edit Movie' : 'Add New Movie' }}</h2>
            <form [formGroup]="movieForm" (ngSubmit)="onSubmit()" class="space-y-6">
              <div>
                <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Movie Title</label>
                <input id="title" type="text" formControlName="title"
                       class="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out dark:text-white"
                       placeholder="e.g., The Matrix">
                @if (movieForm.get('title')?.hasError('required') && movieForm.get('title')?.touched) {
                  <p class="mt-2 text-sm text-red-600 dark:text-red-400">Title is required.</p>
                }
                @if (movieForm.get('title')?.hasError('minlength') && movieForm.get('title')?.touched) {
                  <p class="mt-2 text-sm text-red-600 dark:text-red-400">Title must be at least 3 characters long.</p>
                }
              </div>

              <div>
                <label for="director" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Director</label>
                <input id="director" type="text" formControlName="director"
                       class="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out dark:text-white"
                       placeholder="e.g., Christopher Nolan">
                @if (movieForm.get('director')?.hasError('required') && movieForm.get('director')?.touched) {
                  <p class="mt-2 text-sm text-red-600 dark:text-red-400">Director is required.</p>
                }
              </div>

              <div>
                <label for="releaseYear" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Release Year</label>
                <input id="releaseYear" type="number" formControlName="releaseYear"
                       class="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out dark:text-white"
                       placeholder="e.g., 2010">
                @if (movieForm.get('releaseYear')?.hasError('required') && movieForm.get('releaseYear')?.touched) {
                  <p class="mt-2 text-sm text-red-600 dark:text-red-400">Release year is required.</p>
                }
                @if (movieForm.get('releaseYear')?.hasError('invalidYear') && movieForm.get('releaseYear')?.touched) {
                  <p class="mt-2 text-sm text-red-600 dark:text-red-400">Please enter a valid year between {{movieForm.get('releaseYear')?.errors?.['invalidYear'].min}} and {{movieForm.get('releaseYear')?.errors?.['invalidYear'].max}}.</p>
                }
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Contact Email</label>
                <input id="email" type="email" formControlName="email"
                       class="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out dark:text-white"
                       placeholder="e.g., example@email.com">
                @if (movieForm.get('email')?.hasError('required') && movieForm.get('email')?.touched) {
                  <p class="mt-2 text-sm text-red-600 dark:text-red-400">Email is required.</p>
                }
                @if (movieForm.get('email')?.hasError('email') && movieForm.get('email')?.touched) {
                  <p class="mt-2 text-sm text-red-600 dark:text-red-400">Please enter a valid email address.</p>
                }
              </div>

              <div>
                <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                <textarea id="description" formControlName="description" rows="4"
                          class="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out dark:text-white"
                          placeholder="e.g., A science fiction film about..."></textarea>
                @if (movieForm.get('description')?.hasError('maxlength') && movieForm.get('description')?.touched) {
                  <p class="mt-2 text-sm text-red-600 dark:text-red-400">Description cannot exceed 250 characters. (Current: {{movieForm.get('description')?.value.length}})</p>
                }
              </div>

              <button type="submit" [disabled]="movieForm.invalid"
                      class="w-full px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300">
                {{ isEditing() ? 'Update Movie' : 'Add Movie' }}
              </button>
            </form>
          </div>

          <div class="md:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Movie List</h2>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead class="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Director</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Year</th>
                    <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  @for (movie of movies(); track movie.id) {
                    <tr>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{{ movie.title }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ movie.director }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ movie.releaseYear }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <button (click)="onEdit(movie)" class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200">Edit</button>
                        <button (click)="onDelete(movie.id)" class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200">Delete</button>
                      </td>
                    </tr>
                  } @empty {
                    <tr>
                      <td colspan="4" class="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">No movies found. Add one using the form.</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private fb = inject(FormBuilder);

  isEditing = signal(false);
  editingMovieId: number | null = null;
  movies = signal<Movie[]>([
    { id: 1, title: 'Inception', director: 'Christopher Nolan', releaseYear: 2010, email: 'info@inception.com', description: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.' },
    { id: 2, title: 'The Matrix', director: 'Lana Wachowski', releaseYear: 1999, email: 'info@matrix.com', description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.' }
  ]);

  movieForm: FormGroup = this.fb.group({
    title: ['', [
      Validators.required,
      Validators.minLength(3)
    ]],
    director: ['', Validators.required],
    releaseYear: [new Date().getFullYear(), [
      Validators.required,
      this.yearValidator(1900, new Date().getFullYear())
    ]],
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    description: ['', [
      Validators.maxLength(250)
    ]]
  });

  yearValidator(min: number, max: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const year = control.value;
      if (year && (isNaN(year) || year < min || year > max)) {
        return {
          'invalidYear': {
            'min': min,
            'max': max
          }
        };
      }
      return null;
    };
  }

  onEdit(movie: Movie): void {
    this.isEditing.set(true);
    this.editingMovieId = movie.id;
    this.movieForm.patchValue(movie);
  }

  onDelete(id: number): void {
    this.movies.update(currentMovies => currentMovies.filter(movie => movie.id !== id));
    if (this.editingMovieId === id) {
      this.isEditing.set(false);
      this.editingMovieId = null;
      this.movieForm.reset();
    }
  }

  onSubmit(): void {
    if (this.movieForm.valid) {
      if (this.isEditing()) {
        const updatedMovie = { ...this.movieForm.value, id: this.editingMovieId };
        this.movies.update(currentMovies => currentMovies.map(movie => movie.id === this.editingMovieId ? updatedMovie : movie));
        this.isEditing.set(false);
      } else {
        const newMovie = { ...this.movieForm.value, id: Date.now() };
        this.movies.update(currentMovies => [...currentMovies, newMovie]);
      }
      this.movieForm.reset();
    } else {
      this.movieForm.markAllAsTouched();
    }
  }
}
