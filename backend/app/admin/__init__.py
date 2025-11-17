# ============================================
# ADMIN MODULE
# File: backend/app/admin/__init__.py
# ============================================

"""
Admin module for Cùng Bạn Lắng Nghe
Provides authentication, content management, analytics, and message moderation
"""

from fastapi import APIRouter

# Import routes
from app.admin.routes import auth, analytics, messages

# Create main admin router
router = APIRouter(prefix="/api/v1/admin", tags=["Admin"])

# Register all sub-routers
router.include_router(
    auth.router,
    prefix="/auth",
    tags=["Admin Auth"]
    )

router.include_router(
    analytics.router,
    prefix="/analytics",
    tags=["Admin Analytics"]
    )

router.include_router(
    messages.router,
    prefix="/messages",
    tags=["Admin Messages"])

__all__ = ["router"]

# ============================================
# ADMIN MODULE
# File: backend/app/admin/__init__.py
# ============================================

#"""
#Admin module for Cùng Bạn Lắng Nghe
#Provides content management and analytics
#"""

# DO NOT import submodules here to avoid circular imports
# Import them directly where needed instead

#__all__ = ['models', 'auth', 'routes']