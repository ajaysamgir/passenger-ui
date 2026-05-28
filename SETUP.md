# Setup & Installation Guide

## Quick Installation

### Option 1: Automated Script (Recommended)

**Windows:**
```batch
install.bat
```

**macOS/Linux:**
```bash
bash install.sh
```

### Option 2: Manual Installation

#### Backend Setup
```bash
cd backend
npm install --legacy-peer-deps
npm run build
```

#### Frontend Setup
```bash
cd frontend
npm install --legacy-peer-deps
```

## Running the Application

### Terminal 1 - Start Backend Server
```bash
cd backend
npm run dev
```

You should see:
```
Server running on http://localhost:3000
API docs available at http://localhost:3000/api-docs
```

### Terminal 2 - Start Frontend Server
```bash
cd frontend
npm start
```

You should see:
```
✔ Compiled successfully
Application bundle generation complete
```

### Access the Application
- **Frontend UI:** http://localhost:4200
- **Backend API:** http://localhost:3000
- **API Documentation:** http://localhost:3000/api-docs

## Troubleshooting

### npm install errors

#### Error: errno -4048 (Permission Denied)
```bash
npm cache clean --force
npm install --legacy-peer-deps
```

#### Error: ERESOLVE unable to resolve dependency tree
```bash
npm install --legacy-peer-deps --force
```

#### Error: Module not found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Port Already in Use

#### Backend Port 3000 in use
```bash
# Change PORT in backend/.env
PORT=3001
npm run dev
```

#### Frontend Port 4200 in use
```bash
ng serve --port 4300
```

### CORS Errors

If you see CORS errors in browser console, ensure:
1. Backend is running on http://localhost:3000
2. Frontend is on http://localhost:4200
3. Backend CORS is configured (should be automatic)

### Database Issues

The SQLite database is in-memory and resets on server restart.

To see dummy data:
1. Start backend
2. Navigate to frontend
3. You should see 10 random passengers pre-loaded

## Project Structure

```
backend/
├── src/
│   ├── models/          # TypeScript interfaces
│   ├── database/        # SQLite database
│   ├── services/        # Validation logic
│   ├── controllers/     # API handlers
│   ├── routes/          # API routes
│   ├── middleware/      # Express middleware
│   ├── app.ts          # Express app
│   └── server.ts       # Entry point
├── package.json
├── tsconfig.json
└── jest.config.js

frontend/
├── src/
│   ├── app/
│   │   ├── models/         # Data interfaces
│   │   ├── services/       # HTTP services
│   │   ├── components/
│   │   │   ├── passenger-form/
│   │   │   ├── passenger-list/
│   │   │   └── passenger-card/
│   │   └── app.component.ts
│   ├── main.ts
│   └── index.html
├── angular.json
├── package.json
└── tsconfig.json
```

## Testing

### Backend Unit Tests
```bash
cd backend
npm test
```

### Manual Testing

#### Test Add Passenger
1. Fill form in UI
2. Click "Add Passenger"
3. Should appear in list immediately

#### Test Validation
1. Try invalid email → error message
2. Try age > 120 → error message
3. Try duplicate passport → error message
4. Try past date → error message

#### Test Search
1. Type passenger name → filtered results

#### Test Sort
1. Select "Sort by Flight" → sorted by flight number
2. Select "Sort by Date" → sorted by travel date

#### Test Edit
1. Click "Edit" on a passenger card
2. Modify fields
3. Click "Save" → updates immediately

#### Test Delete
1. Click "Delete" on passenger
2. Confirm deletion
3. Passenger removed from list

## API Endpoints

### Create Passenger
```
POST /api/passenger/validate
Content-Type: application/json

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

### Get All Passengers
```
GET /api/passengers
```

### Update Passenger
```
PUT /api/passenger/:id
Content-Type: application/json
{
  "age": 31,
  "email": "newemail@example.com"
}
```

### Delete Passenger
```
DELETE /api/passenger/:id
```

### Delete All Passengers
```
DELETE /api/passengers
```

## Environment Variables

### Backend (.env)
```
PORT=3000
NODE_ENV=development
```

### Frontend
- API URL: http://localhost:3000/api (hardcoded in passenger.service.ts)

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Module not found | Run `npm install` again with `--legacy-peer-deps` |
| Port in use | Change PORT in .env or use different port with --port flag |
| CORS errors | Ensure backend is running and CORS enabled |
| Database empty | Restart backend to reinitialize dummy data |
| Form not submitting | Check browser console for validation errors |

## Development Tips

1. **Hot Reload**
   - Backend: Automatically restarts on file changes (nodemon)
   - Frontend: Automatically updates on file changes (ng serve)

2. **Debugging**
   - Backend: Check terminal output
   - Frontend: Use Chrome DevTools (F12)

3. **Validation Rules**
   - All validation rules are in `backend/src/services/ValidationService.ts`
   - Frontend mirrors backend validation
   - Server always double-checks validation

## Next Steps

1. Verify both servers start without errors
2. Load http://localhost:4200 in browser
3. See 10 dummy passengers loaded
4. Try adding a new passenger
5. Test search, sort, edit, delete features

## Support

For more details, see:
- [README.md](./README.md) - Project overview
- [specification.md](./specification.md) - Full specifications
- [TODO.md](./TODO.md) - Task tracking
