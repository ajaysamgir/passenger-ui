/**
 * Unit tests for ValidationService
 */

import ValidationService, { ValidationError } from '../services/ValidationService';

describe('ValidationService', () => {
  describe('validatePassenger', () => {
    it('should reject missing required fields', () => {
      const errors = ValidationService.validatePassenger({});
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some(e => e.field === 'fullName')).toBe(true);
    });

    it('should validate email format', () => {
      const passenger = {
        fullName: 'John Doe',
        passportNumber: 'A1234567',
        nationality: 'USA',
        age: 30,
        gender: 'Male',
        flightNumber: 'AI101',
        departureCountry: 'USA',
        destinationCountry: 'UK',
        travelDate: '2026-06-01',
        email: 'invalid-email',
        phone: '1234567890'
      };
      const errors = ValidationService.validatePassenger(passenger);
      expect(errors.some(e => e.field === 'email')).toBe(true);
    });

    it('should validate age range', () => {
      const passenger = {
        fullName: 'John Doe',
        passportNumber: 'A1234567',
        nationality: 'USA',
        age: 150,
        gender: 'Male',
        flightNumber: 'AI101',
        departureCountry: 'USA',
        destinationCountry: 'UK',
        travelDate: '2026-06-01',
        email: 'john@example.com',
        phone: '1234567890'
      };
      const errors = ValidationService.validatePassenger(passenger);
      expect(errors.some(e => e.field === 'age')).toBe(true);
    });

    it('should validate flight format', () => {
      const passenger = {
        fullName: 'John Doe',
        passportNumber: 'A1234567',
        nationality: 'USA',
        age: 30,
        gender: 'Male',
        flightNumber: 'INVALID',
        departureCountry: 'USA',
        destinationCountry: 'UK',
        travelDate: '2026-06-01',
        email: 'john@example.com',
        phone: '1234567890'
      };
      const errors = ValidationService.validatePassenger(passenger);
      expect(errors.some(e => e.field === 'flightNumber')).toBe(true);
    });

    it('should reject departure = destination', () => {
      const passenger = {
        fullName: 'John Doe',
        passportNumber: 'A1234567',
        nationality: 'USA',
        age: 30,
        gender: 'Male',
        flightNumber: 'AI101',
        departureCountry: 'USA',
        destinationCountry: 'USA',
        travelDate: '2026-06-01',
        email: 'john@example.com',
        phone: '1234567890'
      };
      const errors = ValidationService.validatePassenger(passenger);
      expect(errors.some(e => e.field === 'destinationCountry')).toBe(true);
    });

    it('should reject past travel dates', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);
      const passenger = {
        fullName: 'John Doe',
        passportNumber: 'A1234567',
        nationality: 'USA',
        age: 30,
        gender: 'Male',
        flightNumber: 'AI101',
        departureCountry: 'USA',
        destinationCountry: 'UK',
        travelDate: pastDate.toISOString().split('T')[0],
        email: 'john@example.com',
        phone: '1234567890'
      };
      const errors = ValidationService.validatePassenger(passenger);
      expect(errors.some(e => e.field === 'travelDate')).toBe(true);
    });

    it('should validate phone numbers contain only digits', () => {
      const passenger = {
        fullName: 'John Doe',
        passportNumber: 'A1234567',
        nationality: 'USA',
        age: 30,
        gender: 'Male',
        flightNumber: 'AI101',
        departureCountry: 'USA',
        destinationCountry: 'UK',
        travelDate: '2026-06-01',
        email: 'john@example.com',
        phone: '123456+78'
      };
      const errors = ValidationService.validatePassenger(passenger);
      expect(errors.some(e => e.field === 'phone')).toBe(true);
    });
  });
});
