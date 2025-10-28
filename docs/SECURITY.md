**Đường dẫn:** `cung-ban-lang-nghe/docs/SECURITY.md`

```markdown
# 🔐 SECURITY POLICY

## Reporting Security Vulnerabilities

**DO NOT** create public GitHub issues for security vulnerabilities.

**Contact:** security@h4u.vn

## Security Measures

### 1. Zero-Knowledge Architecture
- No user registration required
- Temporary session IDs only
- Auto-delete after 30 days

### 2. Encryption
- **In-transit:** TLS 1.3
- **At-rest:** AES-256
- **End-to-end:** Client-side encryption

### 3. Data Retention
- Chat logs: 30 days (encrypted)
- Session data: 24 hours
- Crisis logs: 90 days (anonymized)

### 4. Access Control
- API rate limiting: 60 req/min
- DDoS protection via Cloudflare
- IP-based throttling

### 5. Compliance
- ✅ Nghị định 13/2023 (Vietnam PDPA)
- ✅ Luật An toàn thông tin mạng
- ✅ Zero PII Policy

## Prohibited Actions

- ❌ Storing personal identifiable information
- ❌ Sharing encryption keys in code
- ❌ Committing secrets to Git
- ❌ Using weak passwords (<16 chars)
- ❌ Disabling security features in production

## Security Checklist

Before deployment:
- [ ] All `.env` files in `.gitignore`
- [ ] Secrets stored in secure vaults
- [ ] TLS certificates valid
- [ ] Rate limiting enabled
- [ ] Monitoring alerts configured
- [ ] Backup encryption verified
- [ ] Access logs reviewed

## Incident Response

1. **Detect** → Automated monitoring alerts
2. **Isolate** → Disable affected services
3. **Investigate** → Review logs (zero-PII)
4. **Remediate** → Apply patches
5. **Report** → Notify stakeholders
6. **Review** → Post-mortem analysis

## Contact

- **Security Lead:** security@h4u.vn
- **Emergency:** +84-xxx-xxx-xxxx
- **GPG Key:** [Link to public key]
```

---

## 📌 HƯỚNG DẪN TẠO CÁC FILE

### Cách 1: Tạo từng file bằng lệnh

```bash
# Tạo .gitignore
touch .gitignore
# Copy nội dung từ artifact vào file

# Tạo README.md
touch README.md
# Copy nội dung từ artifact vào file

# Tạo .env.example
touch .env.example
# Copy nội dung từ artifact vào file

# Tạo docker-compose.yml (optional)
touch docker-compose.yml
# Copy nội dung từ artifact vào file

# Tạo SECURITY.md
touch docs/SECURITY.md
# Copy nội dung từ artifact vào file
```

### Cách 2: Sử dụng VS Code

1. Mở VS Code: `code .`
2. Tạo file mới từ Explorer panel
3. Copy nội dung từ artifact
4. Save (Ctrl+S)

---

## ✅ VERIFICATION

Sau khi tạo xong, chạy:

```bash
# Kiểm tra các file đã tạo
ls -la

# Kiểm tra Git status
git status
```

Expected output:
```
Untracked files:
  .gitignore
  .env.example
  README.md
  docker-compose.yml
  docs/
```