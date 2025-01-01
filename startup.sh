#!/bin/bash
set -euo pipefail

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is not installed. Please install Node.js and try again." >&2
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is not installed. Please install npm and try again." >&2
  exit 1
fi

if [ ! -f .env ]; then
  echo ".env file not found. Please create a .env file and try again." >&2
  exit 1
fi

echo "Installing project dependencies..."
npm install --force
echo "Project dependencies installed."

echo "Building the React application..."
npm run build
echo "React application built."

echo "Starting the application..."
npm run preview