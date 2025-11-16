# backend/scripts/create_first_admin.py

import sys
import os
from pathlib import Path

# Add backend to path
backend_dir = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(backend_dir))

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.admin.models import AdminUser
from app.admin.auth import get_password_hash
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def create_first_admin():
    """Create first admin user"""
    
    # Get database URL
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        print("❌ DATABASE_URL not found in environment")
        return
    
    # Create engine
    engine = create_engine(database_url)
    SessionLocal = sessionmaker(bind=engine)
    db = SessionLocal()
    
    try:
        # Check if any admin exists
        existing_count = db.query(AdminUser).count()
        if existing_count > 0:
            print(f"❌ Admin users already exist ({existing_count} found)")
            print("💡 Use the login endpoint with existing credentials")
            return
        
        # Admin details
        email = input("Enter admin email (default: admin@h4u.vn): ").strip() or "admin@h4u.vn"
        password = input("Enter admin password (default: Admin@123): ").strip() or "Admin@123"
        full_name = input("Enter full name (default: H4U Administrator): ").strip() or "H4U Administrator"
        
        # Create admin
        admin = AdminUser(
            email=email,
            password_hash=get_password_hash(password),
            full_name=full_name,
            role="admin",
            is_active=True
        )
        
        db.add(admin)
        db.commit()
        db.refresh(admin)
        
        print("\n✅ First admin created successfully!")
        print(f"📧 Email: {admin.email}")
        print(f"👤 Name: {admin.full_name}")
        print(f"🔑 Password: {password}")
        print(f"🆔 ID: {admin.id}")
        print(f"🎭 Role: {admin.role}")
        print("\n🔐 IMPORTANT: Save these credentials securely!")
        print("💡 You can now login at: /admin/login")
        
    except Exception as e:
        print(f"❌ Error creating admin: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("=" * 60)
    print("   CÙNG BẠN LẮNG NGHE - ADMIN SETUP")
    print("=" * 60)
    print()
    create_first_admin()