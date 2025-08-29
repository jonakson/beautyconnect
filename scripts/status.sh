#!/bin/bash

# Check Status of All BeautyConnect Services
# This script shows the status of all BeautyConnect services

echo "📊 BeautyConnect Services Status"
echo "================================="
echo ""

# Check network
echo "🔧 Network Status:"
if docker network ls | grep -q beautyconnect_network; then
    echo "   ✅ beautyconnect_network exists"
else
    echo "   ❌ beautyconnect_network not found"
fi
echo ""

# Check each service
echo "📦 Service Status:"
echo ""

# PostgreSQL
echo "PostgreSQL:"
if docker ps | grep -q beautyconnect_postgres; then
    echo "   ✅ Running"
    docker exec beautyconnect_postgres pg_isready -U beautyconnect_user -d beautyconnect >/dev/null 2>&1 && echo "   ✅ Healthy" || echo "   ⚠️  Not healthy"
else
    echo "   ❌ Not running"
fi

# Redis
echo ""
echo "Redis:"
if docker ps | grep -q beautyconnect_redis; then
    echo "   ✅ Running"
    docker exec beautyconnect_redis redis-cli ping >/dev/null 2>&1 && echo "   ✅ Healthy" || echo "   ⚠️  Not healthy"
else
    echo "   ❌ Not running"
fi

# Backend
echo ""
echo "Backend:"
if docker ps | grep -q beautyconnect_backend; then
    echo "   ✅ Running"
    curl -f http://localhost:4000/health >/dev/null 2>&1 && echo "   ✅ Healthy (http://localhost:4000)" || echo "   ⚠️  Not healthy"
else
    echo "   ❌ Not running"
fi

# Frontend
echo ""
echo "Frontend:"
if docker ps | grep -q beautyconnect_frontend; then
    echo "   ✅ Running"
    curl -f http://localhost:3000 >/dev/null 2>&1 && echo "   ✅ Healthy (http://localhost:3000)" || echo "   ⚠️  Not healthy"
else
    echo "   ❌ Not running"
fi

# Volumes
echo ""
echo "📁 Volumes:"
if docker volume ls | grep -q beautyconnect_postgres_data; then
    SIZE=$(docker system df -v | grep beautyconnect_postgres_data | awk '{print $4}')
    echo "   PostgreSQL: ✅ (Size: ${SIZE:-unknown})"
else
    echo "   PostgreSQL: ❌ Not found"
fi

if docker volume ls | grep -q beautyconnect_redis_data; then
    SIZE=$(docker system df -v | grep beautyconnect_redis_data | awk '{print $4}')
    echo "   Redis: ✅ (Size: ${SIZE:-unknown})"
else
    echo "   Redis: ❌ Not found"
fi

# Container details
echo ""
echo "🐳 Container Details:"
docker ps -a --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep beautyconnect || echo "No BeautyConnect containers found"

echo ""
echo "💡 Tips:"
echo "   - Deploy all: bash scripts/deploy-all.sh"
echo "   - Stop all: bash scripts/stop-all.sh"
echo "   - View logs: docker logs -f [container_name]"