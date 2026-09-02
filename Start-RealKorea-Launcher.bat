@echo off
title Real Korea Editorial System Launcher
echo ========================================================
echo   🇰🇷 Real Korea Server & Editorial Dashboard Launcher
echo ========================================================
echo.

cd /d %~dp0site
echo 1. Checking and starting Next.js local server on port 3000...
start " npm run dev

echo 2. Opening Admin Audit Dashboard in your browser...
timeout /t 3 /nobreak >nul
start http://localhost:3000/admin/audit

echo.
echo ✅ Server is running and browser opened!
echo You can keep this window open or minimize it.
echo.
pause

