Backend API - Cùng Bạn Lắng Nghe
FastAPI backend với PostgreSQL, Redis, và AES-256 encryption.
🏗️ Kiến trúc
backend/
├── app/
│   ├── api/
│   │   └── endpoints/
│   │       ├── sessions.py      # Session management
│   │       └── messages.py      # Message & chat
│   ├── models/                  # SQLAlchemy models
│   ├── schemas/                 # Pydantic schemas
│   ├── utils/
│   │   ├── encryption.py        # AES-256 encryption
│   │   └── crisis_detection.py  # Crisis keyword detection
│   ├── database.py              # Database connection
│   └── main.py                  # FastAPI app
├── alembic/                     # Database migrations
├── scripts/                     # Utility scripts
├── tests/                       # Unit tests
├── requirements.txt             # Python dependencies
└── .env.example                 # Environment template
🚀 Quick Start
Prerequisites

Python 3.11+
PostgreSQL (Supabase)
Redis (Redis Labs)

Installation
bash# Clone repository
git clone https://github.com/h4u-system/cung-ban-lang-nghe.git
cd cung-ban-lang-nghe/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Setup environment
cp .env.example .env
# Edit .env with your credentials

# Run migrations
alembic upgrade head

# Start server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
API Documentation
Once running, visit:

Swagger UI: http://localhost:8000/docs
Health Check: http://localhost:8000/health

📚 API Endpoints
Sessions
bash# Create session
POST /api/v1/sessions/
{
  "language_preference": "vi"
}

# Get session
GET /api/v1/sessions/{session_token}

# Update session (touch activity)
PUT /api/v1/sessions/{session_token}

# Delete session
DELETE /api/v1/sessions/{session_token}
Messages
bash# Send message & get AI response
POST /api/v1/messages/
{
  "content": "Tôi cảm thấy buồn",
  "session_token": "anon_xyz..."
}

# Get message history
GET /api/v1/messages/?session_token=anon_xyz...

# Delete message
DELETE /api/v1/messages/{message_id}?session_token=anon_xyz...
🔐 Security Features
1. Zero-Knowledge Architecture

No registration required
Anonymous session tokens
No PII stored

2. Encryption

Algorithm: AES-256-GCM
Scope: All message content
Key Management: Environment variable

3. Crisis Detection

11 Vietnamese keywords
Real-time detection
Emergency hotline info (111, 115)

4. Auto-Delete

Sessions expire after 30 days
Cascade delete messages
Automated cleanup on startup

🗄️ Database Schema
Tables (8)

sessions - Anonymous user sessions
messages - Encrypted chat messages
conversation_context - AI short-term memory
feedback - User ratings
blocked_keywords - Crisis detection keywords
system_health_metrics - Monitoring data
training_data - AI training dataset
schema_version - Migration tracking

Key Features

UUID primary keys
Timestamped records
Foreign key constraints
Cascade delete
Row-level security ready

🧪 Testing
bash# Run all tests
pytest tests/ -v

# Run with coverage
pytest tests/ --cov=app --cov-report=html

# Test specific module
pytest tests/test_sessions.py -v
📊 Monitoring
Health Endpoints
bash# Full health check
curl http://localhost:8000/health

# Liveness probe
curl http://localhost:8000/health/live

# Readiness probe
curl http://localhost:8000/health/ready

# Prometheus metrics
curl http://localhost:8000/metrics
Database Health
bash# Check database status
python scripts/check_storage.py

# Monitor real-time
python scripts/monitor_health.py --interval 10 --duration 60
🛠️ Development
Database Migrations
bash# Create new migration
alembic revision --autogenerate -m "Description"

# Apply migrations
alembic upgrade head

# Rollback
alembic downgrade -1
Seed Data
bash# Seed crisis keywords
python scripts/seed_data.py
Reset Database (⚠️ DANGER)
bash# This will DELETE ALL DATA
python scripts/reset_database.py
🔧 Configuration
Environment Variables
Copy .env.example to .env and configure:
env# Database
DATABASE_URL=postgresql://user:pass@host:5432/db

# Redis
REDIS_URL=redis://user:pass@host:6379

# Security
SECRET_KEY=your-secret-key-32-chars
ENCRYPTION_KEY=your-encryption-key-32-bytes

# AI (Optional)
OPENAI_API_KEY=sk-...
📈 Performance
Optimization

Connection pooling (5 connections)
Redis caching (planned)
Query optimization with indexes
Async I/O with FastAPI

Scalability

Current: 1,000-5,000 concurrent users
Target: 10,000+ users (with horizontal scaling)

🐛 Troubleshooting
Common Issues
1. Database connection failed
bash# Check Supabase credentials
python -c "from app.database import check_database_health; print(check_database_health())"
2. Encryption error
bash# Test encryption
python -c "from app.utils.encryption import test_encryption; test_encryption()"
3. Migration conflicts
bash# Reset alembic
alembic downgrade base
alembic upgrade head
📝 Logging
Logs are written to:

Console (development)
Structured JSON (production, planned)

Log levels:

INFO: Normal operations
WARNING: Crisis detected, cleanup events
ERROR: Database errors, encryption failures

🤝 Contributing
This is a private project for H4U Company.
📄 License
Proprietary - CONFIDENTIAL DOCUMENT
© 2025 H4U Technology Company

Version: 1.0.0
Last Updated: October 2025
Maintained by: H4U Development Team