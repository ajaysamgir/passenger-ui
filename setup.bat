@echo off
setlocal enabledelayedexpansion

cd /d "%~dp0"

REM Create backend directories
mkdir backend\src\routes
mkdir backend\src\controllers
mkdir backend\src\services
mkdir backend\src\database
mkdir backend\src\middleware
mkdir backend\src\utils
mkdir backend\src\models

REM Create frontend directories
mkdir frontend\src\app\components\passenger-form
mkdir frontend\src\app\components\passenger-list
mkdir frontend\src\app\components\passenger-card
mkdir frontend\src\app\services
mkdir frontend\src\app\models
mkdir frontend\src\app\pages

echo Directories created successfully!
