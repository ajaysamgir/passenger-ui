import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PassengerService } from '../../services/passenger.service';
import { Passenger } from '../../models/passenger.model';

@Component({
  selector: 'app-passenger-card',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="bg-gray-50 rounded-lg border border-gray-200 p-4">
      <div *ngIf="!isEditing">
        <!-- Display Mode -->
        <div class="space-y-2 text-sm">
          <div><strong>Name:</strong> {{ passenger.fullName }}</div>
          <div><strong>Passport:</strong> {{ passenger.passportNumber }}</div>
          <div><strong>Nationality:</strong> {{ passenger.nationality }}</div>
          <div><strong>Age:</strong> {{ passenger.age }}</div>
          <div><strong>Gender:</strong> {{ passenger.gender }}</div>
          <div><strong>Flight:</strong> {{ passenger.flightNumber }}</div>
          <div><strong>Route:</strong> {{ passenger.departureCountry }} → {{ passenger.destinationCountry }}</div>
          <div><strong>Date:</strong> {{ passenger.travelDate }}</div>
          <div><strong>Email:</strong> {{ passenger.email }}</div>
          <div><strong>Phone:</strong> {{ passenger.phone }}</div>
        </div>

        <!-- Action Buttons -->
        <div class="mt-4 flex gap-2">
          <button 
            (click)="startEdit()"
            class="flex-1 bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600 text-sm"
          >
            Edit
          </button>
          <button 
            (click)="deletePassenger()"
            class="flex-1 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 text-sm"
          >
            Delete
          </button>
        </div>
      </div>

      <div *ngIf="isEditing">
        <!-- Edit Mode -->
        <form [formGroup]="editForm" (ngSubmit)="saveChanges()" class="space-y-2 text-sm">
          
          <div>
            <label class="block font-medium">Full Name</label>
            <input 
              type="text" 
              formControlName="fullName"
              class="w-full px-2 py-1 border rounded text-xs"
            />
          </div>

          <div>
            <label class="block font-medium">Passport</label>
            <input 
              type="text" 
              formControlName="passportNumber"
              class="w-full px-2 py-1 border rounded text-xs"
            />
          </div>

          <div>
            <label class="block font-medium">Age</label>
            <input 
              type="number" 
              formControlName="age"
              class="w-full px-2 py-1 border rounded text-xs"
            />
          </div>

          <div>
            <label class="block font-medium">Flight</label>
            <input 
              type="text" 
              formControlName="flightNumber"
              class="w-full px-2 py-1 border rounded text-xs"
            />
          </div>

          <div>
            <label class="block font-medium">Travel Date</label>
            <input 
              type="date" 
              formControlName="travelDate"
              class="w-full px-2 py-1 border rounded text-xs"
            />
          </div>

          <div>
            <label class="block font-medium">Email</label>
            <input 
              type="email" 
              formControlName="email"
              class="w-full px-2 py-1 border rounded text-xs"
            />
          </div>

          <div>
            <label class="block font-medium">Phone</label>
            <input 
              type="text" 
              formControlName="phone"
              class="w-full px-2 py-1 border rounded text-xs"
            />
          </div>

          <div *ngIf="editErrors.length > 0" class="bg-red-100 border border-red-400 text-red-700 px-2 py-1 rounded text-xs">
            <ul class="list-disc pl-4">
              <li *ngFor="let error of editErrors">{{ error }}</li>
            </ul>
          </div>

          <!-- Edit Action Buttons -->
          <div class="mt-2 flex gap-2">
            <button 
              type="submit"
              [disabled]="editForm.invalid || isSaving"
              class="flex-1 bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 text-xs disabled:bg-gray-400"
            >
              {{ isSaving ? 'Saving...' : 'Save' }}
            </button>
            <button 
              type="button"
              (click)="cancelEdit()"
              class="flex-1 bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 text-xs"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: []
})
export class PassengerCardComponent implements OnInit {
  @Input() passenger!: Passenger;
  @Output() passengerDeleted = new EventEmitter<void>();
  @Output() passengerUpdated = new EventEmitter<void>();

  isEditing = false;
  isSaving = false;
  editForm!: FormGroup;
  editErrors: string[] = [];

  constructor(
    private fb: FormBuilder,
    private passengerService: PassengerService
  ) {}

  ngOnInit(): void {
    this.initializeEditForm();
  }

  initializeEditForm(): void {
    this.editForm = this.fb.group({
      fullName: [this.passenger.fullName, Validators.required],
      passportNumber: [this.passenger.passportNumber, [Validators.required, Validators.pattern(/^[A-Z0-9]+$/)]],
      age: [this.passenger.age, [Validators.required, Validators.min(1), Validators.max(120)]],
      gender: [this.passenger.gender, Validators.required],
      flightNumber: [this.passenger.flightNumber, [Validators.required, Validators.pattern(/^[A-Z]{2}[0-9]{3,4}$/)]],
      departureCountry: [this.passenger.departureCountry, Validators.required],
      destinationCountry: [this.passenger.destinationCountry, Validators.required],
      travelDate: [this.passenger.travelDate, Validators.required],
      email: [this.passenger.email, [Validators.required, Validators.email]],
      phone: [this.passenger.phone, [Validators.required, Validators.pattern(/^\d+$/)]]
    });
  }

  startEdit(): void {
    this.isEditing = true;
    this.editErrors = [];
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editErrors = [];
    this.initializeEditForm();
  }

  saveChanges(): void {
    if (this.editForm.invalid) return;

    this.isSaving = true;
    this.editErrors = [];

    this.passengerService.updatePassenger(this.passenger.id!, this.editForm.value).subscribe({
      next: (response) => {
        if (response.success) {
          this.isEditing = false;
          this.passengerUpdated.emit();
        } else {
          this.editErrors = response.errors || ['An error occurred'];
        }
        this.isSaving = false;
      },
      error: (error) => {
        this.editErrors = error.error?.errors || ['Failed to update passenger'];
        this.isSaving = false;
      }
    });
  }

  deletePassenger(): void {
    if (confirm(`Are you sure you want to delete ${this.passenger.fullName}?`)) {
      this.passengerService.deletePassenger(this.passenger.id!).subscribe({
        next: (response) => {
          if (response.success) {
            this.passengerDeleted.emit();
          }
        },
        error: (error) => {
          console.error('Error deleting passenger:', error);
        }
      });
    }
  }
}
