API Documentation - Cùng Bạn Lắng Nghe
Complete REST API documentation for the mental health support platform.
Base URL: http://localhost:8000 (Development)
Production URL: TBD
API Version: v1.0.0

📚 Table of Contents

Authentication
Sessions API
Messages API
Feedback API
Health & Monitoring
Error Handling
Rate Limiting
Security


🔐 Authentication
Anonymous Sessions
No traditional authentication required. Users create anonymous sessions that serve as their identity.
Session Token Format: anon_<32_random_characters>
Usage: Include session token in:

Request body: {"session_token": "anon_xyz..."}
Query parameter: ?session_token=anon_xyz...
Header (future): X-Session-Token: anon_xyz...


📋 Sessions API
Create Session
Create a new anonymous session.
httpPOST /api/v1/sessions/
Content-Type: application/json

{
  "language_preference": "vi"
}
Response (201 Created):
json{
  "session": {
    "id": "uuid",
    "session_token": "anon_xyz...",
    "created_at": "2025-10-30T10:00:00Z",
    "last_activity": "2025-10-30T10:00:00Z",
    "expires_at": "2025-11-29T10:00:00Z",
    "language_preference": "vi",
    "is_active": true,
    "is_crisis_mode": false
  },
  "message": "Session created successfully",
  "instructions": {
    "store_token": "Save session_token securely on client-side",
    "expiry": "Session expires in 30 days",
    "usage": "Include session_token in X-Session-Token header for all requests"
  }
}
Get Session
Retrieve session information.
httpGET /api/v1/sessions/{session_token}
Response (200 OK):
json{
  "id": "uuid",
  "session_token": "anon_xyz...",
  "created_at": "2025-10-30T10:00:00Z",
  "last_activity": "2025-10-30T10:30:00Z",
  "expires_at": "2025-11-29T10:00:00Z",
  "language_preference": "vi",
  "is_active": true,
  "is_crisis_mode": false
}
Update Session (Touch)
Update session activity timestamp.
httpPOST /api/v1/sessions/{session_token}/touch
Response (200 OK): Same as Get Session
Update Session (Crisis Mode)
Enable/disable crisis mode.
httpPUT /api/v1/sessions/{session_token}
Content-Type: application/json

{
  "is_crisis_mode": true
}
Delete Session
Delete session and all associated data (cascade).
httpDELETE /api/v1/sessions/{session_token}
Response (200 OK):
json{
  "message": "Session and all associated data deleted successfully",
  "deleted_at": "2025-10-30T11:00:00Z"
}

💬 Messages API
Send Message
Send a message and receive AI response.
httpPOST /api/v1/messages/
Content-Type: application/json

{
  "content": "Tôi cảm thấy buồn",
  "session_token": "anon_xyz..."
}
Normal Response (201 Created):
json{
  "user_message": {
    "id": "uuid",
    "session_id": "uuid",
    "role": "user",
    "content": "Tôi cảm thấy buồn",
    "created_at": "2025-10-30T10:00:00Z",
    "is_crisis_detected": false
  },
  "ai_message": {
    "id": "uuid",
    "session_id": "uuid",
    "role": "assistant",
    "content": "Cảm ơn bạn đã chia sẻ. Mình hiểu bạn đang cảm thấy như vậy...",
    "created_at": "2025-10-30T10:00:01Z",
    "model_used": "simple-response",
    "processing_time_ms": 450,
    "is_crisis_detected": false
  },
  "crisis_info": null
}
Crisis Response (201 Created):
json{
  "user_message": {
    "content": "Tôi muốn tự tử",
    "is_crisis_detected": true
  },
  "ai_message": {
    "content": "Mình thấy bạn đang trải qua giai đoạn rất khó khăn...",
    "is_crisis_detected": true
  },
  "crisis_info": {
    "hotlines": [
      {
        "name": "Tổng đài Bảo vệ trẻ em",
        "number": "111",
        "available": "24/7",
        "free": true
      },
      {
        "name": "Cấp cứu Y tế",
        "number": "115",
        "available": "24/7",
        "free": true
      },
      {
        "name": "Đường dây nóng Ngày Mai",
        "number": "1900 636 976",
        "available": "24/7",
        "free": false
      }
    ],
    "message": {
      "vi": "Chúng mình nhận thấy bạn đang trải qua giai đoạn rất khó khăn...",
      "en": "We notice you're going through a very difficult time..."
    },
    "immediate_actions": [
      "Gọi ngay 111 (miễn phí 24/7)",
      "Nói chuyện với người lớn đáng tin cậy",
      "Không ở một mình",
      "Loại bỏ các vật dụng nguy hiểm xung quanh"
    ]
  }
}
Get Message History
Retrieve all messages for a session.
httpGET /api/v1/messages/?session_token=anon_xyz...&limit=100&offset=0
Response (200 OK):
json{
  "messages": [
    {
      "id": "uuid",
      "role": "user",
      "content": "Message 1",
      "created_at": "2025-10-30T10:00:00Z",
      "is_crisis_detected": false
    },
    {
      "id": "uuid",
      "role": "assistant",
      "content": "Response 1",
      "created_at": "2025-10-30T10:00:01Z",
      "model_used": "simple-response",
      "processing_time_ms": 450
    }
  ],
  "total_count": 2,
  "session_id": "uuid",
  "has_crisis_history": false
}
Get Single Message
httpGET /api/v1/messages/{message_id}?session_token=anon_xyz...
Delete Message
httpDELETE /api/v1/messages/{message_id}?session_token=anon_xyz...
Delete All Messages
httpDELETE /api/v1/messages/?session_token=anon_xyz...

