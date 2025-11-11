#!/bin/bash

# Adventure Game Template Launcher
# Double-click this file to start the application

cd "$(dirname "$0")"

echo "🎮 Adventure Game Template Launcher"
echo "==================================="
echo ""

# Check if node_modules exists, if not, install dependencies
if [ ! -d "node_modules" ]; then
    echo "📦 First time setup - Installing dependencies..."
    echo "This may take a minute..."
    npm install
    echo ""
fi

echo "🚀 Starting the application..."
echo ""
echo "This will start both the backend server and frontend."
echo "The app will open in your browser automatically."
echo "If it doesn't open, go to: http://localhost:5173"
echo ""
echo "💾 Your data will be saved to: data/game-data.json"
echo ""
echo "⚠️  IMPORTANT: Keep this window open while using the app!"
echo "To stop the app, close this window or press Ctrl+C"
echo ""
echo "==================================="
echo ""

# Start both the backend server and frontend dev server
npm start -- --open

echo ""
echo "Application closed. You can close this window now."
