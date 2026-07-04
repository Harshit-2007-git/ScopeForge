"""
Configuration module — loads environment variables and app settings.
"""

import os
from dotenv import load_dotenv

# Load .env file from the backend directory
load_dotenv()

ANTHROPIC_API_KEY: str = os.getenv("ANTHROPIC_API_KEY", "")
ANTHROPIC_MODEL: str = os.getenv("ANTHROPIC_MODEL", "claude-sonnet-4-20250514")
MAX_TOKENS: int = int(os.getenv("MAX_TOKENS", "4096"))
