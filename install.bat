@echo off
REM Install Backend Dependencies
echo Installing backend dependencies...
cd backend
call npm install --legacy-peer-deps
echo Backend installation complete!

REM Install Frontend Dependencies  
echo Installing frontend dependencies...
cd ..\frontend
call npm install --legacy-peer-deps
echo Frontend installation complete!

cd ..
echo ✅ All dependencies installed successfully!
echo.
echo Next steps:
echo 1. In terminal 1: cd backend ^&^& npm run dev
echo 2. In terminal 2: cd frontend ^&^& npm start
echo.
echo Frontend: http://localhost:4200
echo Backend:  http://localhost:3000
pause
