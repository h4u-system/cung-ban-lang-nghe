import bcrypt
import hashlib

def _prepare_password(password: str) -> bytes:
    password_bytes = password.encode('utf-8')
    if len(password_bytes) > 72:
        password_bytes = hashlib.sha256(password_bytes).hexdigest().encode('utf-8')
    return password_bytes

password = input("Enter password: ")
prepared = _prepare_password(password)
hashed = bcrypt.hashpw(prepared, bcrypt.gensalt(rounds=12))
print(f"\nPassword: {password}")
print(f"Prepared length: {len(prepared)} bytes")
print(f"Hash: {hashed.decode('utf-8')}")
print(f"\nSQL:")
print(f"UPDATE admin_users SET password_hash = '{hashed.decode('utf-8')}' WHERE email = 'admin@h4u.vn';")