# 1. Project Setup

## Root Setup
- [ ] Create monorepo structure (frontend + backend)
- [ ] Initialize Git repository
- [ ] Add root README.md
- [ ] Configure basic folder structure

---

# 2. Backend Setup (Node.js + Express + TypeScript)

## Initialization
- [ ] Initialize Node.js backend project
- [ ] Configure TypeScript (`tsconfig.json`)
- [ ] Setup nodemon for development
- [ ] Install dependencies:
  - express
  - cors
  - sqlite3
  - express-validator
  - dotenv
  - nodemon
  - typescript

---

## Core Server Setup
- [ ] Create Express server (`app.ts`, `server.ts`)
- [ ] Configure middleware:
  - CORS
  - JSON parsing
  - request logging (console-only)
- [ ] Setup environment config (.env)

---

## Database (SQLite In-Memory)
- [ ] Create SQLite connection using `:memory:`
- [ ] Create passengers table schema
- [ ] Initialize DB on server startup
- [ ] Generate random dummy passengers on startup
- [ ] Insert dummy passengers into DB

---

## Passenger Model Layer
- [ ] Create passenger interface/type
- [ ] Create DB service layer:
  - insert passenger
  - update passenger
  - delete passenger
  - fetch all passengers
  - fetch by id
  - check duplicate passport

---

## Validation Layer
- [ ] Implement validation rules:
  - required fields
  - email format
  - age 1–120
  - passport format
  - flight format regex
  - nationality whitelist
  - departure ≠ destination
  - travel date not in past
  - duplicate passport check
- [ ] Return ALL validation errors together

---

## API Layer (Routes + Controllers)

### Passenger APIs
- [ ] POST /api/passenger/validate
  - validate + insert passenger

- [ ] GET /api/passengers
  - return all passengers

- [ ] PUT /api/passenger/:id
  - update passenger with validation

- [ ] DELETE /api/passenger/:id
  - delete passenger

- [ ] DELETE /api/passengers
  - clear all passengers

---

## Swagger Setup
- [ ] Setup Swagger/OpenAPI
- [ ] Configure /api-docs endpoint
- [ ] Document all APIs
- [ ] Add request/response schemas

---

## Middleware
- [ ] Request logging middleware (console-only)
- [ ] Error handling middleware
- [ ] Validation error formatter

---

# 3. Frontend Setup (Angular + Tailwind)

## Initialization
- [ ] Create Angular project
- [ ] Enable standalone components
- [ ] Install Tailwind CSS
- [ ] Setup routing

---

## Core UI Pages

### Dashboard Page
- [ ] Create main dashboard layout
- [ ] Add passenger list view
- [ ] Add "Add Passenger" button

---

## Components

### Passenger Form Component
- [ ] Create reactive form
- [ ] Add all passenger fields
- [ ] Implement frontend validation rules
- [ ] Submit to backend API
- [ ] Show validation errors
- [ ] Disable submit if invalid

---

### Passenger List Component
- [ ] Display passenger table/card list
- [ ] Show all passengers
- [ ] Add search functionality
- [ ] Add sorting functionality

---

### Passenger Card Component
- [ ] Display single passenger details
- [ ] Add edit button
- [ ] Add delete button

---

## Services

### Passenger Service
- [ ] Create Angular service
- [ ] Implement API calls:
  - getPassengers()
  - addPassenger()
  - updatePassenger()
  - deletePassenger()

---

## UI Features
- [ ] Search passengers (name, passport, flight)
- [ ] Sort passengers (name, flight, date)
- [ ] Show success messages
- [ ] Show error messages
- [ ] Loading indicator during API calls
- [ ] Responsive design using Tailwind

---

# 4. Shared Models

- [ ] Create Passenger interface (frontend)
- [ ] Ensure backend + frontend types match

---

# 5. Validation Rules (Sync Frontend + Backend)

- [ ] Ensure identical validation logic
- [ ] Flight format: ^[A-Z]{2}[0-9]{3,4}$
- [ ] Age: 1–120
- [ ] Email validation
- [ ] Passport format validation
- [ ] Nationality whitelist
- [ ] Travel date validation
- [ ] Departure ≠ Destination

---

# 6. Dummy Data Generation

- [ ] Create random passenger generator
- [ ] Populate DB on backend startup
- [ ] Ensure data resets on restart

---

# 7. Error Handling

- [ ] Standardize API error format:
  - success: false
  - errors: []
- [ ] Handle frontend error display
- [ ] Handle backend validation errors
- [ ] Handle server errors (500)

---

# 8. Testing Tasks

## Unit Tests
- [ ] Validation functions
- [ ] Utility functions

## API Tests
- [ ] POST valid passenger
- [ ] POST invalid passenger
- [ ] GET passengers
- [ ] DELETE passenger

## Validation Tests
- [ ] Duplicate passport
- [ ] Invalid flight format
- [ ] Missing fields
- [ ] Age boundary cases
- [ ] Past travel date
- [ ] Invalid nationality

## Manual Tests
- [ ] Add passenger via UI
- [ ] Edit passenger
- [ ] Delete passenger
- [ ] Search functionality
- [ ] Sorting functionality
- [ ] Error display validation

---

# 9. Documentation

- [ ] Create README.md
- [ ] Add setup instructions
- [ ] Add API documentation
- [ ] Add Swagger usage guide
- [ ] Add architecture overview
- [ ] Add future enhancements section

---

# 10. Constraints Checklist

- [ ] No authentication
- [ ] No external database
- [ ] Console-only logging
- [ ] Lightweight dependencies only
- [ ] Local development only

---

# 11. Final Acceptance Criteria

- [ ] Full CRUD working
- [ ] Validation enforced on frontend + backend
- [ ] In-memory DB resets correctly
- [ ] Dummy data loads on startup
- [ ] Search + sorting working
- [ ] Swagger accessible
- [ ] Clean Angular UI
- [ ] Modular backend architecture