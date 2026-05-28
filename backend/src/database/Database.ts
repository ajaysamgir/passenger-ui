import sqlite3 from 'sqlite3';
import { Passenger } from '../models/Passenger';

const ALLOWED_NATIONALITIES = [
  'India',
  'USA',
  'United Kingdom',
  'Germany',
  'France',
  'Netherlands',
  'Canada',
  'Australia'
];

export class Database {
  private db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database(':memory:');
  }

  async initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.run(
          `
          CREATE TABLE passengers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fullName TEXT NOT NULL,
            passportNumber TEXT UNIQUE NOT NULL,
            nationality TEXT NOT NULL,
            age INTEGER NOT NULL,
            gender TEXT NOT NULL,
            flightNumber TEXT NOT NULL,
            departureCountry TEXT NOT NULL,
            destinationCountry TEXT NOT NULL,
            travelDate TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL
          )
          `,
          (err) => {
            if (err) reject(err);
            else this.insertDummyData().then(resolve).catch(reject);
          }
        );
      });
    });
  }

  private async insertDummyData(): Promise<void> {
    const dummyPassengers: Passenger[] = this.generateDummyPassengers();
    
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        const stmt = this.db.prepare(
          `
          INSERT INTO passengers 
          (fullName, passportNumber, nationality, age, gender, flightNumber, departureCountry, destinationCountry, travelDate, email, phone)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `
        );

        dummyPassengers.forEach((passenger) => {
          stmt.run([
            passenger.fullName,
            passenger.passportNumber,
            passenger.nationality,
            passenger.age,
            passenger.gender,
            passenger.flightNumber,
            passenger.departureCountry,
            passenger.destinationCountry,
            passenger.travelDate,
            passenger.email,
            passenger.phone
          ]);
        });

        stmt.finalize((err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    });
  }

  private generateDummyPassengers(): Passenger[] {
    const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emma', 'Robert', 'Lisa'];
    const lastNames = ['Doe', 'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller'];
    const nationalities = ALLOWED_NATIONALITIES;
    const genders = ['Male', 'Female'];
    const countries = ['India', 'USA', 'United Kingdom', 'Germany', 'France', 'Netherlands', 'Canada', 'Australia'];

    const generateFutureDate = () => {
      const date = new Date();
      date.setDate(date.getDate() + Math.floor(Math.random() * 180) + 1);
      return date.toISOString().split('T')[0];
    };

    const passengers: Passenger[] = [];
    for (let i = 0; i < 10; i++) {
      const departure = countries[Math.floor(Math.random() * countries.length)];
      let destination = countries[Math.floor(Math.random() * countries.length)];
      while (destination === departure) {
        destination = countries[Math.floor(Math.random() * countries.length)];
      }

      passengers.push({
        fullName: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
        passportNumber: `P${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
        nationality: nationalities[Math.floor(Math.random() * nationalities.length)],
        age: Math.floor(Math.random() * 60) + 18,
        gender: genders[Math.floor(Math.random() * genders.length)],
        flightNumber: `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 9000) + 100}`,
        departureCountry: departure,
        destinationCountry: destination,
        travelDate: generateFutureDate(),
        email: `user${i}@example.com`,
        phone: `${Math.floor(Math.random() * 9000000000) + 1000000000}`
      });
    }

    return passengers;
  }

  async insertPassenger(passenger: Passenger): Promise<number> {
    return new Promise((resolve, reject) => {
      this.db.run(
        `
        INSERT INTO passengers 
        (fullName, passportNumber, nationality, age, gender, flightNumber, departureCountry, destinationCountry, travelDate, email, phone)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          passenger.fullName,
          passenger.passportNumber,
          passenger.nationality,
          passenger.age,
          passenger.gender,
          passenger.flightNumber,
          passenger.departureCountry,
          passenger.destinationCountry,
          passenger.travelDate,
          passenger.email,
          passenger.phone
        ],
        function(err) {
          if (err) reject(err);
          else resolve(this.lastID);
        }
      );
    });
  }

  async getPassengers(): Promise<Passenger[]> {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM passengers', (err, rows) => {
        if (err) reject(err);
        else resolve(rows || []);
      });
    });
  }

  async getPassengerById(id: number): Promise<Passenger | undefined> {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM passengers WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        else resolve(row as Passenger | undefined);
      });
    });
  }

  async updatePassenger(id: number, passenger: Partial<Passenger>): Promise<void> {
    const updates: string[] = [];
    const values: any[] = [];

    Object.entries(passenger).forEach(([key, value]) => {
      if (key !== 'id' && value !== undefined) {
        updates.push(`${key} = ?`);
        values.push(value);
      }
    });

    if (updates.length === 0) return;

    values.push(id);

    return new Promise((resolve, reject) => {
      this.db.run(
        `UPDATE passengers SET ${updates.join(', ')} WHERE id = ?`,
        values,
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  }

  async deletePassenger(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run('DELETE FROM passengers WHERE id = ?', [id], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  async deleteAllPassengers(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run('DELETE FROM passengers', (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  async checkDuplicatePassport(passportNumber: string, excludeId?: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let query = 'SELECT COUNT(*) as count FROM passengers WHERE passportNumber = ?';
      const params: any[] = [passportNumber];

      if (excludeId) {
        query += ' AND id != ?';
        params.push(excludeId);
      }

      this.db.get(query, params, (err, row: any) => {
        if (err) reject(err);
        else resolve((row?.count || 0) > 0);
      });
    });
  }

  close(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}

export default Database;
