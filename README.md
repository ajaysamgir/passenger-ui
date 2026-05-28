# ✈️ Airline Passenger Validation System

A full-stack web application for validating and managing airline passenger records. Built with Angular, Express.js, and SQLite.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation & Running

#### Backend Setup
```bash
cd backend
npm install
npm run dev
```

Backend runs on `http://localhost:3000`

#### Frontend Setup (in a new terminal)
```bash
cd frontend
npm install
npm start
```

Frontend runs on `http://localhost:4200`

## 📋 Project Structure

```
passenger-ui/
├── backend/
│   ├── src/
│   │   ├── models/          # TypeScript interfaces
│   │   ├── database/        # SQLite in-memory database
│   │   ├── services/        # Business logic & validation
│   │   ├── controllers/     # Request handlers
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Express middleware
│   │   ├── app.ts          # Express app setup
│   │   └── server.ts       # Server entry point
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── models/              # Data interfaces
│   │   │   ├── services/            # API services
│   │   │   ├── components/
│   │   │   │   ├── passenger-form/  # Add passenger form
│   │   │   │   ├── passenger-list/  # List & search
│   │   │   │   └── passenger-card/  # Individual passenger
│   │   │   ├── pages/               # Page components
│   │   │   └── app.component.ts    # Root component
│   │   ├── main.ts                 # Bootstrap
│   │   └── index.html
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

## 🔧 Technology Stack

### Frontend
- **Angular 17** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first styling
- **Reactive Forms** - Form management
- **HttpClient** - API communication

### Backend
- **Express.js** - Web framework
- **TypeScript** - Type-safe Node.js
- **SQLite** - In-memory database
- **express-validator** - Data validation
- **CORS** - Cross-origin resource sharing

## 📝 Features

### Passenger Management
- ✅ Add new passengers with comprehensive validation
- ✅ View all passengers in searchable/sortable list
- ✅ Edit passenger information
- ✅ Delete individual passengers or all at once

### Validation
- **Frontend Validation**
  - Required field checks
  - Email format validation
  - Age range (1-120)
  - Passport format
  - Flight number format: `AA123` or `AA1234`
  - Departure ≠ Destination
  - Travel date must not be in past
  
- **Backend Validation**
  - All frontend rules enforced on server
  - Duplicate passport number prevention
  - Allowed nationalities check

### Search & Sorting
- Search by name, passport number, or flight
- Sort by name, flight number, or travel date
- Real-time filter updates

### UI Features
- Responsive design (mobile-friendly)
- Real-time error messages
- Success notifications
- Loading states
- Clean, minimal Tailwind CSS styling

## 📚 API Endpoints

### POST `/api/passenger/validate`
Add and validate a new passenger.

**Request:**
```json
{
  "fullName": "John Doe",
  "passportNumber": "A1234567",
  "nationality": "USA",
  "age": 30,
  "gender": "Male",
  "flightNumber": "AI101",
  "departureCountry": "USA",
  "destinationCountry": "UK",
  "travelDate": "2026-06-01",
  "email": "john@example.com",
  "phone": "1234567890"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Passenger validated successfully",
  "data": { "id": 1 }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "errors": ["Invalid email format", "Age must be between 1 and 120"]
}
```

### GET `/api/passengers`
Retrieve all passengers.

### PUT `/api/passenger/:id`
Update passenger information.

### DELETE `/api/passenger/:id`
Delete a specific passenger.

### DELETE `/api/passengers`
Delete all passengers.

## ✅ Acceptance Criteria

- [x] Full CRUD operations working
- [x] Frontend and backend validation synchronized
- [x] In-memory database with dummy data initialization
- [x] Search and sorting functionality
- [x] Responsive Angular UI with Tailwind CSS
- [x] Modular backend architecture
- [x] Console logging for debugging
- [x] Error handling with detailed messages

## 🔄 Database

### SQLite In-Memory
- Auto-initializes on server startup
- Preloaded with 10 random dummy passengers
- Resets on server restart

### Passenger Table Schema
```
passengers
├── id: INTEGER PRIMARY KEY AUTOINCREMENT
├── fullName: TEXT NOT NULL
├── passportNumber: TEXT UNIQUE NOT NULL
├── nationality: TEXT NOT NULL
├── age: INTEGER NOT NULL
├── gender: TEXT NOT NULL
├── flightNumber: TEXT NOT NULL
├── departureCountry: TEXT NOT NULL
├── destinationCountry: TEXT NOT NULL
├── travelDate: TEXT NOT NULL
├── email: TEXT NOT NULL
└── phone: TEXT NOT NULL
```

## 🛡️ Validation Rules

### Allowed Nationalities
- India
- USA
- United Kingdom
- Germany
- France
- Netherlands
- Canada
- Australia

### Flight Format
- Pattern: `^[A-Z]{2}[0-9]{3,4}$`
- Examples: `AI101`, `BA2045`, `KL999`

## 📝 Logging

- Console-only logging
- Logs API requests, validation errors, and database operations
- Timestamps included in all logs

## 🚫 Constraints

- ❌ No authentication required
- ❌ No persistent database (in-memory only)
- ❌ No external dependencies beyond npm packages
- ❌ Local development only

## 🔮 Future Enhancements

- User authentication system
- Persistent PostgreSQL/MongoDB database
- Pagination for large datasets
- Advanced filtering and reporting
- Email notifications
- File import/export (CSV/JSON)
- Airline API integration

## 📄 License

MIT
