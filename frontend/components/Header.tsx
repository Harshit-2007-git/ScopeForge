"use client";

export default function Header() {
  return (
    <header className="pt-12 pb-10 animate-fade-in">
      {/* Wordmark */}
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink tracking-tight">
          ScopeForge
        </h1>
        <p className="text-warm-gray text-sm mt-1.5 tracking-wide">
          Messy notes in. Structured scope out.
        </p>
      </div>

      {/* Redline Before/After Visualization */}
      <div className="border border-rule rounded-lg p-5 md:p-6 bg-paper-light/60">
        <div className="flex items-center gap-2 mb-4">
          <span className="redline-annotation">BEFORE → AFTER</span>
          <div className="flex-1 h-px bg-rule" />
        </div>

        <div className="space-y-3 text-sm leading-relaxed">
          {/* Before: messy text with strikethrough */}
          <div className="flex gap-3">
            <span className="redline-annotation mt-0.5 shrink-0">DEL</span>
            <p className="redline-strike">
              &ldquo;yeah so we basically need like an app or something, maybe a dashboard? 
              idk if mobile too, mike said budget isnt a concern but also dont go crazy lol&rdquo;
            </p>
          </div>

          {/* After: clean numbered clause */}
          <div className="flex gap-3">
            <span className="font-mono text-[10px] text-slate font-semibold mt-0.5 shrink-0 tracking-wider">§1.1</span>
            <p className="redline-insert text-ink font-medium">
              Web-based order management dashboard with responsive mobile support. 
              Budget: to be scoped after requirements clarification.
            </p>
          </div>

          {/* Margin annotation */}
          <div className="flex gap-3 mt-1">
            <span className="redline-annotation mt-0.5 shrink-0">NOTE</span>
            <p className="font-mono text-[11px] text-redline leading-relaxed">
              ⚑ Flagged: &ldquo;budget isnt a concern&rdquo; conflicts with &ldquo;dont go crazy&rdquo; — 
              listed as open question in §5
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
