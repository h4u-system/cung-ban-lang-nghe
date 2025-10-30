🗄️ DATABASE DOCUMENTATION - CÙNG BẠN LẮNG NGHE
📊 ENTITY RELATIONSHIP DIAGRAM (ERD)
┌─────────────────────────────────────────────────────────────────────────┐
│                         ZERO-KNOWLEDGE ARCHITECTURE                      │
│                    (No Personal Identifiable Information)                │
└─────────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐
│    SESSIONS          │
├──────────────────────┤
│ • id (PK, UUID)      │◄──────┐
│ • session_token*     │       │
│ • created_at         │       │
│ • last_activity      │       │ ONE-TO-MANY
│ • expires_at         │       │
│ • user_agent_hash    │       │
│ • language_pref      │       │
│ • is_active          │       │
│ • is_crisis_mode     │       │
│ • deleted_at         │       │
└──────────────────────┘       │
         │                     │
         │ ONE-TO-ONE          │
         ▼                     │
┌──────────────────────┐       │
│ CONVERSATION_CONTEXT │       │
├──────────────────────┤       │
│ • id (PK, UUID)      │       │
│ • session_id (FK)    │       │
│ • context_encrypted* │       │
│ • encryption_iv      │       │
│ • message_count      │       │
│ • last_updated       │       │
│ • expires_at         │       │
└──────────────────────┘       │
                               │
         │ ONE-TO-ONE          │
         ▼                     │
┌──────────────────────┐       │
│     FEEDBACK         │       │
├──────────────────────┤       │
│ • id (PK, UUID)      │       │
│ • session_id (FK)    │       │
│ • rating (1-5)       │       │
│ • feedback_encrypted*│       │
│ • encryption_iv      │       │
│ • category           │       │
│ • created_at         │       │
└──────────────────────┘       │
                               │
         │ ONE-TO-MANY         │
         ▼                     │
┌──────────────────────┐       │
│      MESSAGES        │───────┘
├──────────────────────┤
│ • id (PK, UUID)      │
│ • session_id (FK)    │
│ • content_encrypted* │
│ • encryption_iv      │
│ • role (user/ai)     │
│ • created_at         │
│ • model_used         │
│ • processing_time_ms │
│ • sentiment_score    │
│ • emotion_tags[]     │
│ • is_crisis_detected │
│ • expires_at         │
└──────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│              INDEPENDENT TABLES (No Foreign Keys)             │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────┐   ┌──────────────────────┐
│  BLOCKED_KEYWORDS    │   │ SYSTEM_HEALTH_METRIC │
├──────────────────────┤   ├──────────────────────┤
│ • id (PK, Serial)    │   │ • id (PK, BigSerial) │
│ • keyword            │   │ • metric_name        │
│ • category           │   │ • metric_value       │
│ • severity           │   │ • metric_unit        │
│ • language           │   │ • service_name       │
│ • is_exact_match     │   │ • environment        │
│ • is_case_sensitive  │   │ • recorded_at        │
│ • is_active          │   └──────────────────────┘
│ • created_at         │
│ • updated_at         │
│ • created_by         │
└──────────────────────┘

┌──────────────────────┐
│   TRAINING_DATA      │
├──────────────────────┤
│ • id (PK, BigSerial) │
│ • source             │
│ • source_id          │
│ • content_encrypted* │
│ • encryption_iv      │
│ • sentiment          │
│ • emotion_tags[]     │
│ • crisis_level       │
│ • age_group          │
│ • school_type        │
│ • location           │
│ • is_verified        │
│ • verified_by        │
│ • verified_at        │
│ • is_active          │
│ • created_at         │
│ • updated_at         │
└──────────────────────┘

* = Encrypted with AES-256-GCM

🔐 SECURITY ARCHITECTURE
1. Encryption Strategy
CLIENT SIDE                  DATABASE
┌─────────────┐             ┌────────────────────┐
│ Plain Text  │             │ Encrypted Storage  │
│ "I am sad"  │─── AES ───► │ "8f3a9b2c..."      │
│             │   256-GCM   │                    │
│ + Session   │             │ + IV (random)      │
│   Key       │             │                    │
└─────────────┘             └────────────────────┘
      ▲                               │
      │                               │
      └───────── Decrypt ─────────────┘
           (Client-side only)
