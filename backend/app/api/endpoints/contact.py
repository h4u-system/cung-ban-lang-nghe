# ============================================
# CONTACT FORM API
# File: backend/app/api/endpoints/contact.py
# ============================================

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from typing import Optional

from app.database import get_db
from app.models.contact import ContactForm
from app.utils.encryption import encrypt_message

router = APIRouter()

# ============================================
# SCHEMAS
# ============================================

class ContactSubmit(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    subject: str
    message: str

# ============================================
# ENDPOINTS
# ============================================

@router.post("/contact")
async def submit_contact_form(
    form_data: ContactSubmit,
    db: Session = Depends(get_db)
):
    """Submit contact form"""
    
    # Encrypt message
    message_encrypted, message_iv = encrypt_message(form_data.message)
    
    # Encrypt optional fields
    name_encrypted = None
    email_encrypted = None
    encryption_iv = None
    
    if form_data.name or form_data.email:
        if form_data.name:
            name_encrypted, encryption_iv = encrypt_message(form_data.name)
        if form_data.email:
            email_encrypted, encryption_iv = encrypt_message(form_data.email)
    
    contact = ContactForm(
        name_encrypted=name_encrypted,
        email_encrypted=email_encrypted,
        encryption_iv=encryption_iv,
        subject=form_data.subject,
        message_encrypted=message_encrypted,
        message_iv=message_iv
    )
    
    db.add(contact)
    db.commit()
    db.refresh(contact)
    
    return {
        "success": True,
        "message": "Cảm ơn bạn đã liên hệ! Chúng mình sẽ phản hồi sớm nhất có thể.",
        "contact_id": str(contact.id)
    }