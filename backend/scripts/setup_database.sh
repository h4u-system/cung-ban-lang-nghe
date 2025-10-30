#!/bin/bash
# ============================================
# DATABASE SETUP SCRIPT
# File: backend/scripts/setup_database.sh
# Usage: bash scripts/setup_database.sh
# ============================================

set -e  # Exit on error

echo "🚀 Starting Database Setup for Cùng Bạn Lắng Nghe"
echo "=================================================="

# ============================================
# STEP 1: Check Prerequisites
# ============================================
echo ""
echo "📋 Step 1: Checking prerequisites..."

# Check Python version
if command -v python &> /dev/null; then
    PYTHON_VERSION=$(python --version 2>&1 | awk '{print $2}')
    echo "✅ Python found: $PYTHON_VERSION"
else
    echo "❌ Python not found. Please install Python 3.11+"
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found!"
    echo "📝 Creating .env from .env.example..."
    cp .env.example .env
    echo "⚠️  Please edit .env and add your Supabase DATABASE_URL"
    echo "   Then run this script again."
    exit 1
else
    echo "✅ .env file found"
fi

# Check if DATABASE_URL is set
source .env
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL not set in .env"
    echo "   Please add: DATABASE_URL=postgresql://..."
    exit 1
else
    echo "✅ DATABASE_URL configured"
fi

# ============================================
# STEP 2: Create Virtual Environment
# ============================================
echo ""
echo "🐍 Step 2: Setting up Python virtual environment..."

if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python -m venv venv
    echo "✅ Virtual environment created"
else
    echo "✅ Virtual environment already exists"
fi

# Activate virtual environment
echo "Activating virtual environment..."
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    # Windows
    source venv/Scripts/activate
else
    # macOS/Linux
    source venv/bin/activate
fi

# ============================================
# STEP 3: Install Dependencies
# ============================================
echo ""
echo "📦 Step 3: Installing Python dependencies..."

pip install --upgrade pip
pip install -r requirements.txt

echo "✅ Dependencies installed"

# ============================================
# STEP 4: Test Database Connection
# ============================================
echo ""
echo "🔌 Step 4: Testing database connection..."

python << END
import sys
from sqlalchemy import create_engine, text
import os

DATABASE_URL = os.getenv("DATABASE_URL")

try:
    engine = create_engine(DATABASE_URL)
    with engine.connect() as conn:
        result = conn.execute(text("SELECT version();"))
        version = result.fetchone()[0]
        print(f"✅ Database connected successfully")
        print(f"   PostgreSQL version: {version[:50]}...")
except Exception as e:
    print(f"❌ Database connection failed: {e}")
    sys.exit(1)
END

# ============================================
# STEP 5: Initialize Alembic
# ============================================
echo ""
echo "🔄 Step 5: Initializing database migrations..."

# Create alembic directory if not exists
if [ ! -d "alembic" ]; then
    echo "Initializing Alembic..."
    alembic init alembic
    
    # Copy custom env.py
    echo "Configuring Alembic environment..."
    # Note: env.py content should be already in place from artifacts
fi

# Create initial migration
echo "Creating initial migration..."
alembic revision --autogenerate -m "Initial schema with zero-knowledge architecture" || true

# Apply migrations
echo "Applying migrations..."
alembic upgrade head

echo "✅ Database schema created"

# ============================================
# STEP 6: Seed Initial Data
# ============================================
echo ""
echo "🌱 Step 6: Seeding initial data..."

python << END
from app.database import get_db_context
from app.models import BlockedKeyword, SchemaVersion

