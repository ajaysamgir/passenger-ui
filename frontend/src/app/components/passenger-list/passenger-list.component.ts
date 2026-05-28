import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PassengerService } from '../services/passenger.service';
import { Passenger } from '../models/passenger.model';
import { PassengerCardComponent } from './passenger-card/passenger-card.component';

@Component({
  selector: 'app-passenger-list',
  standalone: true,
  imports: [CommonModule, PassengerCardComponent],
  template: `
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold">Passengers</h2>
        <button 
          (click)="loadPassengers()"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Refresh
        </button>
      </div>

      <!-- Search and Filter -->
      <div class="mb-4 space-y-4">
        <div class="flex gap-4 flex-wrap">
          <input 
            type="text" 
            placeholder="Search by name, passport, or flight..."
            [(ngModel)]="searchTerm"
            (input)="applySearchAndSort()"
            class="flex-1 min-w-[200px] px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select 
            [(ngModel)]="sortBy"
            (change)="applySearchAndSort()"
            class="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="name">Sort by Name</option>
            <option value="flight">Sort by Flight</option>
            <option value="date">Sort by Date</option>
          </select>
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="isLoading" class="text-center py-8">
        <p class="text-gray-500">Loading passengers...</p>
      </div>

      <!-- Empty State -->
      <div *ngIf="!isLoading && filteredPassengers.length === 0" class="text-center py-8">
        <p class="text-gray-500">No passengers found</p>
      </div>

      <!-- Passengers Grid -->
      <div *ngIf="!isLoading && filteredPassengers.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <app-passenger-card 
          *ngFor="let passenger of filteredPassengers"
          [passenger]="passenger"
          (passengerDeleted)="onPassengerDeleted()"
          (passengerUpdated)="onPassengerUpdated()"
        ></app-passenger-card>
      </div>
    </div>
  `,
  styles: []
})
export class PassengerListComponent implements OnInit {
  @Input() refreshTrigger = false;
  
  passengers: Passenger[] = [];
  filteredPassengers: Passenger[] = [];
  isLoading = false;
  searchTerm = '';
  sortBy = 'name';

  constructor(private passengerService: PassengerService) {}

  ngOnInit(): void {
    this.loadPassengers();
  }

  ngOnChanges(): void {
    if (this.refreshTrigger) {
      this.loadPassengers();
    }
  }

  loadPassengers(): void {
    this.isLoading = true;
    this.passengerService.getPassengers().subscribe({
      next: (response) => {
        if (response.success) {
          this.passengers = response.data || [];
          this.applySearchAndSort();
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading passengers:', error);
        this.isLoading = false;
      }
    });
  }

  applySearchAndSort(): void {
    let filtered = this.passengers;

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(p => 
        p.fullName.toLowerCase().includes(term) ||
        p.passportNumber.toLowerCase().includes(term) ||
        p.flightNumber.toLowerCase().includes(term)
      );
    }

    filtered.sort((a, b) => {
      switch (this.sortBy) {
        case 'flight':
          return a.flightNumber.localeCompare(b.flightNumber);
        case 'date':
          return new Date(a.travelDate).getTime() - new Date(b.travelDate).getTime();
        case 'name':
        default:
          return a.fullName.localeCompare(b.fullName);
      }
    });

    this.filteredPassengers = filtered;
  }

  onPassengerDeleted(): void {
    this.loadPassengers();
  }

  onPassengerUpdated(): void {
    this.loadPassengers();
  }
}
