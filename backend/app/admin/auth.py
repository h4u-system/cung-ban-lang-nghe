# ============================================
# ADMIN AUTHENTICATION
# File: backend/app/admin/auth.py
# ============================================

from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
import os
import hashlib

from app.database import get_db
from app.admin.models import AdminUser

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT settings
SECRET_KEY = os.getenv("SECRET_KEY", "cungbanlangnghe-render-production-2025-secret-key-min32")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 480  # 8 hours

security = HTTPBearer()


def _prepare_password(password: str) -> bytes:
    """
    Prepare password for bcrypt (max 72 bytes)
    Use SHA256 hash for long passwords to ensure consistent length
    """
    password_bytes = password.encode('utf-8')
    
    # If password > 72 bytes, hash it first
    if len(password_bytes) > 72:
        # Use SHA256 to reduce to fixed length
        password_bytes = hashlib.sha256(password_bytes).hexdigest().encode('utf-8')
    
    return password_bytes


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify password against hash"""
    try:
        # Prepare password (handle long passwords)
        prepared_password = _prepare_password(plain_password)
        return pwd_context.verify(prepared_password, hashed_password)
    except Exception as e:
        print(f"Password verification error: {e}")
        return False


def get_password_hash(password: str) -> str:
    """Hash password"""
    # Prepare password (handle long passwords)
    prepared_password = _prepare_password(password)
    return pwd_context.hash(prepared_password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """Create JWT access token"""
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def decode_access_token(token: str):
    """Decode JWT token"""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid authentication credentials: {str(e)}"
        )


async def get_current_admin(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> AdminUser:
    """Get current authenticated admin user"""
    token = credentials.credentials
    payload = decode_access_token(token)
    
    admin_id = payload.get("sub")
    if not admin_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token: missing subject"
        )
    
    admin = db.query(AdminUser).filter(AdminUser.id == admin_id).first()
    if not admin:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Admin not found"
        )
    
    if not admin.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin account is inactive"
        )
    
    return admin


def require_role(allowed_roles: list):
    """Dependency to check admin role"""
    async def check_role(admin: AdminUser = Depends(get_current_admin)):
        if admin.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Insufficient permissions. Required: {allowed_roles}, Current: {admin.role}"
            )
        return admin
    return check_role