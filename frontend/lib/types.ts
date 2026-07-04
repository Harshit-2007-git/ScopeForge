export interface TechStackItem {
  layer: string;
  choice: string;
  reason: string;
}

export interface TimelinePhase {
  phase: string;
  duration: string;
  deliverable: string;
}

export interface RiskOrQuestion {
  type: "risk" | "question";
  detail: string;
}

export interface ScopeData {
  project_title: string;
  summary: string;
  scope: {
    included: string[];
    excluded: string[];
  };
  tech_stack: TechStackItem[];
  timeline: TimelinePhase[];
  risks_and_questions: RiskOrQuestion[];
}
