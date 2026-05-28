# ✈️ Airline Passenger Validation System – Developer Specification

## 1. Overview

This project is a full-stack web application for validating and managing airline passenger records. It is designed for local development with minimal dependencies and low memory footprint.

The system allows users to:
- Add passenger details via a web UI
- Validate passenger data via backend rules
- Store valid passengers in an in-memory SQLite database
- View, search, sort, edit, and delete passengers

The database resets on every backend restart and is initialized with randomly generated dummy passenger data.

---

## 2. Technology Stack

### Frontend
- Angular (latest version)
- TypeScript
- Reactive Forms
- Angular HttpClient
- Tailwind CSS (minimal usage)
- Standalone Components

### Backend
- Node.js
- Express.js
- TypeScript
- SQLite (`:memory:` mode)
- express-validator
- cors
- dotenv
- nodemon

### Database
- SQLite in-memory database (`:memory:`)
- Auto-initialized on server startup
- Preloaded with random dummy passengers

---

## 3. System Architecture

Frontend → Express REST API → SQLite In-Memory DB

Flow:
1. User submits passenger form
2. Angular sends API request
3. Backend validates data
4. If valid → store in DB
5. If invalid → return all validation errors
6. UI updates passenger list

---

## 4. Functional Requirements

### 4.1 Passenger Entry Form

Fields:
- Full Name
- Passport Number
- Nationality
- Age
- Gender
- Flight Number
- Departure Country
- Destination Country
- Travel Date
- Email Address
- Phone Number

---

### 4.2 UI Features

- Add Passenger form (card/modal)
- Passenger list view
- Edit passenger details
- Delete passenger
- Search passengers (name, passport, flight)
- Sort passengers (name, flight, date)
- Show validation errors
- Show success messages
- Disable submit on invalid form

---

## 5. Frontend Validation Rules

- Required fields validation
- Email format validation
- Age: 1–120
- Passport alphanumeric format
- Flight number: `AA123` or `AA1234`
- Phone numeric only
- Departure ≠ Destination
- Travel date must not be in past

---

## 6. Backend Validation Rules

All frontend validations must be revalidated on backend.

Additional rules:
- Duplicate passport numbers not allowed
- Invalid flight format rejected
- Age must be 1–120
- Missing fields rejected
- Nationality must be in allowed list
- Departure ≠ Destination
- Travel date cannot be in past

### Validation Response Rule:
Return ALL validation errors together

---

## 7. Nationality Rules

Allowed countries:
- India
- USA
- United Kingdom
- Germany
- France
- Netherlands
- Canada
- Australia

---

## 8. Flight Number Format

Regex:
```

^[A-Z]{2}[0-9]{3,4}$

````

Examples:
- AI101
- BA2045
- KL999

---

## 9. Database Design (SQLite In-Memory)

Table: passengers

| Field | Type |
|------|------|
| id | INTEGER PRIMARY KEY |
| fullName | TEXT |
| passportNumber | TEXT UNIQUE |
| nationality | TEXT |
| age | INTEGER |
| gender | TEXT |
| flightNumber | TEXT |
| departureCountry | TEXT |
| destinationCountry | TEXT |
| travelDate | TEXT |
| email | TEXT |
| phone | TEXT |

---

## 10. API Specification

### POST /api/passenger/validate

Request:
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
````

Success Response:

```json
{
  "success": true,
  "message": "Passenger validated successfully",
  "data": {
    "id": 1
  }
}
```

Failure Response:

```json
{
  "success": false,
  "errors": [
    "Invalid passport number",
    "Travel date cannot be in past"
  ]
}
```

---

### GET /api/passengers

Returns all passengers.

---

### PUT /api/passenger/:id

Update passenger after validation.

---

### DELETE /api/passenger/:id

Delete passenger.

---

### DELETE /api/passengers

Clear all passengers.

---

## 11. Swagger / OpenAPI

* Available at:
  /api-docs

---

## 12. Dummy Data Initialization

* Generate random passengers on startup
* Insert into in-memory DB

---

## 13. Frontend Architecture

/frontend/src/app

* components/

  * passenger-form
  * passenger-list
  * passenger-card
* services/
* models/
* pages/

---

## 14. Backend Architecture

/backend/src

* routes/
* controllers/
* services/
* database/
* middleware/
* utils/
* app.ts
* server.ts

---

## 15. Logging

* Console-only logging
* Log API requests, validation errors, DB operations

---

## 16. UI Design

* Tailwind CSS
* Card-based layout
* Responsive design
* Minimal styling

---

## 17. Error Handling

* 200 → success
* 400 → validation error
* 500 → server error
* Backend returns all validation errors

---

## 18. Testing Strategy

### Unit Tests

* Validation functions
* Utilities

### API Tests

* POST valid passenger
* POST invalid passenger
* GET passengers
* DELETE passenger

### Validation Tests

* Duplicate passport
* Invalid flight format
* Age validation
* Missing fields
* Invalid nationality
* Past travel date

### Manual Tests

* Add passenger
* Edit passenger
* Delete passenger
* Search
* Sorting
* Error display

---

## 19. Constraints

* Local execution only
* No authentication
* No external database
* Minimal dependencies

---

## 20. Startup Commands

Backend:

```
npm install
npm run dev
```

Frontend:

```
npm install
ng serve
```

---

## 21. Future Enhancements

* Authentication system
* Persistent database
* Pagination
* Cloud deployment
* Airline API integration

---

## 22. Success Criteria

* Full CRUD working
* Validation on frontend + backend
* In-memory DB reset works
* Search + sorting works
* Swagger available
* Clean Angular UI
* Modular backend structure

```

---

If you want next step, I can generate:
- full **Copilot-ready file-by-file prompts**
- or **complete working codebase**
- or **step-by-step build guide**
- or **GitHub repo structure with commits plan**
```
