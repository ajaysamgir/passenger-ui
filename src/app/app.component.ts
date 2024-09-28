import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PassengerComponent } from './passenger/passenger.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PassengerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Passenger Data';
}
