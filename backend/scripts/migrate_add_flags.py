#!/usr/bin/env python3
# ============================================
# MIGRATION: ADD FLAG COLUMNS
# File: backend/migrate_add_flags.py
# ============================================

import os
import sys
from sqlalchemy import create_engine, text

# Get database URL
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    print("❌ DATABASE_URL not set!")
    sys.exit(1)

# Fix postgres:// to postgresql://
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

print(f"🔄 Connecting to database...")
engine = create_engine(DATABASE_URL)

try:
    with engine.connect() as conn:
        # Add flag columns to messages table
        print("🔄 Adding flagged column...")
        conn.execute(text("""
            ALTER TABLE messages 
            ADD COLUMN IF NOT EXISTS flagged BOOLEAN DEFAULT FALSE
        """))
        
        print("🔄 Adding flag_reason column...")
        conn.execute(text("""
            ALTER TABLE messages 
            ADD COLUMN IF NOT EXISTS flag_reason VARCHAR(200)
        """))
        
        conn.commit()
        print("✅ Migration completed successfully!")
        
except Exception as e:
    print(f"❌ Migration failed: {e}")
    sys.exit(1)