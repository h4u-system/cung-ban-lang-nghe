# Testing Guide

## Quick Test
```bash
# Run all tests
pytest tests/ -v

# With coverage
pytest tests/ --cov=app --cov-report=html

# Open coverage report
open htmlcov/index.html  # macOS
start htmlcov/index.html  # Windows
```

## Manual API Testing

See backend/API_DOCUMENTATION.md for complete examples.