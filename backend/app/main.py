# ============================================
# FASTAPI MAIN APPLICATION
# File: backend/app/main.py
# ============================================

import sys
from pathlib import Path
import os
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from prometheus_client import make_asgi_app
import time

# Add backend directory to Python path
backend_dir = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(backend_dir))

from app.database import check_database_health, cleanup_expired_sessions, init_database
from app import __version__

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ============================================
# RATE LIMITER CONFIGURATION
# ============================================

limiter = Limiter(key_func=get_remote_address)

# ============================================
# LIFESPAN EVENTS (Startup & Shutdown)
# ============================================

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan events for FastAPI application"""
    # STARTUP
    logger.info("🚀 Starting Cùng Bạn Lắng Nghe API...")
    
    try:
        init_database()
        logger.info("✅ Database tables initialized/checked successfully.")
    except Exception as e:
        logger.error(f"❌ Failed to initialize database tables: {e}")

    health = check_database_health()
    if health['status'] == 'healthy':
        logger.info("✅ Database connection established")
    else:
        logger.error(f"❌ Database connection failed: {health.get('error', 'Unknown')}")
    
    try:
        deleted_count = cleanup_expired_sessions()
        logger.info(f"🧹 Cleaned up {deleted_count} expired sessions")
    except Exception as e:
        logger.warning(f"⚠️  Cleanup failed: {e}")
    
    logger.info("✅ Application started successfully")
    
    yield
    
    # SHUTDOWN
    logger.info("🛑 Shutting down Cùng Bạn Lắng Nghe API...")
    logger.info("✅ Shutdown complete")

# ============================================
# FASTAPI APPLICATION
# ============================================

app = FastAPI(
    title="Cùng Bạn Lắng Nghe API",
    description="AI-powered mental health support platform for Vietnamese students",
    version=__version__,
    docs_url="/docs" if os.getenv("DEBUG", "false").lower() == "true" else None,
    redoc_url="/redoc" if os.getenv("DEBUG", "false").lower() == "true" else None,
    lifespan=lifespan
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# ============================================
# MIDDLEWARE CONFIGURATION
# ============================================

# CORS Middleware
CORS_ORIGINS = os.getenv(
    "CORS_ORIGINS", 
    "https://cungbanlangnghe.vn,http://localhost:3000,http://localhost:5173,https://cung-ban-lang-nghe.pages.dev"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in CORS_ORIGINS],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"],
    allow_headers=["*"],
    expose_headers=["X-Request-ID", "X-Process-Time"]
)

app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=["*"]
)

@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    """Add request ID and processing time to response headers"""
    request_id = request.headers.get("X-Request-ID", f"req-{int(time.time())}")
    start_time = time.time()
    
    response = await call_next(request)
    
    process_time = time.time() - start_time
    response.headers["X-Request-ID"] = request_id
    response.headers["X-Process-Time"] = f"{process_time:.4f}s"
    
    return response

@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    """Add security headers to all responses"""
    response = await call_next(request)
    
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    
    return response

# ============================================
# EXCEPTION HANDLERS
# ============================================

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """Handle validation errors"""
    logger.error(f"Validation error: {exc}")
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "error": "Validation Error",
            "message": "Invalid request data",
            "details": exc.errors()
        }
    )

@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    """Handle general exceptions"""
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "error": "Internal Server Error",
            "message": "An unexpected error occurred"
        }
    )

# ============================================
# ROOT ENDPOINT
# ============================================

@app.get("/", tags=["Root"])
async def root():
    """Root endpoint - API information"""
    return {
        "name": "Cùng Bạn Lắng Nghe API",
        "version": __version__,
        "description": "AI-powered mental health support for Vietnamese students",
        "status": "operational",
        "endpoints": {
            "health": "/api/v1/health",
            "metrics": "/metrics",
            "docs": "/docs" if os.getenv("DEBUG") == "true" else "disabled",
        }
    }

# ============================================
# HEALTH CHECK ENDPOINTS (Support GET and HEAD)
# ============================================

@app.api_route("/api/v1/health", methods=["GET", "HEAD"], tags=["Health"])
@limiter.limit("60/minute")
async def health_check(request: Request):
    """
    Health check endpoint - Supports GET and HEAD
    Returns application and database health status
    """
    db_health = check_database_health()
    
    response = {
        "status": "healthy" if db_health['status'] == 'healthy' else "degraded",
        "version": __version__,
        "timestamp": time.time(),
        "services": {
            "api": "healthy",
            "database": db_health['status']
        }
    }
    
    if db_health['status'] != 'healthy':
        response["services"]["database_error"] = db_health.get('error', 'Unknown')
    
    status_code = status.HTTP_200_OK if response["status"] == "healthy" else status.HTTP_503_SERVICE_UNAVAILABLE
    
    return JSONResponse(content=response, status_code=status_code)

@app.get("/health/live", tags=["Health"])
async def liveness_probe():
    """Liveness probe for Kubernetes/Docker"""
    return {"status": "alive"}

@app.get("/health/ready", tags=["Health"])
async def readiness_probe():
    """Readiness probe for Kubernetes/Docker"""
    db_health = check_database_health()
    
    if db_health['status'] == 'healthy':
        return {"status": "ready"}
    else:
        return JSONResponse(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            content={"status": "not_ready", "reason": "database_unhealthy"}
        )

# ============================================
# METRICS ENDPOINT (Prometheus)
# ============================================

metrics_app = make_asgi_app()
app.mount("/metrics", metrics_app)

# ============================================
# API ROUTERS
# ============================================

# Import public API routers
from app.api.endpoints import sessions, messages, feedback

# ✅ FIXED: Import admin router (not individual routes)
from app.admin import router as admin_router

# ✅ NEW: Register admin router ONCE with all sub-routes
app.include_router(admin_router)

# Main API routes
app.include_router(sessions.router, prefix="/api/v1/sessions", tags=["Sessions"])
app.include_router(messages.router, prefix="/api/v1/messages", tags=["Messages"])
app.include_router(feedback.router, prefix="/api/v1/feedback", tags=["Feedback"])


from app.api.endpoints import stories, contact
app.include_router(stories.router, prefix="/api/v1", tags=["Stories"])
app.include_router(contact.router, prefix="/api/v1", tags=["Contact"])

# ============================================
# STARTUP MESSAGE
# ============================================

@app.on_event("startup")
async def startup_message():
    """Print startup message"""
    logger.info("=" * 60)
    logger.info("   CÙNG BẠN LẮNG NGHE API")
    logger.info(f"   Version: {__version__}")
    logger.info(f"   Environment: {os.getenv('ENVIRONMENT', 'development')}")
    logger.info(f"   Debug: {os.getenv('DEBUG', 'false')}")
    logger.info("=" * 60)

# ============================================
# RUN APPLICATION (for development)
# ============================================

if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "app.main:app",
        host=os.getenv("API_HOST", "0.0.0.0"),
        port=int(os.getenv("API_PORT", "8000")),
        reload=os.getenv("DEBUG", "false").lower() == "true",
        log_level="info"
    )