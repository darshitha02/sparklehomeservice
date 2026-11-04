@echo off
title SparkleHome - Online Household Cleaning Platform
color 0B

echo ======================================================================
echo          SPARKLEHOME - ONLINE HOUSEHOLD CLEANING PLATFORM
echo ======================================================================
echo.
echo [*] Checking Python environment...
python --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [!] Python is not found in PATH! Please install Python 3.8+ to continue.
    pause
    exit /b 1
)

echo [*] Verifying Flask installation...
python -c "import flask" >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [*] Installing Flask framework...
    pip install -r requirements.txt
)

echo.
echo ======================================================================
echo [*] Starting SparkleHome Local Web Server...
echo [*] URL: http://127.0.0.1:5000
echo [*] Press Ctrl+C in this terminal window to stop the server anytime.
echo ======================================================================
echo.

:: Launch browser in background after 2 seconds
start "" http://127.0.0.1:5000

:: Start the Flask app
python app.py
pause
