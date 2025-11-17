# ============================================
# SQLALCHEMY MODELS: CÙNG BẠN LẮNG NGHE
# File: backend/app/models/utils.py
# ============================================

def get_or_create(session, model, defaults=None, **kwargs):
    """Get existing instance or create new one"""
    instance = session.query(model).filter_by(**kwargs).first()
    if instance:
        return instance, False
    else:
        params = dict((k, v) for k, v in kwargs.items())
        params.update(defaults or {})
        instance = model(**params)
        session.add(instance)
        return instance, True


def init_db(engine):
    """Initialize database - create all tables"""
    from .base import Base
    Base.metadata.create_all(bind=engine)


def drop_db(engine):
    """Drop all tables - USE WITH CAUTION"""
    from .base import Base
    Base.metadata.drop_all(bind=engine)