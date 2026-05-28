import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PassengerFormComponent } from './components/passenger-form/passenger-form.component';
import { PassengerListComponent } from './components/passenger-list/passenger-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PassengerFormComponent, PassengerListComponent],
  template: `
    <div class="min-h-screen bg-gray-100 py-8">
      <div class="container mx-auto px-4 max-w-6xl">
        <header class="mb-8">
          <h1 class="text-4xl font-bold text-blue-600 mb-2">✈️ Airline Passenger Validation System</h1>
          <p class="text-gray-600">Manage and validate passenger information</p>
        </header>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-1">
            <app-passenger-form></app-passenger-form>
          </div>
          <div class="lg:col-span-2">
            <app-passenger-list></app-passenger-list>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'passenger-ui';
}
