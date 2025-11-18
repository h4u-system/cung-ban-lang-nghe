# ============================================
# ADMIN CONTACT ROUTES
# File: backend/app/admin/routes/contact.py
# ============================================

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import desc
from datetime import datetime

from app.database import get_db
from app.admin.auth import get_current_admin
from app.admin.models import AdminUser
from app.models.contact import ContactForm
from backend.app.utils.encryption_bk import decrypt_message

router = APIRouter()

# ============================================
# ENDPOINTS
# ============================================

@router.get("/")
async def get_contact_forms(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    admin: AdminUser = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """
    Get all contact form submissions
    
    Final URL: /api/v1/admin/contact
    """
    
    skip = (page - 1) * limit
    
    # Query contact forms (unread first)
    forms_query = db.query(ContactForm).order_by(
        ContactForm.is_read.asc(),  # Unread first
        desc(ContactForm.created_at)
    )
    
    total = forms_query.count()
    forms = forms_query.offset(skip).limit(limit).all()
    
    # Decrypt and format
    result_forms = []
    for form in forms:
        try:
            message = decrypt_message(form.message_encrypted, form.message_iv)
            
            # Decrypt optional fields
            name = None
            email = None
            if form.name_encrypted and form.encryption_iv:
                try:
                    name = decrypt_message(form.name_encrypted, form.encryption_iv)
                except:
                    name = "[Encrypted]"
            
            if form.email_encrypted and form.encryption_iv:
                try:
                    email = decrypt_message(form.email_encrypted, form.encryption_iv)
                except:
                    email = "[Encrypted]"
            
            result_forms.append({
                "id": str(form.id),
                "name": name,
                "email": email,
                "subject": form.subject,
                "message": message,
                "is_read": form.is_read,
                "created_at": form.created_at.isoformat() if form.created_at else None
            })
        except Exception as e:
            print(f"Failed to decrypt contact form {form.id}: {e}")
            continue
    
    return {
        "forms": result_forms,
        "total": total,
        "page": page,
        "limit": limit
    }


@router.post("/{contact_id}/read")
async def mark_contact_read(
    contact_id: str,
    admin: AdminUser = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """
    Mark a contact form as read
    
    Final URL: /api/v1/admin/contact/{contact_id}/read
    """
    
    form = db.query(ContactForm).filter(ContactForm.id == contact_id).first()
    
    if not form:
        raise HTTPException(status_code=404, detail="Contact form not found")
    
    form.is_read = True
    form.read_at = datetime.utcnow()
    form.read_by = str(admin.id)
    
    db.commit()
    
    return {
        "success": True,
        "message": "Contact form marked as read",
        "contact_id": contact_id
    }