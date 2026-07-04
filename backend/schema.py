"""
Pydantic models defining the structured project scope schema.
Used for both LLM output validation and the /export-docx request body.
"""

from __future__ import annotations
from typing import List, Literal
from pydantic import BaseModel, Field


class Scope(BaseModel):
    included: List[str] = Field(..., description="Items explicitly in scope")
    excluded: List[str] = Field(..., description="Items explicitly out of scope")


class TechStackItem(BaseModel):
    layer: str = Field(..., description="e.g. Frontend, Backend, Database")
    choice: str = Field(..., description="Technology chosen")
    reason: str = Field(..., description="One-sentence justification")


class TimelinePhase(BaseModel):
    phase: str = Field(..., description="Phase name")
    duration: str = Field(..., description="e.g. '1 week', '2 weeks'")
    deliverable: str = Field(..., description="What is delivered at end of phase")


class RiskOrQuestion(BaseModel):
    type: Literal["risk", "question"] = Field(
        ..., description="Whether this is a risk or an open question"
    )
    detail: str = Field(..., description="Description of the risk or question")


class ProjectScope(BaseModel):
    """Top-level schema returned by the LLM and accepted by /export-docx."""

    project_title: str = Field(..., description="Name/title of the project")
    summary: str = Field(
        ..., description="2-3 sentence plain-English summary of the project"
    )
    scope: Scope
    tech_stack: List[TechStackItem] = Field(default_factory=list)
    timeline: List[TimelinePhase] = Field(default_factory=list)
    risks_and_questions: List[RiskOrQuestion] = Field(default_factory=list)
