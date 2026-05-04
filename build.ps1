# PowerShell script to build Electron app
# Run this as Administrator if you get symlink errors

$env:CSC_IDENTITY_AUTO_DISCOVERY="false"
$env:WIN_CSC_LINK=""

Set-Location "E:\Gemini\CommandManager\command-manager-docker"

Write-Host "Starting build..." -ForegroundColor Green
npm run build

Write-Host "Build complete!" -ForegroundColor Green
Write-Host "Check dist folder for output files" -ForegroundColor Yellow
