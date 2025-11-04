# ============================================
# DATABASE CONFIGURATION
# File: backend/app/database.py
# ============================================

import os
from typing import Generator
from sqlalchemy import create_engine, event
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.pool import NullPool, QueuePool
from contextlib import contextmanager
import logging

from app.models import Base
from dotenv import load_dotenv

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()

# ============================================
# DATABASE URL CONFIGURATION
# ============================================

# ✅ Get database URL from environment variable (REQUIRED)
DATABASE_URL = os.getenv("DATABASE_URL")

# ✅ Raise error if DATABASE_URL is not set
if not DATABASE_URL:
    raise ValueError(
        "\n❌ DATABASE_URL environment variable is required!\n"
        "   Please set it in your .env file:\n"
        "   DATABASE_URL=postgresql://user:pass@host:port/database\n"
    )

# Supabase uses 'postgres://' but SQLAlchemy needs 'postgresql://'
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Database connection settings for Supabase Free Tier
DB_POOL_SIZE = int(os.getenv("DB_POOL_SIZE", "5"))
DB_MAX_OVERFLOW = int(os.getenv("DB_MAX_OVERFLOW", "10"))
DB_POOL_TIMEOUT = int(os.getenv("DB_POOL_TIMEOUT", "30"))
DB_POOL_RECYCLE = int(os.getenv("DB_POOL_RECYCLE", "3600"))  # 1 hour

# ============================================
# ENGINE CONFIGURATION
# ============================================

# Create engine with optimized settings for Supabase
engine = create_engine(
    DATABASE_URL,
    poolclass=QueuePool,
    pool_size=DB_POOL_SIZE,
    max_overflow=DB_MAX_OVERFLOW,
    pool_timeout=DB_POOL_TIMEOUT,
    pool_recycle=DB_POOL_RECYCLE,
    pool_pre_ping=True,  # Verify connections before using
    echo=os.getenv("DEBUG", "false").lower() == "true",  # SQL logging in debug mode
    future=True,  # SQLAlchemy 2.0 style
)

# ============================================
# SESSION CONFIGURATION
# ============================================

# Create session factory
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
    expire_on_commit=False
)

# ============================================
# DATABASE EVENT LISTENERS
# ============================================

@event.listens_for(engine, "connect")
def receive_connect(dbapi_conn, connection_record):
    """Set session variables on connection"""
    logger.info("Database connection established")
    
    # Set statement timeout (30 seconds)
    cursor = dbapi_conn.cursor()
    cursor.execute("SET statement_timeout = '30s'")
    cursor.close()


@event.listens_for(engine, "checkout")
def receive_checkout(dbapi_conn, connection_record, connection_proxy):
    """Log connection checkout"""
    logger.debug("Database connection checked out from pool")


# ============================================
# SESSION DEPENDENCY (for FastAPI)
# ============================================

def get_db() -> Generator[Session, None, None]:
    """
    Dependency for FastAPI endpoints to get database session
    
    Usage:
        @app.get("/api/sessions")
        def get_sessions(db: Session = Depends(get_db)):
            return db.query(SessionModel).all()
    """
    db = SessionLocal()
    try:
        yield db
    except Exception as e:
        logger.error(f"Database session error: {e}")
        db.rollback()
        raise
    finally:
        db.close()


# ============================================
# CONTEXT MANAGER (for scripts)
# ============================================

@contextmanager
def get_db_context():
    """
    Context manager for database session
    
    Usage:
        with get_db_context() as db:
            user = db.query(Session).first()
    """
    db = SessionLocal()
    try:
        yield db
        db.commit()
    except Exception as e:
        logger.error(f"Database transaction error: {e}")
        db.rollback()
        raise
    finally:
        db.close()


# ============================================
# DATABASE HEALTH CHECK
# ============================================

def check_database_health() -> dict:
    """
    Check database connectivity and health
    Returns dict with status and metrics
    """
    try:
        with get_db_context() as db:
            # Execute simple query
            from sqlalchemy import text
            result = db.execute(text("SELECT 1 as health_check"))
            result.fetchone()
            
            # Get connection pool stats
            pool = engine.pool
            
            return {
                "status": "healthy",
                "database": "postgresql",
                "pool_size": pool.size(),
                "checked_out_connections": pool.checkedout(),
                "overflow_connections": pool.overflow(),
                "total_connections": pool.size() + pool.overflow()
            }
    except Exception as e:
        logger.error(f"Database health check failed: {e}")
        return {
            "status": "unhealthy",
            "error": str(e)
        }


# ============================================
# DATABASE INITIALIZATION
# ============================================

def init_database():
    """Create all database tables"""
    try:
        logger.info("Creating database tables...")
        Base.metadata.create_all(bind=engine)
        logger.info("Database tables created successfully")
    except Exception as e:
        logger.error(f"Failed to create database tables: {e}")
        raise


def drop_database():
    """Drop all database tables - USE WITH CAUTION"""
    logger.warning("!!! DROPPING ALL DATABASE TABLES !!!")
    Base.metadata.drop_all(bind=engine)
    logger.warning("All tables dropped")


# ============================================
# CLEANUP UTILITIES
# ============================================

def cleanup_expired_sessions():
    """Delete expired sessions (called by scheduler)"""
    from app.models import Session as SessionModel
    from datetime import datetime
    
    try:
        with get_db_context() as db:
            deleted_count = db.query(SessionModel).filter(
                SessionModel.expires_at < datetime.utcnow()
            ).delete()
            
            logger.info(f"Deleted {deleted_count} expired sessions")
            return deleted_count
    except Exception as e:
        logger.error(f"Failed to cleanup expired sessions: {e}")
        raise


def cleanup_old_metrics(days: int = 90):
    """Delete metrics older than specified days"""
    from app.models import SystemHealthMetric
    from datetime import datetime, timedelta
    
    try:
        with get_db_context() as db:
            cutoff_date = datetime.utcnow() - timedelta(days=days)
            deleted_count = db.query(SystemHealthMetric).filter(
                SystemHealthMetric.recorded_at < cutoff_date
            ).delete()
            
            logger.info(f"Deleted {deleted_count} old metrics")
            return deleted_count
    except Exception as e:
        logger.error(f"Failed to cleanup old metrics: {e}")
        raise


# ============================================
# EXPORT
# ============================================

__all__ = [
    'engine',
    'SessionLocal',
    'get_db',
    'get_db_context',
    'check_database_health',
    'init_database',
    'drop_database',
    'cleanup_expired_sessions',
    'cleanup_old_metrics'
]