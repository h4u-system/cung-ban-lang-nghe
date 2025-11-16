# ============================================
# SQLALCHEMY MODELS: CÙNG BẠN LẮNG NGHE
# File: backend/app/models/system_health_metric.py
# ============================================

from sqlalchemy import Column, String, BigInteger, DateTime, DECIMAL, Index
from sqlalchemy.sql import func

from .base import Base

class SystemHealthMetric(Base):
    __tablename__ = "system_health_metrics"
    __table_args__ = (
        Index('idx_metric_name_time', 'metric_name', 'recorded_at'),
        Index('idx_service_time', 'service_name', 'recorded_at'),
        {'extend_existing': True}
    )
    
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    
    metric_name = Column(String(100), nullable=False)
    metric_value = Column(DECIMAL(10, 2), nullable=False)
    metric_unit = Column(String(20))
    
    service_name = Column(String(50))
    environment = Column(String(20), default='production')
    
    recorded_at = Column(DateTime(timezone=True), server_default=func.now())
    
    def __repr__(self):
        return f"<SystemHealthMetric(name={self.metric_name}, value={self.metric_value})>"