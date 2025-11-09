# ============================================
# File: backend/app/admin/routes/auth.py
# ============================================

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from datetime import datetime

from app.database import get_db
from app.admin.models import AdminUser
from app.admin.auth import verify_password, create_access_token, get_password_hash

router = APIRouter(prefix="/admin/auth", tags=["Admin Auth"])


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    admin: dict


class AdminCreateRequest(BaseModel):
    email: EmailStr
    password: str
    full_name: str


@router.post("/login", response_model=LoginResponse)
async def admin_login(request: LoginRequest, db: Session = Depends(get_db)):
    """Admin login endpoint"""
    admin = db.query(AdminUser).filter(AdminUser.email == request.email).first()
    
    if not admin or not verify_password(request.password, admin.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    if not admin.is_active:
        raise HTTPException(status_code=403, detail="Account disabled")
    
    # Update last login
    admin.last_login = datetime.utcnow()
    db.commit()
    
    # Create JWT token
    access_token = create_access_token(data={"sub": str(admin.id), "role": admin.role})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "admin": {
            "id": str(admin.id),
            "email": admin.email,
            "full_name": admin.full_name,
            "role": admin.role
        }
    }


@router.post("/setup-first-admin", include_in_schema=False)
async def create_first_admin(request: AdminCreateRequest, db: Session = Depends(get_db)):
    """
    One-time endpoint to create first admin
    Disable after first use by setting ALLOW_SETUP=false
    """
    import os
    if os.getenv("ALLOW_SETUP", "true").lower() != "true":
        raise HTTPException(status_code=403, detail="Setup disabled")
    
    # Check if any admin exists
    if db.query(AdminUser).count() > 0:
        raise HTTPException(status_code=403, detail="Admin already exists")
    
    # Create first admin
    password_hash = get_password_hash(request.password)
    admin = AdminUser(
        email=request.email,
        password_hash=password_hash,
        full_name=request.full_name,
        role="admin"
    )
    
    db.add(admin)
    db.commit()
    db.refresh(admin)
    
    return {"message": "First admin created", "admin_id": str(admin.id)}
