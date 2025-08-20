#!/bin/bash

# Redis initialization script to set memory limits
# This script ensures Redis memory configuration is applied on startup

echo "Configuring Redis memory settings..."

# Wait for Redis to be ready
sleep 3

# Set memory limit to 512MB (536870912 bytes)
redis-cli -a "${REDIS_PASSWORD}" config set maxmemory 536870912

# Set eviction policy to allkeys-lru for optimal cache performance
redis-cli -a "${REDIS_PASSWORD}" config set maxmemory-policy allkeys-lru

echo "Redis memory configuration applied:"
echo "- maxmemory: 512MB (536870912 bytes)"
echo "- maxmemory-policy: allkeys-lru"

# Verify settings
redis-cli -a "${REDIS_PASSWORD}" config get maxmemory
redis-cli -a "${REDIS_PASSWORD}" config get maxmemory-policy
