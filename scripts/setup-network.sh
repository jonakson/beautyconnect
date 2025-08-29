#!/bin/bash

# Setup shared Docker network for BeautyConnect services
# This network allows all services to communicate with each other

NETWORK_NAME="beautyconnect_network"

echo "🔧 Setting up Docker network: $NETWORK_NAME"

# Check if network already exists
if docker network ls | grep -q "$NETWORK_NAME"; then
    echo "✅ Network '$NETWORK_NAME' already exists"
else
    echo "📦 Creating network '$NETWORK_NAME'..."
    docker network create --driver bridge "$NETWORK_NAME"
    
    if [ $? -eq 0 ]; then
        echo "✅ Network '$NETWORK_NAME' created successfully"
    else
        echo "❌ Failed to create network '$NETWORK_NAME'"
        exit 1
    fi
fi

# Show network details
echo ""
echo "📊 Network details:"
docker network inspect "$NETWORK_NAME" --format '{{json .}}' | jq '.Name, .Driver, .Scope' 2>/dev/null || docker network inspect "$NETWORK_NAME" | grep -E '"Name"|"Driver"|"Scope"'