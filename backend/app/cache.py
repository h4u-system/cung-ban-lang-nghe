# ============================================
# REDIS CACHE IMPLEMENTATION
# File: backend/app/cache.py
# ============================================

import os
import json
import logging
from typing import Any, Optional
from redis import Redis
from redis.exceptions import RedisError, ConnectionError

logger = logging.getLogger(__name__)

# ============================================
# REDIS CONFIGURATION
# ============================================

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")
REDIS_TTL = int(os.getenv("REDIS_TTL", "3600"))  # 1 hour default
REDIS_MAX_CONNECTIONS = int(os.getenv("REDIS_MAX_CONNECTIONS", "10"))

# ============================================
# REDIS CLIENT
# ============================================

class RedisCache:
    """Redis cache client with connection pooling"""
    
    def __init__(self):
        self.client: Optional[Redis] = None
        self.enabled = True
        self._connect()
    
    def _connect(self):
        """Establish Redis connection"""
        try:
            self.client = Redis.from_url(
                REDIS_URL,
                max_connections=REDIS_MAX_CONNECTIONS,
                decode_responses=True,
                socket_connect_timeout=5,
                socket_timeout=5,
                retry_on_timeout=True
            )
            # Test connection
            self.client.ping()
            logger.info("✅ Redis connected successfully")
        except (RedisError, ConnectionError) as e:
            logger.warning(f"⚠️  Redis connection failed: {e}")
            logger.warning("Cache disabled - operating in fallback mode")
            self.enabled = False
            self.client = None
    
    def get(self, key: str) -> Optional[str]:
        """
        Get value from cache
        
        Args:
            key: Cache key
            
        Returns:
            Cached value or None if not found/error
        """
        if not self.enabled or not self.client:
            return None
        
        try:
            value = self.client.get(key)
            if value:
                logger.debug(f"Cache HIT: {key}")
            return value
        except RedisError as e:
            logger.error(f"Redis GET error for key {key}: {e}")
            return None
    
    def set(
        self,
        key: str,
        value: str,
        ttl: Optional[int] = None
    ) -> bool:
        """
        Set value in cache
        
        Args:
            key: Cache key
            value: Value to cache
            ttl: Time to live in seconds (default: REDIS_TTL)
            
        Returns:
            True if successful, False otherwise
        """
        if not self.enabled or not self.client:
            return False
        
        try:
            ttl = ttl or REDIS_TTL
            self.client.setex(key, ttl, value)
            logger.debug(f"Cache SET: {key} (TTL: {ttl}s)")
            return True
        except RedisError as e:
            logger.error(f"Redis SET error for key {key}: {e}")
            return False
    
    def delete(self, key: str) -> bool:
        """
        Delete key from cache
        
        Args:
            key: Cache key to delete
            
        Returns:
            True if deleted, False otherwise
        """
        if not self.enabled or not self.client:
            return False
        
        try:
            self.client.delete(key)
            logger.debug(f"Cache DELETE: {key}")
            return True
        except RedisError as e:
            logger.error(f"Redis DELETE error for key {key}: {e}")
            return False
    
    def delete_pattern(self, pattern: str) -> int:
        """
        Delete all keys matching pattern
        
        Args:
            pattern: Pattern to match (e.g., "session:*")
            
        Returns:
            Number of keys deleted
        """
        if not self.enabled or not self.client:
            return 0
        
        try:
            keys = self.client.keys(pattern)
            if keys:
                deleted = self.client.delete(*keys)
                logger.debug(f"Cache DELETE PATTERN: {pattern} ({deleted} keys)")
                return deleted
            return 0
        except RedisError as e:
            logger.error(f"Redis DELETE PATTERN error for {pattern}: {e}")
            return 0
    
    def exists(self, key: str) -> bool:
        """Check if key exists in cache"""
        if not self.enabled or not self.client:
            return False
        
        try:
            return bool(self.client.exists(key))
        except RedisError:
            return False
    
    def increment(self, key: str, amount: int = 1) -> Optional[int]:
        """
        Increment counter
        
        Args:
            key: Counter key
            amount: Amount to increment
            
        Returns:
            New value or None if error
        """
        if not self.enabled or not self.client:
            return None
        
        try:
            return self.client.incrby(key, amount)
        except RedisError as e:
            logger.error(f"Redis INCREMENT error for {key}: {e}")
            return None
    
    def expire(self, key: str, ttl: int) -> bool:
        """Set expiry on existing key"""
        if not self.enabled or not self.client:
            return False
        
        try:
            return bool(self.client.expire(key, ttl))
        except RedisError:
            return False
    
    def health_check(self) -> dict:
        """
        Check Redis health
        
        Returns:
            Dict with health status and stats
        """
        if not self.enabled or not self.client:
            return {
                "status": "disabled",
                "enabled": False
            }
        
        try:
            info = self.client.info()
            return {
                "status": "healthy",
                "enabled": True,
                "connected_clients": info.get("connected_clients", 0),
                "used_memory_human": info.get("used_memory_human", "0"),
                "uptime_in_days": info.get("uptime_in_days", 0)
            }
        except RedisError as e:
            return {
                "status": "unhealthy",
                "enabled": False,
                "error": str(e)
            }


# ============================================
# GLOBAL CACHE INSTANCE
# ============================================

cache = RedisCache()


# ============================================
# HELPER FUNCTIONS
# ============================================

def cache_json(key: str, data: Any, ttl: Optional[int] = None) -> bool:
    """
    Cache JSON-serializable data
    
    Args:
        key: Cache key
        data: Data to cache (will be JSON-serialized)
        ttl: Time to live in seconds
        
    Returns:
        True if successful
    """
    try:
        json_str = json.dumps(data)
        return cache.set(key, json_str, ttl)
    except (TypeError, ValueError) as e:
        logger.error(f"JSON serialization error for key {key}: {e}")
        return False


def get_json(key: str) -> Optional[Any]:
    """
    Get JSON data from cache
    
    Args:
        key: Cache key
        
    Returns:
        Deserialized JSON data or None
    """
    value = cache.get(key)
    if not value:
        return None
    
    try:
        return json.loads(value)
    except (TypeError, ValueError) as e:
        logger.error(f"JSON deserialization error for key {key}: {e}")
        return None


def generate_session_cache_key(session_token: str) -> str:
    """Generate cache key for session"""
    return f"session:{session_token}"


def generate_messages_cache_key(session_token: str) -> str:
    """Generate cache key for messages"""
    return f"messages:{session_token}"


def invalidate_session_cache(session_token: str):
    """Invalidate all cache entries for a session"""
    cache.delete(generate_session_cache_key(session_token))
    cache.delete(generate_messages_cache_key(session_token))
    logger.info(f"Cache invalidated for session: {session_token[:16]}...")


# ============================================
# EXPORT
# ============================================

__all__ = [
    'cache',
    'cache_json',
    'get_json',
    'generate_session_cache_key',
    'generate_messages_cache_key',
    'invalidate_session_cache'
]