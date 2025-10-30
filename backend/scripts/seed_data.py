import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app.database import get_db_context
from app.models import BlockedKeyword, SchemaVersion

def seed_crisis_keywords():
    """Seed crisis detection keywords"""
    with get_db_context() as db:
        # Check if already seeded
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

if __name__ == "__main__":
    print("🌱 Seeding database...")
    seed_crisis_keywords()
    print("✅ Seeding completed!")