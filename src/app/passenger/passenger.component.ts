import { Component, OnInit, NgModule } from '@angular/core';
import { Passenger } from './passenger';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-passenger',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './passenger.component.html',
  styleUrl: './passenger.component.css'
})
export class PassengerComponent implements OnInit {
  passenger: Passenger = {
    firstName: "", lastName: "", email: ""
  };

  passengers: any = [{
    "firstName": "Ajay",
    "lastName": "Samgir",
    "email": "email@dot.com"
  }]

  ngOnInit() {

  }

  addPassenger(passenger: Passenger) {
    this.passengers.push(passenger);
    this.passenger = {
      firstName: "",
      lastName: "",
      email: ""
    }
  }
}
