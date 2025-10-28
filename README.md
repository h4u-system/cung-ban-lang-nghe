**Đường dẫn:** `cung-ban-lang-nghe/README.md`

```markdown
# 🤝 CÙNG BẠN LẮNG NGHE

> Nền tảng AI tư vấn tâm lý học đường đầu tiên tại Việt Nam

## 🎯 Mục tiêu

Cung cấp hỗ trợ tâm lý **miễn phí, ẩn danh, 24/7** cho học sinh, sinh viên tại TP. Hồ Chí Minh.

## 🔒 Bảo mật tuyệt đối

- ✅ **Zero-knowledge architecture** - Không yêu cầu đăng ký
- ✅ **End-to-end encryption** - Mã hóa AES-256
- ✅ **Zero PII Policy** - Không lưu thông tin cá nhân
- ✅ **Auto-delete** - Xóa cuộc trò chuyện sau 30 ngày

## 🛡️ Hệ thống an toàn 3 lớp

1. **Lớp 1:** Bảo mật dữ liệu tuyệt đối
2. **Lớp 2:** AI phát hiện khủng hoảng (95% accuracy)
3. **Lớp 3:** Giám sát chuyên gia 24/7 (kế hoạch)

## 🏗️ Kiến trúc công nghệ

### Frontend
- **Framework:** React 18.2 + Material-UI 5.14
- **Hosting:** Cloudflare Pages
- **Styling:** Tailwind CSS 3.3

### Backend
- **Framework:** FastAPI 0.103 (Python 3.11)
- **Hosting:** Fly.io (3 shared VMs)
- **Database:** PostgreSQL 15.4 (Supabase)
- **Cache:** Redis 7.0 (Redis Labs)

### AI Engine
- **Models:** PhoBERT + GPT-3.5-turbo
- **Framework:** PyTorch 2.0 + Transformers 4.33
- **Hosting:** Fly.io

### Monitoring
- **Stack:** Grafana Cloud + Prometheus
- **Retention:** 14 days

## 📦 Project Structure

```
cung-ban-lang-nghe/
├── frontend/              # React application
├── backend/               # FastAPI services
├── ai-engine/             # AI processing
├── docs/                  # Documentation
├── infrastructure/        # IaC configs
└── .github/workflows/     # CI/CD pipelines
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Python 3.11+
- Git

### Setup Development Environment

```bash
# Clone repository
git clone git@github.com:h4u-system/cung-ban-lang-nghe.git
cd cung-ban-lang-nghe

# Setup Frontend
cd frontend
npm install
cp .env.example .env
npm run dev

# Setup Backend (in new terminal)
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload

# Setup AI Engine (in new terminal)
cd ai-engine
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python main.py
```

## 🔐 Environment Variables

**NEVER commit `.env` files!** Use `.env.example` as template.

Required services:
- Supabase account (database)
- Redis Labs account (cache)
- OpenAI API key (GPT-3.5-turbo)
- Grafana Cloud account (monitoring)

## 📊 Monitoring

- **Grafana Dashboard:** https://your-grafana-instance.grafana.net
- **Health Check:** `/api/health`
- **Metrics:** `/api/metrics`

## 🤝 Contributing

This is a private project for H4U Company. Contact project owner for contribution guidelines.

## 📄 License

Proprietary - CONFIDENTIAL DOCUMENT
© 2025 H4U Technology Company

## ⚠️ Security Notice

This repository contains sensitive architecture information. 
- DO NOT share repository access
- DO NOT commit secrets
- REPORT security issues to: security@h4u.vn

---

**Built with ❤️ for Vietnamese students by H4U Team**
```

---