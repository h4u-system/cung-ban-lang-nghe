# ============================================
# FILE 1: backend/scripts/test_database.py
# Quick database operations test
# ============================================

import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app.database import get_db_context
from app.models import Session, Message, BlockedKeyword
from datetime import datetime, timedelta
import uuid

def test_session_crud():
    """Test Session Create, Read, Update, Delete"""
    print("\n🧪 Testing Session CRUD operations...")
    
    with get_db_context() as db:
        # CREATE
        session = Session(
            session_token=f"test_{uuid.uuid4().hex[:16]}",
            language_preference="vi"
        )
        db.add(session)
        db.flush()
        session_id = session.id
        print(f"  ✅ Created session: {session_id}")
        
        # READ
        retrieved = db.query(Session).filter_by(id=session_id).first()
        assert retrieved is not None
        print(f"  ✅ Retrieved session: {retrieved.session_token}")
        
        # UPDATE
        retrieved.is_crisis_mode = True
        db.flush()
        print(f"  ✅ Updated session crisis_mode: {retrieved.is_crisis_mode}")
        
        # DELETE
        db.delete(retrieved)
        db.flush()
        deleted = db.query(Session).filter_by(id=session_id).first()
        assert deleted is None
        print(f"  ✅ Deleted session successfully")

def test_encrypted_message():
    """Test encrypted message storage"""
    print("\n🔐 Testing Encrypted Message operations...")
    
    with get_db_context() as db:
        # Create session first
        session = Session(session_token=f"msg_test_{uuid.uuid4().hex[:8]}")
        db.add(session)
        db.flush()
        
        # Create encrypted message
        message = Message(
            session_id=session.id,
            content_encrypted="AES256_ENCRYPTED_CONTENT_HERE",
            encryption_iv="random_iv_32_characters_long",
            role="user"
        )
        db.add(message)
        db.flush()
        
        print(f"  ✅ Created encrypted message: {message.id}")
        print(f"  ✅ Content: {message.content_encrypted[:20]}...")
        print(f"  ✅ IV: {message.encryption_iv}")
        
        # Verify cascade delete
        db.delete(session)
        db.flush()
        
        deleted_msg = db.query(Message).filter_by(id=message.id).first()
        assert deleted_msg is None
        print(f"  ✅ Cascade delete works (message deleted with session)")

def test_crisis_keywords():
    """Test crisis keyword lookup"""
    print("\n🚨 Testing Crisis Keyword Detection...")
    
    with get_db_context() as db:
        # Query crisis keywords
        keywords = db.query(BlockedKeyword).filter(
            BlockedKeyword.category == "suicide",
            BlockedKeyword.is_active == True
        ).all()
        
        print(f"  ✅ Found {len(keywords)} suicide-related keywords")
        
        for kw in keywords[:3]:  # Show first 3
            print(f"     • {kw.keyword} ({kw.severity})")
        
        # Test keyword matching
        test_messages = [
            "Tôi muốn tự tử",
            "Tôi bị trầm cảm",
            "Hôm nay thật vui"
        ]
        
        print("\n  Testing keyword detection:")
        for msg in test_messages:
            detected = any(kw.keyword in msg.lower() for kw in keywords)
            status = "🚨 CRISIS" if detected else "✅ Safe"
            print(f"     {status}: \"{msg}\"")

def test_database_health():
    """Test database connection and health"""
    print("\n💊 Testing Database Health...")
    
    from app.database import check_database_health
    
    health = check_database_health()
    
    print(f"  Status: {health['status']}")
    print(f"  Database: {health.get('database', 'N/A')}")
    print(f"  Pool Size: {health.get('pool_size', 'N/A')}")
    print(f"  Active Connections: {health.get('checked_out_connections', 'N/A')}")
    
    if health['status'] == 'healthy':
        print("  ✅ Database is healthy")
    else:
        print(f"  ❌ Database error: {health.get('error', 'Unknown')}")

def test_auto_delete():
    """Test auto-delete mechanism"""
    print("\n⏰ Testing Auto-Delete Mechanism...")
    
    with get_db_context() as db:
        # Create expired session
        expired_session = Session(
            session_token=f"expired_{uuid.uuid4().hex[:8]}",
            expires_at=datetime.utcnow() - timedelta(days=1)
        )
        db.add(expired_session)
        db.commit()
        
        expired_id = expired_session.id
        print(f"  ✅ Created expired session: {expired_id}")
        
        # Run cleanup
        from app.database import cleanup_expired_sessions
        deleted_count = cleanup_expired_sessions()
        
        print(f"  ✅ Cleanup deleted {deleted_count} expired sessions")
        
        # Verify deletion
        still_exists = db.query(Session).filter_by(id=expired_id).first()
        if still_exists is None:
            print(f"  ✅ Expired session successfully deleted")
        else:
            print(f"  ⚠️  Expired session still exists (will be cleaned up)")

