# ********************************************************
# backend/app/schemas/story.py
# ********************************************************

from pydantic import BaseModel, Field, field_validator
from typing import Optional
from datetime import datetime

class StoryCreate(BaseModel):
    title: str = Field(..., min_length=10, max_length=200)
    content: str = Field(..., min_length=100, max_length=5000)
    category: str = Field(..., pattern="^(stress|lonely|love|exam|family|other)$")
    
    @field_validator('content')
    @classmethod
    def validate_content_length(cls, v):
        if len(v.strip()) < 100:
            raise ValueError('Nội dung tối thiểu 100 ký tự')
        if len(v.strip()) > 5000:
            raise ValueError('Nội dung tối đa 5000 ký tự')
        return v.strip()
    
    @field_validator('title')
    @classmethod
    def validate_title_length(cls, v):
        if len(v.strip()) < 10:
            raise ValueError('Tiêu đề tối thiểu 10 ký tự')
        if len(v.strip()) > 200:
            raise ValueError('Tiêu đề tối đa 200 ký tự')
        return v.strip()

class StoryResponse(BaseModel):
    id: int
    title: str
    excerpt: str
    category: str
    likes_count: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class StoryDetail(BaseModel):
    id: int
    title: str
    content: str
    category: str
    likes_count: int
    created_at: datetime
    
    class Config:
        from_attributes = True