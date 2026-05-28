import { Passenger } from '../models/Passenger';

const ALLOWED_NATIONALITIES = ['India', 'USA', 'United Kingdom', 'Germany', 'France', 'Netherlands', 'Canada', 'Australia'];
const FLIGHT_REGEX = /^[A-Z]{2}[0-9]{3,4}$/;

export interface ValidationError {
  field: string;
  message: string;
}

export class ValidationService {
  static validatePassenger(passenger: any, excludePassportId?: string, checkDuplicateFn?: (passport: string, id?: string) => Promise<boolean>): ValidationError[] {
    const errors: ValidationError[] = [];

    // Required field validation
    if (!passenger.fullName || passenger.fullName.trim() === '') {
      errors.push({ field: 'fullName', message: 'Full name is required' });
    }

    if (!passenger.passportNumber || passenger.passportNumber.trim() === '') {
      errors.push({ field: 'passportNumber', message: 'Passport number is required' });
    } else if (!/^[A-Z0-9]+$/.test(passenger.passportNumber)) {
      errors.push({ field: 'passportNumber', message: 'Passport must be alphanumeric' });
    }

    if (!passenger.nationality || passenger.nationality.trim() === '') {
      errors.push({ field: 'nationality', message: 'Nationality is required' });
    } else if (!ALLOWED_NATIONALITIES.includes(passenger.nationality)) {
      errors.push({ field: 'nationality', message: 'Invalid nationality' });
    }

    if (passenger.age === undefined || passenger.age === null || passenger.age === '') {
      errors.push({ field: 'age', message: 'Age is required' });
    } else {
      const age = Number(passenger.age);
      if (isNaN(age) || age < 1 || age > 120) {
        errors.push({ field: 'age', message: 'Age must be between 1 and 120' });
      }
    }

    if (!passenger.gender || passenger.gender.trim() === '') {
      errors.push({ field: 'gender', message: 'Gender is required' });
    }

    if (!passenger.flightNumber || passenger.flightNumber.trim() === '') {
      errors.push({ field: 'flightNumber', message: 'Flight number is required' });
    } else if (!FLIGHT_REGEX.test(passenger.flightNumber)) {
      errors.push({ field: 'flightNumber', message: 'Invalid flight format. Expected: AA123 or AA1234' });
    }

    if (!passenger.departureCountry || passenger.departureCountry.trim() === '') {
      errors.push({ field: 'departureCountry', message: 'Departure country is required' });
    }

    if (!passenger.destinationCountry || passenger.destinationCountry.trim() === '') {
      errors.push({ field: 'destinationCountry', message: 'Destination country is required' });
    }

    if (passenger.departureCountry && passenger.destinationCountry && passenger.departureCountry === passenger.destinationCountry) {
      errors.push({ field: 'destinationCountry', message: 'Departure and destination countries must be different' });
    }

    if (!passenger.travelDate || passenger.travelDate.trim() === '') {
      errors.push({ field: 'travelDate', message: 'Travel date is required' });
    } else {
      const travelDate = new Date(passenger.travelDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (travelDate < today) {
        errors.push({ field: 'travelDate', message: 'Travel date cannot be in the past' });
      }
    }

    if (!passenger.email || passenger.email.trim() === '') {
      errors.push({ field: 'email', message: 'Email is required' });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(passenger.email)) {
      errors.push({ field: 'email', message: 'Invalid email format' });
    }

    if (!passenger.phone || passenger.phone.trim() === '') {
      errors.push({ field: 'phone', message: 'Phone number is required' });
    } else if (!/^\d+$/.test(passenger.phone)) {
      errors.push({ field: 'phone', message: 'Phone must contain only numeric digits' });
    }

    return errors;
  }

  static async validateAndCheckDuplicate(
    passenger: any,
    checkDuplicateFn: (passport: string, id?: string) => Promise<boolean>,
    excludePassportId?: string
  ): Promise<ValidationError[]> {
    const errors = this.validatePassenger(passenger, excludePassportId);

    // Check for duplicate passport only if no other errors for passport field
    if (passenger.passportNumber && !errors.some(e => e.field === 'passportNumber')) {
      const isDuplicate = await checkDuplicateFn(passenger.passportNumber, excludePassportId);
      if (isDuplicate) {
        errors.push({ field: 'passportNumber', message: 'Passport number already exists' });
      }
    }

    return errors;
  }
}

export default ValidationService;
