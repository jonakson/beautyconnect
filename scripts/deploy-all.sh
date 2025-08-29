#!/bin/bash

# Deploy All BeautyConnect Services
# This script deploys all services in the correct order

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🚀 BeautyConnect Full Deployment"
echo "=================================="
echo ""
echo "This script will deploy all services in the correct order:"
echo "1. Network setup"
echo "2. PostgreSQL database"
echo "3. Redis cache"
echo "4. Backend API"
echo "5. Frontend application"
echo ""

read -p "Continue with full deployment? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Deployment cancelled."
    exit 0
fi

# Deploy services in order
echo ""
echo "1️⃣  Setting up network..."
bash "$SCRIPT_DIR/setup-network.sh"

echo ""
echo "2️⃣  Deploying PostgreSQL..."
bash "$SCRIPT_DIR/deploy-postgres.sh"

echo ""
echo "3️⃣  Deploying Redis..."
bash "$SCRIPT_DIR/deploy-redis.sh"

echo ""
echo "4️⃣  Deploying Backend..."
bash "$SCRIPT_DIR/deploy-backend.sh"

echo ""
echo "5️⃣  Deploying Frontend..."
bash "$SCRIPT_DIR/deploy-frontend.sh"

# Summary
echo ""
echo "✅ All services deployed successfully!"
echo ""
echo "📊 Service Status:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep beautyconnect || true
echo ""
echo "🌐 Access points:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:4000"
echo "   PostgreSQL: localhost:5432"
echo "   Redis: localhost:6379"
echo ""
echo "💡 Useful commands:"
echo "   View all logs: docker logs -f \$(docker ps -q --filter name=beautyconnect)"
echo "   Stop all: docker stop \$(docker ps -q --filter name=beautyconnect)"
echo "   Remove all: docker rm -f \$(docker ps -aq --filter name=beautyconnect)"