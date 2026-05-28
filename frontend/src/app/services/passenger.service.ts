import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Passenger } from '../models/passenger.model';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getPassengers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/passengers`);
  }

  addPassenger(passenger: Passenger): Observable<any> {
    return this.http.post(`${this.apiUrl}/passenger/validate`, passenger);
  }

  updatePassenger(id: number, passenger: Partial<Passenger>): Observable<any> {
    return this.http.put(`${this.apiUrl}/passenger/${id}`, passenger);
  }

  deletePassenger(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/passenger/${id}`);
  }

  deleteAllPassengers(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/passengers`);
  }
}
