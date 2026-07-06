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

  const risks = data.risks_and_questions.filter((r) => r.type === "risk");
  const questions = data.risks_and_questions.filter((r) => r.type === "question");

  return (
    <div className="mt-2">
      {/* Document header */}
      <div className="animate-fade-in mb-2">
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-[10px] text-slate font-semibold tracking-widest uppercase">
            Scope Document
          </span>
          <div className="flex-1 h-px bg-rule" />
          <span className="font-mono text-[10px] text-warm-gray tracking-wide">
            Generated {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
        </div>
      </div>

      {/* ── 01 SUMMARY ──────────────────────────────────────────────── */}
      <section className="animate-fade-in-up stagger-1">
        <hr className="hairline mb-6" />
        <div className="clause-section mb-8">
          <div className="clause-number">01</div>
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink tracking-tight mb-3">
              {data.project_title}
            </h2>
            <p className="text-ink-light leading-relaxed text-[15px]">
              {data.summary}
            </p>
          </div>
        </div>
      </section>

      {/* ── 02 SCOPE ────────────────────────────────────────────────── */}
      <section className="animate-fade-in-up stagger-2">
        <hr className="hairline mb-6" />
        <div className="clause-section mb-8">
          <div className="clause-number">02</div>
          <div>
            <h3 className="font-display text-sm font-semibold tracking-widest uppercase text-slate mb-5">
              Scope
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Included */}
              <div>
                <h4 className="font-mono text-[10px] font-semibold tracking-widest uppercase text-warm-gray mb-3">
                  Included
                </h4>
                <ol className="space-y-2">
                  {data.scope.included.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-ink leading-relaxed">
                      <span className="font-mono text-xs text-warm-gray shrink-0 mt-0.5">
                        {String(i + 1).padStart(2, "0")}.
                      </span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Excluded */}
              <div>
                <h4 className="font-mono text-[10px] font-semibold tracking-widest uppercase text-warm-gray mb-3">
                  Excluded
                </h4>
                <ol className="space-y-2">
                  {data.scope.excluded.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-ink-light leading-relaxed">
                      <span className="font-mono text-xs text-warm-gray shrink-0 mt-0.5">—</span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03 STACK ────────────────────────────────────────────────── */}
      <section className="animate-fade-in-up stagger-3">
        <hr className="hairline mb-6" />
        <div className="clause-section mb-8">
          <div className="clause-number">03</div>
          <div>
            <h3 className="font-display text-sm font-semibold tracking-widest uppercase text-slate mb-5">
              Technology Stack
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-rule">
                    <th className="text-left py-2 pr-6 font-mono text-[10px] font-semibold tracking-widest uppercase text-warm-gray">
                      Layer
                    </th>
                    <th className="text-left py-2 pr-6 font-mono text-[10px] font-semibold tracking-widest uppercase text-warm-gray">
                      Choice
                    </th>
                    <th className="text-left py-2 font-mono text-[10px] font-semibold tracking-widest uppercase text-warm-gray">
                      Rationale
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.tech_stack.map((row, i) => (
                    <tr key={i} className="border-b border-rule-light last:border-0">
                      <td className="py-3 pr-6">
                        <span className="font-mono text-xs font-medium text-slate">
                          {row.layer}
                        </span>
                      </td>
                      <td className="py-3 pr-6 text-ink font-medium">
                        {row.choice}
                      </td>
                      <td className="py-3 text-ink-light">
                        {row.reason}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── 04 TIMELINE ─────────────────────────────────────────────── */}
      <section className="animate-fade-in-up stagger-4">
        <hr className="hairline mb-6" />
        <div className="clause-section mb-8">
          <div className="clause-number">04</div>
          <div>
            <h3 className="font-display text-sm font-semibold tracking-widest uppercase text-slate mb-5">
              Timeline
            </h3>

            <div className="space-y-0">
              {data.timeline.map((phase, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-4 py-3 ${
                    i < data.timeline.length - 1 ? "border-b border-rule-light" : ""
                  }`}
                >
                  <span className="font-mono text-xs text-warm-gray shrink-0 mt-0.5 w-16">
                    {phase.duration}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm text-ink font-medium">{phase.phase}</span>
                    <span className="text-warm-gray mx-2">—</span>
                    <span className="text-sm text-ink-light">{phase.deliverable}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 05 RISKS & QUESTIONS ────────────────────────────────────── */}
      <section className="animate-fade-in-up stagger-5">
        <hr className="hairline mb-6" />
        <div className="clause-section mb-8">
          <div className="clause-number">05</div>
          <div>
            <h3 className="font-display text-sm font-semibold tracking-widest uppercase text-slate mb-5">
              Risks &amp; Open Questions
            </h3>

            {risks.length > 0 && (
              <div className="mb-5">
                <h4 className="font-mono text-[10px] font-semibold tracking-widest uppercase text-redline mb-3">
                  Risks
                </h4>
                <div className="space-y-2.5">
                  {risks.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="tag-risk px-1.5 py-0.5 rounded mt-0.5 shrink-0">
                        ⚑ RISK
                      </span>
                      <p className="text-sm text-ink leading-relaxed">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {questions.length > 0 && (
              <div>
                <h4 className="font-mono text-[10px] font-semibold tracking-widest uppercase text-slate mb-3">
                  Open Questions
                </h4>
                <div className="space-y-2.5">
                  {questions.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="tag-question px-1.5 py-0.5 rounded mt-0.5 shrink-0">
                        ? OPEN
                      </span>
                      <p className="text-sm text-ink leading-relaxed">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Export ───────────────────────────────────────────────────── */}
      <section className="animate-fade-in-up stagger-5">
        <hr className="hairline mb-6" />
        <div className="clause-section mb-8">
          <div className="clause-number" />
          <div>
            <button
              onClick={handleExport}
              disabled={exporting}
              className="btn-primary px-5 py-2.5 rounded-lg text-sm flex items-center gap-2"
            >
              {exporting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Exporting…
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Download as .docx
                </>
              )}
            </button>

            {exportError && (
              <p className="text-redline text-sm mt-3 animate-fade-in">
                {exportError}
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
