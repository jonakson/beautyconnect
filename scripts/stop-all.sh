#!/bin/bash

# Stop All BeautyConnect Services
# This script stops all running BeautyConnect containers

echo "🛑 Stopping All BeautyConnect Services"
echo "======================================="
echo ""

# Show current running services
echo "Current running services:"
docker ps --format "table {{.Names}}\t{{.Status}}" | grep beautyconnect || echo "No BeautyConnect services running"
echo ""

read -p "Stop all BeautyConnect services? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Operation cancelled."
    exit 0
fi

# Stop all services
echo "Stopping services..."

# Stop in reverse order of dependencies
echo "📦 Stopping Frontend..."
docker stop beautyconnect_frontend 2>/dev/null || echo "   Frontend not running"

echo "📦 Stopping Backend..."
docker stop beautyconnect_backend 2>/dev/null || echo "   Backend not running"

echo "📦 Stopping Redis..."
docker stop beautyconnect_redis 2>/dev/null || echo "   Redis not running"

echo "📦 Stopping PostgreSQL..."
docker stop beautyconnect_postgres 2>/dev/null || echo "   PostgreSQL not running"

echo ""
echo "✅ All services stopped"
echo ""
echo "💡 Tips:"
echo "   - Start all again: bash scripts/deploy-all.sh"
echo "   - Remove containers: docker rm \$(docker ps -aq --filter name=beautyconnect)"
echo "   - Remove volumes: docker volume rm beautyconnect_postgres_data beautyconnect_redis_data"