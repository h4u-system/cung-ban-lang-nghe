# ============================================
# ADMIN MODULE
# File: backend/app/admin/__init__.py
# ============================================

"""
Admin module for Cùng Bạn Lắng Nghe
Provides authentication, content management, analytics, message moderation,
stories approval, and contact form management
"""

from fastapi import APIRouter

# Import ALL routes
from app.admin.routes import (
    auth,
    analytics,
    messages,
    content,
    stories,    
    contact    
)

# Create main admin router
router = APIRouter(prefix="/api/v1/admin", tags=["Admin"])

# Register ALL sub-routers
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
    tags=["Admin Messages"]
)

router.include_router(
    content.router,
    prefix="/content",
    tags=["Admin Content"]
)

router.include_router(
    stories.router,
    prefix="/stories",         # 🆕 /api/v1/admin/stories
    tags=["Admin Stories"]
)

router.include_router(
    contact.router,
    prefix="/contact",         # 🆕 /api/v1/admin/contact
    tags=["Admin Contact"]
)

__all__ = ["router"]