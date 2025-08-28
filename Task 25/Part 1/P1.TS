import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-900">
      <div class="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-all duration-300">
        <h1 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">Create a New Movie</h1>
        <p class="text-center text-gray-600 dark:text-gray-400 mb-8">
          Fill out the form below to add a new movie to the collection.
        </p>

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
            Submit
          </button>
        </form>

        <div class="mt-8 p-4 bg-gray-200 dark:bg-gray-700 rounded-lg">
          <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Form Status</h2>
          <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Form is Valid: <span class="font-bold">{{ isFormValid() }}</span></p>
          <pre class="mt-4 p-4 text-xs bg-gray-300 dark:bg-gray-600 rounded-lg overflow-x-auto text-gray-800 dark:text-gray-200">{{ movieForm.value | json }}</pre>
        </div>

      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private fb = inject(FormBuilder);

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

  isFormValid = computed(() => this.movieForm.valid);

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

  onSubmit(): void {
    if (this.movieForm.valid) {
      console.log('Form Submitted!', this.movieForm.value);
    } else {
      console.error('Form is invalid!');
      this.movieForm.markAllAsTouched();
    }
  }
}
