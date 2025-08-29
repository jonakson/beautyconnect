#!/bin/bash

# Deploy Backend API Service
# This script builds and deploys the backend service

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "🚀 Backend Deployment Script"
echo "============================="

# Check if .env.backend exists
if [ ! -f "$PROJECT_ROOT/.env.backend" ]; then
    echo "❌ Error: .env.backend not found!"
    echo "   Copy .env.backend.example to .env.backend and configure it."
    exit 1
fi

# Ensure network exists
echo "🔧 Checking network..."
bash "$SCRIPT_DIR/setup-network.sh"

# Check if databases are running
echo "🔍 Checking dependencies..."
if ! docker ps | grep -q beautyconnect_postgres; then
    echo "⚠️  PostgreSQL is not running. Deploy it first with:"
    echo "   bash scripts/deploy-postgres.sh"
    read -p "Continue anyway? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

if ! docker ps | grep -q beautyconnect_redis; then
    echo "⚠️  Redis is not running. Deploy it first with:"
    echo "   bash scripts/deploy-redis.sh"
    read -p "Continue anyway? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Deploy Backend
echo ""
echo "📦 Building and deploying Backend..."
cd "$PROJECT_ROOT"

# Load environment variables
export $(cat .env.backend | grep -v '^#' | xargs)

# Build and start backend
docker compose -f compose.backend.yml up -d --build

# Wait for backend to be healthy
echo "⏳ Waiting for Backend to be healthy..."
MAX_ATTEMPTS=60
ATTEMPT=0

while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
    if curl -f http://localhost:${API_PORT:-4000}/health >/dev/null 2>&1; then
        echo "✅ Backend is healthy and ready!"
        break
    fi
    
    ATTEMPT=$((ATTEMPT + 1))
    echo "   Attempt $ATTEMPT/$MAX_ATTEMPTS..."
    sleep 2
done

if [ $ATTEMPT -eq $MAX_ATTEMPTS ]; then
    echo "❌ Backend failed to become healthy"
    echo "   Check logs with: docker logs beautyconnect_backend"
    exit 1
fi

# Run database migrations if needed
echo ""
read -p "Run database migrations? (y/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🔄 Running database migrations..."
    docker exec beautyconnect_backend npm run db:migrate
fi

# Show deployment info
echo ""
echo "📊 Backend Deployment Info:"
echo "   URL: http://localhost:${API_PORT:-4000}"
echo "   Health: http://localhost:${API_PORT:-4000}/health"
echo "   Environment: ${NODE_ENV:-production}"
echo ""
echo "💡 Tips:"
echo "   - View logs: docker logs -f beautyconnect_backend"
echo "   - Shell access: docker exec -it beautyconnect_backend sh"
echo "   - Run migrations: docker exec beautyconnect_backend npm run db:migrate"
echo "   - Prisma Studio: docker exec beautyconnect_backend npx prisma studio"