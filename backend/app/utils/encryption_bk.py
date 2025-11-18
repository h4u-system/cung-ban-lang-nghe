# ============================================
# ENCRYPTION & SECURITY UTILITIES
# File: backend/app/utils/encryption.py
# ============================================

import os
import base64
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import padding


# ============================================
# ENCRYPTION CONFIGURATION
# ============================================

# Get encryption key from environment (32 bytes for AES-256)
ENCRYPTION_KEY = os.getenv("ENCRYPTION_KEY", "dev-key-32-bytes-for-testing!").encode()

# Ensure key is exactly 32 bytes
if len(ENCRYPTION_KEY) < 32:
    ENCRYPTION_KEY = ENCRYPTION_KEY.ljust(32, b'0')
elif len(ENCRYPTION_KEY) > 32:
    ENCRYPTION_KEY = ENCRYPTION_KEY[:32]


# ============================================
# ENCRYPTION FUNCTIONS
# ============================================

def generate_iv() -> str:
    """
    Generate random Initialization Vector (IV) for AES
    Returns base64-encoded string
    """
    iv = os.urandom(16)  # AES block size is 16 bytes
    return base64.b64encode(iv).decode('utf-8')


def encrypt_message(plaintext: str) -> tuple[str, str]:
    """
    Encrypt message using AES-256-CBC
    
    Args:
        plaintext: Message to encrypt
        
    Returns:
        Tuple of (encrypted_text, iv) both base64-encoded
    """
    if not plaintext:
        return "", ""
    
    # Generate IV
    iv = os.urandom(16)
    
    # Create cipher
    cipher = Cipher(
        algorithms.AES(ENCRYPTION_KEY),
        modes.CBC(iv),
        backend=default_backend()
    )
    encryptor = cipher.encryptor()
    
    # Pad plaintext to block size
    padder = padding.PKCS7(128).padder()
    padded_data = padder.update(plaintext.encode('utf-8')) + padder.finalize()
    
    # Encrypt
    ciphertext = encryptor.update(padded_data) + encryptor.finalize()
    
    # Return base64-encoded strings
    return (
        base64.b64encode(ciphertext).decode('utf-8'),
        base64.b64encode(iv).decode('utf-8')
    )


def decrypt_message(ciphertext: str, iv: str) -> str:
    """
    Decrypt message using AES-256-CBC
    
    Args:
        ciphertext: Base64-encoded encrypted text
        iv: Base64-encoded initialization vector
        
    Returns:
        Decrypted plaintext string
    """
    if not ciphertext or not iv:
        return ""
    
    try:
        # Decode from base64
        ciphertext_bytes = base64.b64decode(ciphertext)
        iv_bytes = base64.b64decode(iv)
        
        # Create cipher
        cipher = Cipher(
            algorithms.AES(ENCRYPTION_KEY),
            modes.CBC(iv_bytes),
            backend=default_backend()
        )
        decryptor = cipher.decryptor()
        
        # Decrypt
        padded_plaintext = decryptor.update(ciphertext_bytes) + decryptor.finalize()
        
        # Unpad
        unpadder = padding.PKCS7(128).unpadder()
        plaintext = unpadder.update(padded_plaintext) + unpadder.finalize()
        
        return plaintext.decode('utf-8')
    
    except Exception as e:
        raise ValueError(f"Decryption failed: {str(e)}")


# ============================================
# TESTING FUNCTIONS
# ============================================

def test_encryption():
    """Test encryption/decryption roundtrip"""
    test_message = "Tôi cảm thấy buồn và lo lắng"
    
    # Encrypt
    encrypted, iv = encrypt_message(test_message)
    print(f"Original: {test_message}")
    print(f"Encrypted: {encrypted[:50]}...")
    print(f"IV: {iv}")
    
    # Decrypt
    decrypted = decrypt_message(encrypted, iv)
    print(f"Decrypted: {decrypted}")
    
    # Verify
    assert test_message == decrypted, "Encryption/Decryption failed!"
    print("✅ Encryption test passed!")


if __name__ == "__main__":
    test_encryption()


# ============================================
# EXPORT
# ============================================

__all__ = [
    'encrypt_message',
    'decrypt_message',
    'generate_iv'
]