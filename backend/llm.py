"""
Groq API integration — sends client notes to the LLM and returns
a validated ProjectScope object.

Includes retry logic: if the first response is not valid JSON or fails
schema validation, a second attempt is made with a stricter prompt.
"""

from __future__ import annotations

import json
import logging

from groq import Groq
from pydantic import ValidationError

from config import GROQ_API_KEY, GROQ_MODEL, MAX_TOKENS
from schema import ProjectScope

logger = logging.getLogger(__name__)

# ── System prompt (close to verbatim from spec) ──────────────────────────────

SYSTEM_PROMPT = """\
You are a senior technical project manager at a software agency that builds \
custom software and automation for small and medium businesses.

You will be given raw, unstructured client notes — this could be a call \
transcript, an email thread, or a rough brief. It may be vague, disorganized, \
or incomplete.

Your job: produce a structured project scope document a project manager could \
paste directly into a client proposal.

Rules:
- If information is missing or ambiguous, do NOT invent specifics. Instead, \
list it under risks_and_questions as an open question.
- Keep tech stack recommendations practical for an SMB budget — prefer proven, \
common tools over exotic ones, unless the notes specify otherwise.
- Timeline should be realistic phase-based estimates, not exact dates.
- Output ONLY valid JSON matching the exact schema provided. No preamble, no \
markdown formatting, no explanation before or after the JSON.

Required JSON schema:
{
  "project_title": "string",
  "summary": "2-3 sentence plain-English summary",
  "scope": {
    "included": ["string"],
    "excluded": ["string"]
  },
  "tech_stack": [
    {"layer": "string", "choice": "string", "reason": "1 short sentence"}
  ],
  "timeline": [
    {"phase": "string", "duration": "string e.g. '1 week'", "deliverable": "string"}
  ],
  "risks_and_questions": [
    {"type": "risk | question", "detail": "string"}
  ]
}
"""

RETRY_SUFFIX = (
    "\n\nYour previous response was not valid JSON. "
    "Return ONLY valid JSON matching the schema above. "
    "Do NOT include any text, markdown fences, or explanation — just the raw JSON object."
)


def _get_client() -> Groq:
    if not GROQ_API_KEY:
        raise RuntimeError(
            "GROQ_API_KEY is not set. "
            "Please add it to your .env file or set it as an environment variable."
        )
    return Groq(api_key=GROQ_API_KEY)


def _extract_json(text: str) -> dict:
    """Try to extract a JSON object from the LLM response text.

    Handles cases where the model wraps the JSON in markdown code fences.
    """
    stripped = text.strip()

    # Strip markdown code fences if present
    if stripped.startswith("```"):
        # Remove opening fence (with optional language tag)
        first_newline = stripped.index("\n")
        stripped = stripped[first_newline + 1 :]
        # Remove closing fence
        if stripped.endswith("```"):
            stripped = stripped[: -3].strip()

    return json.loads(stripped)


def _call_llm(client: Groq, user_text: str, system: str) -> str:
    """Make a single API call to Groq and return the text response."""
    chat_completion = client.chat.completions.create(
        model=GROQ_MODEL,
        max_tokens=MAX_TOKENS,
        messages=[
            {
                "role": "system",
                "content": system,
            },
            {
                "role": "user",
                "content": user_text,
            },
        ],
        temperature=0.3,
    )
    return chat_completion.choices[0].message.content or ""


async def generate_scope(client_notes: str) -> ProjectScope:
    """Send client notes to Groq LLM and return a validated ProjectScope.

    On the first attempt the standard system prompt is used.
    If parsing or validation fails, a retry is made with a stricter prompt.
    Raises ValueError if both attempts fail.
    """
    client = _get_client()

    # ── Attempt 1 ──────────────────────────────────────────────────────
    last_error: str = ""
    try:
        raw = _call_llm(client, client_notes, SYSTEM_PROMPT)
        logger.debug("LLM response (attempt 1): %s", raw[:500])
        data = _extract_json(raw)
        return ProjectScope(**data)
    except (json.JSONDecodeError, ValidationError, ValueError, KeyError) as exc:
        last_error = str(exc)
        logger.warning("Attempt 1 failed (%s): %s", type(exc).__name__, exc)

    # ── Attempt 2 (stricter prompt) ────────────────────────────────────
    try:
        stricter_system = SYSTEM_PROMPT + RETRY_SUFFIX
        raw = _call_llm(client, client_notes, stricter_system)
        logger.debug("LLM response (attempt 2): %s", raw[:500])
        data = _extract_json(raw)
        return ProjectScope(**data)
    except (json.JSONDecodeError, ValidationError, ValueError, KeyError) as exc:
        logger.error("Attempt 2 also failed (%s): %s", type(exc).__name__, exc)
        raise ValueError(
            f"Failed to get valid structured output from the LLM after 2 attempts. "
            f"Last error: {exc}. Previous error: {last_error}"
        ) from exc