2. Zero-Knowledge Principle
Data TypeStorage MethodDecryption LocationUser messagesEncryptedClient-side onlySession tokenHashedNever decryptedUser agentHashedNever decryptedIP addressNOT STOREDN/AName/EmailNOT STOREDN/APhone numberNOT STOREDN/A
3. Auto-Delete Timeline
Day 0         Day 7         Day 14        Day 21        Day 30
│             │             │             │             │
├─────────────┼─────────────┼─────────────┼─────────────┤
Session       Messages      Context       Feedback      DELETE ALL
Created       Active        Updated       Optional      (Cascade)

📈 DATABASE SIZE ESTIMATION
Supabase Free Tier: 500MB Limit
Assumption: 5,000 active users
TableRecordsAvg SizeTotal Sizesessions5,000500 bytes2.5 MBmessages250,0001 KB250 MBconversation_context5,0002 KB10 MBfeedback2,500300 bytes0.75 MBblocked_keywords500200 bytes0.1 MBsystem_health_metrics100,000150 bytes15 MBtraining_data10,0002 KB20 MBTOTAL~300 MB
✅ Fits within 500MB free tier with 40% buffer

🚀 SETUP INSTRUCTIONS
Step 1: Create Supabase Project

Go to: https://supabase.com/dashboard
Click "New Project"
Fill in details:

Name: cung-ban-lang-nghe
Database Password: (generate strong password)
Region: Southeast Asia (Singapore) (closest to Vietnam)


Wait 2-3 minutes for provisioning
Copy Connection String from Settings > Database


Step 2: Configure Backend Environment
bashcd backend

# Create .env file
cp .env.example .env

# Edit .env and add Supabase connection string
nano .env
Update DATABASE_URL:
envDATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres

Step 3: Install Python Dependencies
bash# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Verify installation
python -c "import sqlalchemy; print(sqlalchemy.__version__)"

Step 4: Initialize Alembic
bash# Initialize Alembic (already done, but for reference)
alembic init alembic

# Create first migration
alembic revision --autogenerate -m "Initial schema with zero-knowledge architecture"

# Apply migration
alembic upgrade head

Step 5: Verify Database Setup
bash# Run database health check
python -c "
from app.database import check_database_health
import json
print(json.dumps(check_database_health(), indent=2))
"
Expected Output:
json{
  "status": "healthy",
  "database": "postgresql",
  "pool_size": 5,
  "checked_out_connections": 0,
  "overflow_connections": 0,
  "total_connections": 5
}

Step 6: Seed Initial Data
Create file: backend/scripts/seed_data.py
pythonfrom app.database import get_db_context
from app.models import BlockedKeyword, SchemaVersion

def seed_crisis_keywords():
    """Insert default crisis detection keywords"""
    with get_db_context() as db:
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
        
        print(f"✅ Seeded {len(keywords)} crisis keywords")

def seed_schema_version():
    """Insert schema version record"""
    with get_db_context() as db:
        version = SchemaVersion(
            version="1.0.0",
            description="Initial schema with zero-knowledge architecture and 30-day auto-delete"
        )
        db.add(version)
        print("✅ Schema version recorded")

if __name__ == "__main__":
    print("🌱 Seeding database...")
    seed_crisis_keywords()
    seed_schema_version()
    print("✅ Database seeding completed!")
Run seeding:
bashpython scripts/seed_data.py

🧪 TESTING DATABASE OPERATIONS
Create file: backend/tests/test_database.py
pythonimport pytest
from datetime import datetime, timedelta
from app.database import get_db_context
from app.models import Session, Message, BlockedKeyword

def test_session_creation():
    """Test creating anonymous session"""
    with get_db_context() as db:
        session = Session(
            session_token="test_token_12345",
            language_preference="vi"
        )
        db.add(session)
        db.commit()
        
        # Verify session created
        assert session.id is not None
        assert session.is_active == True
        assert session.expires_at > datetime.utcnow()
        
        # Cleanup
        db.delete(session)

def test_message_encryption():
    """Test encrypted message storage"""
    with get_db_context() as db:
        # Create session
        session = Session(session_token="test_msg_session")
        db.add(session)
        db.flush()
        
        # Create encrypted message
        message = Message(
            session_id=session.id,
            content_encrypted="encrypted_content_here",
            encryption_iv="random_iv_32_chars",
            role="user"
        )
        db.add(message)
        db.commit()
        
        # Verify message
        assert message.id is not None
        assert message.content_encrypted == "encrypted_content_here"
        
        # Cleanup
        db.delete(session)  # Cascade will delete message

def test_auto_delete_expired_sessions():
    """Test 30-day auto-delete mechanism"""
    with get_db_context() as db:
        # Create expired session
        expired_session = Session(
            session_token="expired_token",
            expires_at=datetime.utcnow() - timedelta(days=1)
        )
        db.add(expired_session)
        db.commit()
        
        # Run cleanup
        from app.database import cleanup_expired_sessions
        deleted_count = cleanup_expired_sessions()
        
        assert deleted_count >= 1