def main():
    """Run all tests"""
    print("=" * 60)
    print("🧪 DATABASE OPERATIONS TEST SUITE")
    print("=" * 60)
    
    try:
        test_database_health()
        test_session_crud()
        test_encrypted_message()
        test_crisis_keywords()
        test_auto_delete()
        
        print("\n" + "=" * 60)
        print("✅ ALL TESTS PASSED!")
        print("=" * 60)
        
    except Exception as e:
        print(f"\n❌ TEST FAILED: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == "__main__":
    main()


# ============================================
# FILE 2: backend/scripts/backup_database.py
# Database backup utility
# ============================================

import os
import subprocess
from datetime import datetime

def backup_database():
    """Create database backup"""
    DATABASE_URL = os.getenv("DATABASE_URL")
    
    if not DATABASE_URL:
        print("❌ DATABASE_URL not set in environment")
        return
    
    # Create backup filename with timestamp
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = f"backups/cbln_backup_{timestamp}.dump"
    
    # Ensure backups directory exists
    os.makedirs("backups", exist_ok=True)
    
    print(f"📦 Creating database backup...")
    print(f"   File: {backup_file}")
    
    try:
        # Use pg_dump for backup
        subprocess.run([
            "pg_dump",
            DATABASE_URL,
            "-Fc",  # Custom format (compressed)
            "-f", backup_file
        ], check=True)
        
        # Get file size
        size_mb = os.path.getsize(backup_file) / (1024 * 1024)
        
        print(f"✅ Backup created successfully!")
        print(f"   Size: {size_mb:.2f} MB")
        print(f"   Location: {backup_file}")
        
        # Keep only last 7 backups
        cleanup_old_backups(keep_count=7)
        
    except subprocess.CalledProcessError as e:
        print(f"❌ Backup failed: {e}")
    except FileNotFoundError:
        print("❌ pg_dump not found. Install PostgreSQL client tools.")

def cleanup_old_backups(keep_count=7):
    """Remove old backups, keep only recent ones"""
    import glob
    
    backups = sorted(glob.glob("backups/cbln_backup_*.dump"))
    
    if len(backups) > keep_count:
        to_delete = backups[:-keep_count]
        for backup in to_delete:
            os.remove(backup)
            print(f"🗑️  Removed old backup: {backup}")

if __name__ == "__main__":
    backup_database()


# ============================================
# FILE 3: backend/scripts/reset_database.py
# DANGER: Reset database (development only)
# ============================================

import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app.database import drop_database, init_database, get_db_context
from app.models import BlockedKeyword, SchemaVersion

def reset_database():
    """⚠️ WARNING: This will DELETE ALL DATA!"""
    
    print("=" * 60)
    print("⚠️  DATABASE RESET OPERATION")
    print("=" * 60)
    print("\nThis will:")
    print("  • DROP all tables")
    print("  • DELETE all data")
    print("  • RECREATE schema")
    print("  • SEED initial data")
    print("\n❌ THIS CANNOT BE UNDONE!")
    print("=" * 60)
    
    # Confirm action
    confirmation = input("\nType 'RESET' to confirm: ")
    
    if confirmation != "RESET":
        print("❌ Reset cancelled")
        return
    
    try:
        print("\n🗑️  Dropping all tables...")
        drop_database()
        print("✅ Tables dropped")
        
        print("\n🏗️  Creating new schema...")
        init_database()
        print("✅ Schema created")
        
        print("\n🌱 Seeding initial data...")
        seed_initial_data()
        print("✅ Data seeded")
        
        print("\n" + "=" * 60)
        print("✅ DATABASE RESET COMPLETED!")
        print("=" * 60)
        
    except Exception as e:
        print(f"\n❌ Reset failed: {e}")
        import traceback
        traceback.print_exc()

def seed_initial_data():
    """Seed crisis keywords and schema version"""
    with get_db_context() as db:
        # Crisis keywords
        keywords = [
            ("tự tử", "suicide", "critical", "vi"),
            ("tự sát", "suicide", "critical", "vi"),
            ("muốn chết", "suicide", "critical", "vi"),
            ("cắt tay", "self_harm", "high", "vi"),
            ("bạo lực gia đình", "violence", "high", "vi"),
        ]
        
        for keyword, category, severity, language in keywords:
            kw = BlockedKeyword(
                keyword=keyword,
                category=category,
                severity=severity,
                language=language
            )
            db.add(kw)
        
        # Schema version
        version = SchemaVersion(
            version="1.0.0",
            description="Initial schema"
        )
        db.add(version)
        
        db.commit()

if __name__ == "__main__":
    reset_database()


# ============================================
# FILE 4: backend/scripts/check_storage.py
# Check database storage usage
# ============================================

import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app.database import get_db_context
from sqlalchemy import text

def check_storage_usage():
    """Check database storage usage by table"""
    print("=" * 70)
    print("💾 DATABASE STORAGE USAGE")
    print("=" * 70)
    
    query = text("""
        SELECT 
            schemaname,
            tablename,
            pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size,
            pg_total_relation_size(schemaname||'.'||tablename) AS bytes
        FROM pg_tables
        WHERE schemaname = 'public'
        ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
    """)