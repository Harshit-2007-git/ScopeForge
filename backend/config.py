"""
Configuration module — loads environment variables and app settings.
"""

import os
from dotenv import load_dotenv

# Load .env file from the backend directory
load_dotenv()

GROQ_API_KEY: str = os.getenv("GROQ_API_KEY", "")
GROQ_MODEL: str = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")
MAX_TOKENS: int = int(os.getenv("MAX_TOKENS", "4096"))
