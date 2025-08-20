# Redis Configuration for Production

## Memory Management Configuration

Your Redis instance has been configured with the following production-ready memory settings:

### Current Settings
- **Memory Limit**: 512MB (536,870,912 bytes)
- **Eviction Policy**: allkeys-lru
- **Container Memory Limit**: 768MB (with 256MB reserved)

### Why These Settings?

1. **Memory Limit (512MB)**: 
   - Prevents Redis from consuming unlimited memory
   - Provides buffer room within the 768MB container limit
   - Sufficient for Celery task queuing and caching needs

2. **Eviction Policy (allkeys-lru)**:
   - Least Recently Used eviction for all keys
   - Optimal for caching scenarios like Celery task results
   - Automatically removes old data when memory limit is reached

### Manual Configuration Commands

If you need to manually set these configurations, use:

```bash
# Set memory limit to 512MB
docker compose exec redis redis-cli -a ${REDIS_PASSWORD} config set maxmemory 536870912

# Set eviction policy
docker compose exec redis redis-cli -a ${REDIS_PASSWORD} config set maxmemory-policy allkeys-lru

# Verify settings
docker compose exec redis redis-cli -a ${REDIS_PASSWORD} config get maxmemory
docker compose exec redis redis-cli -a ${REDIS_PASSWORD} config get maxmemory-policy
```

### Monitoring Redis Memory

Monitor Redis memory usage with:

```bash
# Check memory info
docker compose exec redis redis-cli -a ${REDIS_PASSWORD} info memory

# Monitor container resources
docker stats redis --no-stream
```

### Production Benefits

1. **Prevents Memory Overload**: Stops Redis from consuming all available system memory
2. **Graceful Degradation**: When memory limit is reached, old data is automatically evicted
3. **Predictable Performance**: Memory usage stays within defined boundaries
4. **Container Stability**: Prevents container crashes due to memory exhaustion

### Oracle Cloud Deployment

These settings are especially important for Oracle Cloud ARM instances where memory resources may be limited. The configuration ensures:

- Reliable performance under load
- Prevention of out-of-memory errors
- Optimal resource utilization
- Stable Celery task processing

### Troubleshooting

If Redis memory issues occur:

1. Check current memory usage: `docker compose exec redis redis-cli -a ${REDIS_PASSWORD} info memory`
2. Verify eviction policy is working: Check if keys are being evicted under memory pressure
3. Monitor application logs for Redis connection errors
4. Consider increasing memory limit if needed for your workload

## Persistence Configuration

Redis is also configured with:
- **Data Persistence**: RDB snapshots + AOF (Append Only File)
- **Volume Mount**: `redis_data:/data` for data persistence
- **Password Protection**: Secured with environment variable password
