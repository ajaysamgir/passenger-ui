import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PassengerService } from '../services/passenger.service';
import { Passenger } from '../models/passenger.model';

@Component({
  selector: 'app-passenger-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 class="text-2xl font-bold mb-4">Add Passenger</h2>
      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">
        
        <!-- Full Name -->
        <div>
          <label class="block text-sm font-medium mb-1">Full Name *</label>
          <input 
            type="text" 
            formControlName="fullName"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="John Doe"
          />
          <span class="text-red-500 text-sm" *ngIf="form.get('fullName')?.invalid && form.get('fullName')?.touched">
            Full name is required
          </span>
        </div>

        <!-- Passport Number -->
        <div>
          <label class="block text-sm font-medium mb-1">Passport Number *</label>
          <input 
            type="text" 
            formControlName="passportNumber"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="A1234567"
          />
          <span class="text-red-500 text-sm" *ngIf="form.get('passportNumber')?.invalid && form.get('passportNumber')?.touched">
            Invalid passport format
          </span>
        </div>

        <!-- Nationality -->
        <div>
          <label class="block text-sm font-medium mb-1">Nationality *</label>
          <select 
            formControlName="nationality"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Nationality</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
            <option value="Netherlands">Netherlands</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
          </select>
          <span class="text-red-500 text-sm" *ngIf="form.get('nationality')?.invalid && form.get('nationality')?.touched">
            Nationality is required
          </span>
        </div>

        <!-- Age -->
        <div>
          <label class="block text-sm font-medium mb-1">Age *</label>
          <input 
            type="number" 
            formControlName="age"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="30"
            min="1"
            max="120"
          />
          <span class="text-red-500 text-sm" *ngIf="form.get('age')?.invalid && form.get('age')?.touched">
            Age must be between 1 and 120
          </span>
        </div>

        <!-- Gender -->
        <div>
          <label class="block text-sm font-medium mb-1">Gender *</label>
          <select 
            formControlName="gender"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <span class="text-red-500 text-sm" *ngIf="form.get('gender')?.invalid && form.get('gender')?.touched">
            Gender is required
          </span>
        </div>

        <!-- Flight Number -->
        <div>
          <label class="block text-sm font-medium mb-1">Flight Number *</label>
          <input 
            type="text" 
            formControlName="flightNumber"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="AI101"
          />
          <span class="text-red-500 text-sm" *ngIf="form.get('flightNumber')?.invalid && form.get('flightNumber')?.touched">
            Invalid flight format (e.g., AI101)
          </span>
        </div>

        <!-- Departure Country -->
        <div>
          <label class="block text-sm font-medium mb-1">Departure Country *</label>
          <input 
            type="text" 
            formControlName="departureCountry"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="USA"
          />
          <span class="text-red-500 text-sm" *ngIf="form.get('departureCountry')?.invalid && form.get('departureCountry')?.touched">
            Departure country is required
          </span>
        </div>

        <!-- Destination Country -->
        <div>
          <label class="block text-sm font-medium mb-1">Destination Country *</label>
          <input 
            type="text" 
            formControlName="destinationCountry"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="UK"
          />
          <span class="text-red-500 text-sm" *ngIf="form.get('destinationCountry')?.invalid && form.get('destinationCountry')?.touched">
            Destination country is required
          </span>
        </div>

        <!-- Travel Date -->
        <div>
          <label class="block text-sm font-medium mb-1">Travel Date *</label>
          <input 
            type="date" 
            formControlName="travelDate"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span class="text-red-500 text-sm" *ngIf="form.get('travelDate')?.invalid && form.get('travelDate')?.touched">
            Travel date cannot be in the past
          </span>
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium mb-1">Email Address *</label>
          <input 
            type="email" 
            formControlName="email"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="john@example.com"
          />
          <span class="text-red-500 text-sm" *ngIf="form.get('email')?.invalid && form.get('email')?.touched">
            Invalid email format
          </span>
        </div>

        <!-- Phone -->
        <div>
          <label class="block text-sm font-medium mb-1">Phone Number *</label>
          <input 
            type="text" 
            formControlName="phone"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="1234567890"
          />
          <span class="text-red-500 text-sm" *ngIf="form.get('phone')?.invalid && form.get('phone')?.touched">
            Phone must contain only digits
          </span>
        </div>

        <!-- Error Messages from Backend -->
        <div *ngIf="apiErrors.length > 0" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <ul class="list-disc pl-5">
            <li *ngFor="let error of apiErrors">{{ error }}</li>
          </ul>
        </div>

        <!-- Success Message -->
        <div *ngIf="successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {{ successMessage }}
        </div>

        <!-- Submit Button -->
        <button 
          type="submit" 
          [disabled]="form.invalid || isSubmitting"
          class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
        >
          {{ isSubmitting ? 'Adding...' : 'Add Passenger' }}
        </button>
      </form>
    </div>
  `,
  styles: []
})
export class PassengerFormComponent implements OnInit {
  form!: FormGroup;
  isSubmitting = false;
  apiErrors: string[] = [];
  successMessage = '';

  constructor(private fb: FormBuilder, private passengerService: PassengerService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      passportNumber: ['', [Validators.required, Validators.pattern(/^[A-Z0-9]+$/)]],
      nationality: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      gender: ['', Validators.required],
      flightNumber: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}[0-9]{3,4}$/)]],
      departureCountry: ['', Validators.required],
      destinationCountry: ['', Validators.required],
      travelDate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
    });
  }

  onSubmit(): void {
    this.apiErrors = [];
    this.successMessage = '';

    if (this.form.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.passengerService.addPassenger(this.form.value).subscribe({
      next: (response) => {
        if (response.success) {
          this.successMessage = response.message;
          this.form.reset();
        } else {
          this.apiErrors = response.errors || ['An error occurred'];
        }
        this.isSubmitting = false;
      },
      error: (error) => {
        this.apiErrors = error.error?.errors || ['Failed to add passenger'];
        this.isSubmitting = false;
      }
    });
  }
}
