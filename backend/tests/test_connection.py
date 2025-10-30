import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

# Load environment variables
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    print("❌ DATABASE_URL not found in .env")
    exit(1)

print(f"🔌 Testing connection to Supabase...")
print(f"   Database: {DATABASE_URL.split('@')[1].split('/')[0]}")

try:
    engine = create_engine(DATABASE_URL)
    with engine.connect() as conn:
        result = conn.execute(text("SELECT version();"))
        version = result.fetchone()[0]
        print(f"\n✅ Connection successful!")
        print(f"   PostgreSQL: {version[:60]}...")
        
        # Test write permission
        conn.execute(text("SELECT 1;"))
        print(f"   ✅ Read permission: OK")
        
except Exception as e:
    print(f"\n❌ Connection failed!")
    print(f"   Error: {e}")
    exit(1)