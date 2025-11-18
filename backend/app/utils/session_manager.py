# ============================================
# SESSION UTILITIES
# File: backend/app/utils/session_manager.py
# ============================================

import secrets
import hashlib


def generate_session_token() -> str:
    """
    Generate a cryptographically secure session token
    
    Returns:
        String token with prefix 'anon_' + 32 random hex characters
    """
    random_bytes = secrets.token_bytes(32)
    token = random_bytes.hex()
    return f"anon_{token}"


def hash_user_agent(user_agent: str) -> str:
    """
    Hash user agent for privacy-preserving analytics
    
    Args:
        user_agent: Browser user agent string
        
    Returns:
        SHA-256 hash of user agent (first 16 characters)
    """
    if not user_agent:
        return ""
    
    hash_object = hashlib.sha256(user_agent.encode('utf-8'))
    return hash_object.hexdigest()[:16]


__all__ = ['generate_session_token', 'hash_user_agent']