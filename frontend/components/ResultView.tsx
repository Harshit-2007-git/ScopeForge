"use client";

import { useState } from "react";
import { ScopeData } from "@/lib/types";
import { exportDocx } from "@/lib/api";

interface ResultViewProps {
  data: ScopeData;
}

export default function ResultView({ data }: ResultViewProps) {
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const handleExport = async () => {
    setExporting(true);
    setExportError(null);
    try {
      await exportDocx(data);
    } catch (err) {
      setExportError(err instanceof Error ? err.message : "Export failed");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Success indicator */}
      <div className="text-center animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/30">
          <svg
            className="w-4 h-4 text-success"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-success text-sm font-medium">
            Scope generated successfully
          </span>
        </div>
      </div>

      {/* Card 1: Project Title & Summary */}
      <div className="glass-card gradient-border p-6 md:p-8 animate-fade-in-up stagger-1">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center shrink-0">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold gradient-text">
              {data.project_title}
            </h2>
          </div>
        </div>
        <p className="text-text-secondary leading-relaxed text-base pl-[52px]">
          {data.summary}
        </p>
      </div>

      {/* Card 2: Scope - Included / Excluded */}
      <div className="glass-card p-6 md:p-8 animate-fade-in-up stagger-2">
        <h3 className="text-lg font-semibold text-text-primary mb-5 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-accent-cyan"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          Project Scope
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Included */}
          <div>
            <h4 className="text-sm font-semibold text-success uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              Included
            </h4>
            <ul className="space-y-2">
              {data.scope.included.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-text-secondary"
                >
                  <svg
                    className="w-4 h-4 text-success shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Excluded */}
          <div>
            <h4 className="text-sm font-semibold text-danger uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Excluded
            </h4>
            <ul className="space-y-2">
              {data.scope.excluded.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-text-secondary"
                >
                  <svg
                    className="w-4 h-4 text-danger shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Card 3: Tech Stack */}
      <div className="glass-card p-6 md:p-8 animate-fade-in-up stagger-3">
        <h3 className="text-lg font-semibold text-text-primary mb-5 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-accent-purple"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
            />
          </svg>
          Technology Stack
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60">
                <th className="text-left py-3 px-4 text-text-muted font-semibold uppercase tracking-wider text-xs">
                  Layer
                </th>
                <th className="text-left py-3 px-4 text-text-muted font-semibold uppercase tracking-wider text-xs">
                  Choice
                </th>
                <th className="text-left py-3 px-4 text-text-muted font-semibold uppercase tracking-wider text-xs">
                  Reason
                </th>
              </tr>
            </thead>
            <tbody>
              {data.tech_stack.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-border/30 last:border-0 hover:bg-surface-lighter/20 transition-colors"
                >
                  <td className="py-3 px-4 text-text-primary font-medium">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-accent-purple/10 text-accent-purple text-xs font-semibold">
                      {row.layer}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-text-primary font-medium">
                    {row.choice}
                  </td>
                  <td className="py-3 px-4 text-text-secondary">
                    {row.reason}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Card 4: Timeline */}
      <div className="glass-card p-6 md:p-8 animate-fade-in-up stagger-4">
        <h3 className="text-lg font-semibold text-text-primary mb-5 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-accent-blue"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Project Timeline
        </h3>
        <div className="relative">
          {data.timeline.map((phase, i) => (
            <div key={i} className="flex gap-4 pb-6 last:pb-0">
              {/* Timeline line and dot */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                    i === 0
                      ? "bg-gradient-to-br from-accent-blue to-accent-purple text-white"
                      : "bg-surface-lighter border-2 border-border text-text-muted"
                  }`}
                >
                  {i + 1}
                </div>
                {i < data.timeline.length - 1 && (
                  <div className="w-0.5 flex-1 bg-gradient-to-b from-border to-border/30 mt-2" />
                )}
              </div>

              {/* Phase content */}
              <div className="pb-2 pt-1 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h4 className="text-text-primary font-semibold text-sm">
                    {phase.phase}
                  </h4>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-accent-blue/10 text-accent-blue text-xs font-medium border border-accent-blue/20">
                    {phase.duration}
                  </span>
                </div>
                <p className="text-text-secondary text-sm">
                  {phase.deliverable}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Card 5: Risks & Questions */}
      <div className="glass-card p-6 md:p-8 animate-fade-in-up stagger-5">
        <h3 className="text-lg font-semibold text-text-primary mb-5 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-warning"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
          Risks & Questions
        </h3>
        <div className="space-y-3">
          {data.risks_and_questions.map((item, i) => {
            const isRisk = item.type === "risk";
            return (
              <div
                key={i}
                className={`flex items-start gap-3 p-3 rounded-xl border ${
                  isRisk
                    ? "bg-warning/5 border-warning/20"
                    : "bg-info/5 border-info/20"
                }`}
              >
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider shrink-0 mt-0.5 ${
                    isRisk
                      ? "bg-warning/15 text-warning"
                      : "bg-info/15 text-info"
                  }`}
                >
                  {isRisk ? (
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                      />
                    </svg>
                  )}
                  {item.type}
                </span>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {item.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Download Button */}
      <div className="animate-fade-in-up stagger-5 pt-2">
        <button
          onClick={handleExport}
          disabled={exporting}
          className="btn-gradient w-full py-4 px-6 rounded-xl text-white font-semibold flex items-center justify-center gap-2.5 text-base"
        >
          {exporting ? (
            <>
              <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              Exporting Document...
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              Download as .docx
            </>
          )}
        </button>

        {exportError && (
          <p className="text-danger text-sm text-center mt-3 animate-fade-in">
            {exportError}
          </p>
        )}
      </div>
    </div>
  );
}