⭐ Feedback API
Submit Feedback
Submit feedback for a session (one per session).
httpPOST /api/v1/feedback/
Content-Type: application/json

{
  "session_token": "anon_xyz...",
  "rating": 5,
  "feedback_text": "Rất hữu ích!",
  "category": "helpful"
}
Rating: 1-5 (required)
Category: helpful | not_helpful | inappropriate | other
Response (201 Created):
json{
  "feedback": {
    "id": "uuid",
    "session_id": "uuid",
    "rating": 5,
    "category": "helpful",
    "created_at": "2025-10-30T10:00:00Z"
  },
  "message": "Cảm ơn bạn đã đánh giá! Phản hồi của bạn giúp chúng mình cải thiện dịch vụ."
}
Duplicate Error (409 Conflict):
json{
  "detail": {
    "error": "Feedback Already Exists",
    "message": "Bạn đã gửi đánh giá cho session này rồi",
    "existing_feedback_id": "uuid"
  }
}
Get Feedback Statistics
httpGET /api/v1/feedback/stats
Response (200 OK):
json{
  "total_feedback": 150,
  "average_rating": 4.3,
  "rating_distribution": {
    "5": 80,
    "4": 40,
    "3": 20,
    "2": 5,
    "1": 5
  },
  "category_distribution": {
    "helpful": 120,
    "not_helpful": 20,
    "other": 10
  },
  "helpful_percentage": 80.0
}

🏥 Health & Monitoring
Health Check
httpGET /health
Response (200 OK):
json{
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": 1698765432.123,
  "services": {
    "api": "healthy",
    "database": "healthy"
  }
}
Liveness Probe
httpGET /health/live
Readiness Probe
httpGET /health/ready
Prometheus Metrics
httpGET /metrics

❌ Error Handling
Standard Error Response
json{
  "detail": {
    "error": "Error Type",
    "message": "Human-readable message",
    "additional_field": "..."
  }
}
Common HTTP Status Codes
CodeMeaningWhen200OKSuccessful GET/PUT/POST201CreatedResource created204No ContentSuccessful DELETE400Bad RequestInvalid input404Not FoundResource doesn't exist409ConflictDuplicate resource410GoneSession expired422Unprocessable EntityValidation error429Too Many RequestsRate limit exceeded500Internal Server ErrorServer error503Service UnavailableDatabase down

🚦 Rate Limiting
Global Rate Limit: 60 requests/minute per IP
Response Headers:
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1698765492
Rate Limit Exceeded (429):
json{
  "error": "Rate limit exceeded",
  "retry_after": 30
}

🔒 Security
Encryption

Algorithm: AES-256-GCM
Scope: All message content
IV: Random 16 bytes per message

Zero-Knowledge

No personal information stored
Session tokens are random
User agents hashed (SHA-256)

Data Retention

Sessions: 30 days
Messages: 30 days (with session)
Feedback: Indefinite (anonymized)

HTTPS

Required in production
TLS 1.3 minimum

CORS
Allowed Origins: Configured via CORS_ORIGINS env variable

📖 Interactive Documentation
Swagger UI
Visit: http://localhost:8000/docs
Features:

Try out all endpoints
See request/response schemas
Authentication testing

ReDoc
Visit: http://localhost:8000/redoc
Features:

Clean documentation
Downloadable OpenAPI spec
Code examples


🔧 SDK Examples
Python
pythonimport requests

# Create session
response = requests.post(
    "http://localhost:8000/api/v1/sessions/",
    json={"language_preference": "vi"}
)
session = response.json()
token = session["session"]["session_token"]

# Send message
response = requests.post(
    "http://localhost:8000/api/v1/messages/",
    json={
        "content": "Tôi cảm thấy buồn",
        "session_token": token
    }
)
result = response.json()
print(result["ai_message"]["content"])
JavaScript (Fetch)
javascript// Create session
const sessionResp = await fetch('http://localhost:8000/api/v1/sessions/', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({language_preference: 'vi'})
});
const session = await sessionResp.json();
const token = session.session.session_token;

// Send message
const msgResp = await fetch('http://localhost:8000/api/v1/messages/', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    content: 'Tôi cảm thấy buồn',
    session_token: token
  })
});
const result = await msgResp.json();
console.log(result.ai_message.content);
cURL
bash# Create session
TOKEN=$(curl -s -X POST http://localhost:8000/api/v1/sessions/ \
  -H "Content-Type: application/json" \
  -d '{"language_preference": "vi"}' | \
  grep -o '"session_token":"[^"]*' | cut -d'"' -f4)

# Send message
curl -X POST http://localhost:8000/api/v1/messages/ \
  -H "Content-Type: application/json" \
  -d "{\"content\": \"Tôi cảm thấy buồn\", \"session_token\": \"$TOKEN\"}"

📝 Changelog
See CHANGELOG.md for version history.

🆘 Support

Issues: GitHub Issues
Email: dev@h4u.vn
Docs: https://docs.h4u.vn (TBD)


Last Updated: October 30, 2025
API Version: 1.0.0
Maintained by: H4U Development Team