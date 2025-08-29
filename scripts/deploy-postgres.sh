#!/bin/bash

# Deploy PostgreSQL Database Service
# This script deploys or updates the PostgreSQL database

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "🐘 PostgreSQL Deployment Script"
echo "================================"

# Check if .env.postgres exists
if [ ! -f "$PROJECT_ROOT/.env.postgres" ]; then
    echo "⚠️  Warning: .env.postgres not found. Using default values."
    echo "   Copy .env.postgres.example to .env.postgres and configure it."
fi

# Ensure network exists
echo "🔧 Checking network..."
bash "$SCRIPT_DIR/setup-network.sh"

# Deploy PostgreSQL
echo ""
echo "📦 Deploying PostgreSQL..."
cd "$PROJECT_ROOT"

# Load environment variables
if [ -f .env.postgres ]; then
    export $(cat .env.postgres | grep -v '^#' | xargs)
fi

# Stop existing container if running
docker compose -f compose.postgres.yml down 2>/dev/null || true

# Start PostgreSQL
docker compose -f compose.postgres.yml up -d

# Wait for PostgreSQL to be healthy
echo "⏳ Waiting for PostgreSQL to be healthy..."
MAX_ATTEMPTS=30
ATTEMPT=0

while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
    if docker exec beautyconnect_postgres pg_isready -U beautyconnect_user -d beautyconnect >/dev/null 2>&1; then
        echo "✅ PostgreSQL is healthy and ready!"
        break
    fi
    
    ATTEMPT=$((ATTEMPT + 1))
    echo "   Attempt $ATTEMPT/$MAX_ATTEMPTS..."
    sleep 2
done

if [ $ATTEMPT -eq $MAX_ATTEMPTS ]; then
    echo "❌ PostgreSQL failed to become healthy"
    echo "   Check logs with: docker logs beautyconnect_postgres"
    exit 1
fi

# Show connection info
echo ""
echo "📊 PostgreSQL Connection Info:"
echo "   Host: localhost (or 'postgres' from other containers)"
echo "   Port: ${POSTGRES_PORT:-5432}"
echo "   Database: beautyconnect"
echo "   User: beautyconnect_user"
echo ""
echo "💡 Tips:"
echo "   - View logs: docker logs -f beautyconnect_postgres"
echo "   - Connect: docker exec -it beautyconnect_postgres psql -U beautyconnect_user -d beautyconnect"
echo "   - Backup: docker exec beautyconnect_postgres pg_dump -U beautyconnect_user beautyconnect > backup.sql"