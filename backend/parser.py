"""
File-parsing utilities for extracting raw text from uploaded documents.
Supports .docx, .pdf, and .txt files.
"""

from __future__ import annotations

import io
from fastapi import UploadFile, HTTPException


async def extract_text_from_upload(file: UploadFile) -> str:
    """Read the uploaded file and return its plain-text content.

    Raises HTTPException(400) for unsupported file types.
    """
    filename = (file.filename or "").lower()
    content = await file.read()

    if filename.endswith(".txt"):
        return _parse_txt(content)
    elif filename.endswith(".pdf"):
        return _parse_pdf(content)
    elif filename.endswith(".docx"):
        return _parse_docx(content)
    else:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type. Please upload a .docx, .pdf, or .txt file. "
                   f"Received: '{file.filename}'",
        )


def _parse_txt(content: bytes) -> str:
    """Decode plain-text bytes (tries utf-8 then latin-1 fallback)."""
    try:
        return content.decode("utf-8")
    except UnicodeDecodeError:
        return content.decode("latin-1")


def _parse_pdf(content: bytes) -> str:
    """Extract text from all pages of a PDF."""
    from pypdf import PdfReader

    reader = PdfReader(io.BytesIO(content))
    pages_text: list[str] = []
    for page in reader.pages:
        text = page.extract_text()
        if text:
            pages_text.append(text)

    if not pages_text:
        raise HTTPException(
            status_code=400,
            detail="Could not extract any text from the uploaded PDF. "
                   "The file may be image-based or empty.",
        )
    return "\n\n".join(pages_text)


def _parse_docx(content: bytes) -> str:
    """Extract text from a Word .docx document."""
    from docx import Document

    doc = Document(io.BytesIO(content))
    paragraphs = [p.text for p in doc.paragraphs if p.text.strip()]

    if not paragraphs:
        raise HTTPException(
            status_code=400,
            detail="Could not extract any text from the uploaded .docx file. "
                   "The document appears to be empty.",
        )
    return "\n\n".join(paragraphs)
