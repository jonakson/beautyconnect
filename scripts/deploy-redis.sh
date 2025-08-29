#!/bin/bash

# Deploy Redis Cache Service
# This script deploys or updates the Redis cache

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "🔴 Redis Deployment Script"
echo "==========================="

# Check if .env.redis exists
if [ ! -f "$PROJECT_ROOT/.env.redis" ]; then
    echo "⚠️  Warning: .env.redis not found. Using default values."
    echo "   Copy .env.redis.example to .env.redis and configure it."
fi

# Ensure network exists
echo "🔧 Checking network..."
bash "$SCRIPT_DIR/setup-network.sh"

# Deploy Redis
echo ""
echo "📦 Deploying Redis..."
cd "$PROJECT_ROOT"

# Load environment variables
if [ -f .env.redis ]; then
    export $(cat .env.redis | grep -v '^#' | xargs)
fi

# Stop existing container if running
docker compose -f compose.redis.yml down 2>/dev/null || true

# Start Redis
docker compose -f compose.redis.yml up -d

# Wait for Redis to be healthy
echo "⏳ Waiting for Redis to be healthy..."
MAX_ATTEMPTS=30
ATTEMPT=0

while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
    if docker exec beautyconnect_redis redis-cli ping >/dev/null 2>&1; then
        echo "✅ Redis is healthy and ready!"
        break
    fi
    
    ATTEMPT=$((ATTEMPT + 1))
    echo "   Attempt $ATTEMPT/$MAX_ATTEMPTS..."
    sleep 1
done

if [ $ATTEMPT -eq $MAX_ATTEMPTS ]; then
    echo "❌ Redis failed to become healthy"
    echo "   Check logs with: docker logs beautyconnect_redis"
    exit 1
fi

# Show connection info
echo ""
echo "📊 Redis Connection Info:"
echo "   Host: localhost (or 'redis' from other containers)"
echo "   Port: ${REDIS_PORT:-6379}"
echo ""
echo "💡 Tips:"
echo "   - View logs: docker logs -f beautyconnect_redis"
echo "   - Connect CLI: docker exec -it beautyconnect_redis redis-cli"
echo "   - Monitor: docker exec -it beautyconnect_redis redis-cli monitor"
echo "   - Info: docker exec -it beautyconnect_redis redis-cli info"