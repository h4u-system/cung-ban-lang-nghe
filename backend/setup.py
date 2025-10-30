# ============================================
# FILE 6: backend/setup.py
# ============================================

from setuptools import setup, find_packages

setup(
    name="cung-ban-lang-nghe-api",
    version="1.0.0",
    description="AI-powered mental health support platform for Vietnamese students",
    author="H4U Technology",
    author_email="dev@h4u.vn",
    packages=find_packages(),
    python_requires=">=3.11",
    install_requires=[
        "fastapi>=0.103.0",
        "uvicorn>=0.23.2",
        "sqlalchemy>=2.0.20",
        "psycopg2-binary>=2.9.7",
        "alembic>=1.12.0",
        "redis>=5.0.0",
        "python-jose>=3.3.0",
        "cryptography>=41.0.4",
    ],
    extras_require={
        "dev": [
            "pytest>=7.4.2",
            "pytest-asyncio>=0.21.1",
            "pytest-cov>=4.1.0",
            "black>=23.9.1",
            "flake8>=6.1.0",
            "mypy>=1.5.1",
        ]
    },
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Intended Audience :: Developers",
        "Programming Language :: Python :: 3.11",
    ],
)