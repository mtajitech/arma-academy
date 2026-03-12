#!/bin/bash
# ─── ARMA Academy — Local Development Setup ─────────────────────────────────
set -e

echo "═══════════════════════════════════════════════════════"
echo "  ARMA Academy — Phase 0 Local Setup"
echo "═══════════════════════════════════════════════════════"

# Prerequisites check
command -v node >/dev/null 2>&1 || { echo "❌ Node.js 20+ required"; exit 1; }
command -v docker >/dev/null 2>&1 || { echo "❌ Docker required"; exit 1; }
command -v git >/dev/null 2>&1 || { echo "❌ Git required"; exit 1; }

NODE_MAJOR=$(node --version | sed 's/v//' | cut -d. -f1)
if [ "$NODE_MAJOR" -lt 20 ]; then
  echo "❌ Node.js 20+ required (found $(node --version))"; exit 1
fi

echo "✓ Prerequisites OK"
echo ""

# Copy .env.example files
echo "Creating .env files from .env.example..."
for f in $(find apps -name ".env.example" 2>/dev/null); do
  dir=$(dirname "$f")
  if [ ! -f "$dir/.env" ]; then
    cp "$f" "$dir/.env"
    echo "  ✓ $dir/.env"
  else
    echo "  · $dir/.env (already exists — skipped)"
  fi
done

echo ""
echo "Installing workspace dependencies..."
npm install

echo ""
echo "Starting infrastructure (PostgreSQL, MongoDB, Redis)..."
docker-compose up -d postgres mongodb redis

echo ""
echo "Waiting for databases to be ready..."
sleep 10

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  Setup complete!"
echo ""
echo "  Run all services:   docker-compose up -d"
echo "  View logs:          docker-compose logs -f"
echo "  Stop everything:    docker-compose down"
echo ""
echo "  Service URLs:"
echo "  API Gateway:        http://localhost:3000"
echo "  Auth Service:       http://localhost:3001"
echo "  LMS Core:           http://localhost:3002"
echo "  Academy Frontend:   http://localhost:3100"
echo "═══════════════════════════════════════════════════════"