def test_crisis_keyword_detection():
    """Test crisis keyword lookup"""
    with get_db_context() as db:
        keywords = db.query(BlockedKeyword).filter(
            BlockedKeyword.category == "suicide",
            BlockedKeyword.is_active == True
        ).all()
        
        assert len(keywords) > 0
        assert any(kw.keyword == "tự tử" for kw in keywords)

# Run tests
# pytest tests/test_database.py -v

📊 MONITORING QUERIES
Query 1: Daily Active Users
sqlSELECT 
    DATE(last_activity) as date,
    COUNT(DISTINCT id) as active_sessions
FROM sessions
WHERE last_activity > NOW() - INTERVAL '7 days'
GROUP BY DATE(last_activity)
ORDER BY date DESC;
Query 2: Crisis Detection Stats
sqlSELECT 
    DATE(created_at) as date,
    COUNT(*) as crisis_messages
FROM messages
WHERE is_crisis_detected = true
  AND created_at > NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;
Query 3: Storage Usage
sqlSELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
Query 4: System Health
sqlSELECT 
    metric_name,
    AVG(metric_value) as avg_value,
    MAX(metric_value) as max_value,
    COUNT(*) as sample_count
FROM system_health_metrics
WHERE recorded_at > NOW() - INTERVAL '1 hour'
GROUP BY metric_name
ORDER BY metric_name;

🔧 MAINTENANCE TASKS
Daily Cleanup (Automated)
bash# Add to crontab or use Supabase pg_cron extension
0 2 * * * cd /path/to/backend && python -c "from app.database import cleanup_expired_sessions; cleanup_expired_sessions()"
Weekly Backup
bash# Export database to file
pg_dump $DATABASE_URL -Fc > backups/cbln_$(date +%Y%m%d).dump

# Upload to cloud storage (optional)
# aws s3 cp backups/cbln_$(date +%Y%m%d).dump s3://bucket/backups/
Monthly Metrics Cleanup
bash# Remove metrics older than 90 days
python -c "from app.database import cleanup_old_metrics; cleanup_old_metrics(90)"

🚨 TROUBLESHOOTING
Issue 1: Connection Pool Exhausted
python# Check pool status
from app.database import engine
pool = engine.pool
print(f"Pool size: {pool.size()}")
print(f"Checked out: {pool.checkedout()}")
print(f"Overflow: {pool.overflow()}")

# Solution: Increase pool size in .env
DB_POOL_SIZE=10
DB_MAX_OVERFLOW=20
Issue 2: Slow Queries
sql-- Find slow queries (requires pg_stat_statements extension)
SELECT 
    query,
    calls,
    total_time,
    mean_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;
Issue 3: Database Full (500MB limit)
sql-- Check table sizes
SELECT 
    tablename,
    pg_size_pretty(pg_total_relation_size('public.'||tablename)) as size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size('public.'||tablename) DESC;

-- Solution: Reduce retention or archive old data
DELETE FROM system_health_metrics WHERE recorded_at < NOW() - INTERVAL '30 days';
VACUUM FULL system_health_metrics;

📚 REFERENCES
Supabase Documentation

Connection pooling: https://supabase.com/docs/guides/database/connecting-to-postgres
Row Level Security: https://supabase.com/docs/guides/auth/row-level-security
Backups: https://supabase.com/docs/guides/platform/backups

SQLAlchemy Documentation

ORM Tutorial: https://docs.sqlalchemy.org/en/20/orm/tutorial.html
Connection Pooling: https://docs.sqlalchemy.org/en/20/core/pooling.html

Alembic Documentation

Migration Guide: https://alembic.sqlalchemy.org/en/latest/tutorial.html


✅ CHECKLIST - DATABASE SETUP COMPLETED

 Supabase project created
 Connection string added to .env
 Python dependencies installed
 Alembic migration applied
 Initial data seeded
 Database health check passed
 Tests executed successfully
 Backup strategy configured
 Monitoring queries tested


🎯 NEXT STEPS
After completing database setup:

Backend API Development

Create FastAPI endpoints
Implement authentication
Add rate limiting


AI Engine Integration

Setup PhoBERT model
Integrate GPT-3.5-turbo
Implement crisis detection


Frontend Development

React app setup
Chat interface
End-to-end encryption




Database Schema Version: 1.0.0
Last Updated: November 2025
Maintained by: H4U Technology Team