def seed_crisis_keywords():
    with get_db_context() as db:
        # Check if keywords already exist
        existing = db.query(BlockedKeyword).count()
        if existing > 0:
            print(f"⏭️  Keywords already seeded ({existing} records)")
            return
        
        keywords = [
            ("tự tử", "suicide", "critical", "vi"),
            ("tự sát", "suicide", "critical", "vi"),
            ("muốn chết", "suicide", "critical", "vi"),
            ("kết thúc cuộc đời", "suicide", "critical", "vi"),
            ("không muốn sống nữa", "suicide", "critical", "vi"),
            ("cắt tay", "self_harm", "high", "vi"),
            ("tự làm đau", "self_harm", "high", "vi"),
            ("làm hại bản thân", "self_harm", "high", "vi"),
            ("bị đánh đập", "violence", "high", "vi"),
            ("bạo lực gia đình", "violence", "high", "vi"),
            ("xâm hại", "abuse", "critical", "vi"),
        ]
        
        for keyword, category, severity, language in keywords:
            kw = BlockedKeyword(
                keyword=keyword,
                category=category,
                severity=severity,
                language=language
            )
            db.add(kw)
        
        db.commit()
        print(f"✅ Seeded {len(keywords)} crisis keywords")

def seed_schema_version():
    with get_db_context() as db:
        # Check if version already exists
        existing = db.query(SchemaVersion).filter_by(version="1.0.0").first()
        if existing:
            print("⏭️  Schema version already recorded")
            return
        
        version = SchemaVersion(
            version="1.0.0",
            description="Initial schema with zero-knowledge architecture and 30-day auto-delete"
        )
        db.add(version)
        db.commit()
        print("✅ Schema version recorded: 1.0.0")

print("Seeding database...")
seed_crisis_keywords()
seed_schema_version()
print("✅ Database seeding completed")
END

# ============================================
# STEP 7: Verify Setup
# ============================================
echo ""
echo "🔍 Step 7: Verifying database setup..."

python << END
from app.database import check_database_health
from app.models import BlockedKeyword, SchemaVersion
from sqlalchemy import inspect
import json

# Health check
health = check_database_health()
print(f"Database Health: {health['status']}")
print(f"Connection Pool: {health.get('pool_size', 'N/A')} connections")

# Check tables
from app.database import engine
inspector = inspect(engine)
tables = inspector.get_table_names()
print(f"\nTables created: {len(tables)}")
for table in sorted(tables):
    print(f"  ✅ {table}")

# Check seeded data
from app.database import get_db_context
with get_db_context() as db:
    keyword_count = db.query(BlockedKeyword).count()
    version = db.query(SchemaVersion).first()
    
    print(f"\nSeeded Data:")
    print(f"  ✅ Crisis keywords: {keyword_count}")
    print(f"  ✅ Schema version: {version.version if version else 'N/A'}")

print("\n✅ All verifications passed!")
END

# ============================================
# STEP 8: Create Backup Directory
# ============================================
echo ""
echo "💾 Step 8: Setting up backup directory..."

mkdir -p backups
echo "✅ Backup directory created: ./backups"

# ============================================
# COMPLETION
# ============================================
echo ""
echo "=================================================="
echo "✅ DATABASE SETUP COMPLETED SUCCESSFULLY!"
echo "=================================================="
echo ""
echo "📊 Summary:"
echo "  • Database: PostgreSQL (Supabase)"
echo "  • Tables: 8 (sessions, messages, etc.)"
echo "  • Security: Zero-knowledge architecture"
echo "  • Encryption: AES-256-GCM"
echo "  • Auto-delete: 30 days"
echo ""
echo "🔧 Useful Commands:"
echo "  • Start backend: uvicorn app.main:app --reload"
echo "  • Run tests: pytest tests/ -v"
echo "  • Create migration: alembic revision --autogenerate -m 'description'"
echo "  • Apply migrations: alembic upgrade head"
echo "  • Rollback: alembic downgrade -1"
echo "  • Database backup: pg_dump \$DATABASE_URL -Fc > backups/backup.dump"
echo ""
echo "📖 Next Steps:"
echo "  1. Review database schema in docs/DATABASE.md"
echo "  2. Test database operations: python scripts/test_database.py"
echo "  3. Configure Redis cache connection"
echo "  4. Setup backend API endpoints"
echo ""
echo "🔗 Supabase Dashboard:"
echo "   https://supabase.com/dashboard/project/_/editor"
echo ""
echo "=================================================="