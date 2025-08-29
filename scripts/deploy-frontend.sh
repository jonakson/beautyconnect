#!/bin/bash

# Deploy Frontend Next.js Service
# This script builds and deploys the frontend service

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "🎨 Frontend Deployment Script"
echo "=============================="

# Check if .env.frontend exists
if [ ! -f "$PROJECT_ROOT/.env.frontend" ]; then
    echo "❌ Error: .env.frontend not found!"
    echo "   Copy .env.frontend.example to .env.frontend and configure it."
    exit 1
fi

# Ensure network exists
echo "🔧 Checking network..."
bash "$SCRIPT_DIR/setup-network.sh"

# Check if backend is running
echo "🔍 Checking dependencies..."
if ! docker ps | grep -q beautyconnect_backend; then
    echo "⚠️  Backend is not running. Deploy it first with:"
    echo "   bash scripts/deploy-backend.sh"
    read -p "Continue anyway? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Deploy Frontend
echo ""
echo "📦 Building and deploying Frontend..."
cd "$PROJECT_ROOT"

# Load environment variables
export $(cat .env.frontend | grep -v '^#' | xargs)

# Build and start frontend
docker compose -f compose.frontend.yml up -d --build

# Wait for frontend to be healthy
echo "⏳ Waiting for Frontend to be healthy..."
MAX_ATTEMPTS=60
ATTEMPT=0

while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
    if curl -f http://localhost:${FRONTEND_PORT:-3000} >/dev/null 2>&1; then
        echo "✅ Frontend is healthy and ready!"
        break
    fi
    
    ATTEMPT=$((ATTEMPT + 1))
    echo "   Attempt $ATTEMPT/$MAX_ATTEMPTS..."
    sleep 2
done

if [ $ATTEMPT -eq $MAX_ATTEMPTS ]; then
    echo "❌ Frontend failed to become healthy"
    echo "   Check logs with: docker logs beautyconnect_frontend"
    exit 1
fi

# Show deployment info
echo ""
echo "📊 Frontend Deployment Info:"
echo "   URL: http://localhost:${FRONTEND_PORT:-3000}"
echo "   API URL: ${NEXT_PUBLIC_API_URL:-http://localhost:4000}"
echo "   Environment: ${NODE_ENV:-production}"
echo ""
echo "💡 Tips:"
echo "   - View logs: docker logs -f beautyconnect_frontend"
echo "   - Shell access: docker exec -it beautyconnect_frontend sh"
echo "   - Build info: docker exec beautyconnect_frontend cat .next/BUILD_ID"