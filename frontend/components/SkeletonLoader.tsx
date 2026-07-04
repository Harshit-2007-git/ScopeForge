export default function SkeletonLoader() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-2">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-light/50 border border-border/50">
          <svg className="w-4 h-4 animate-spin text-accent-blue" viewBox="0 0 24 24">
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
          <span className="text-text-secondary text-sm">
            AI is analyzing your notes...
          </span>
        </div>
      </div>

      {/* Title skeleton */}
      <div className="glass-card p-6 animate-pulse-glow">
        <div className="animate-shimmer h-7 w-3/5 rounded-lg mb-4" />
        <div className="space-y-2">
          <div className="animate-shimmer h-4 w-full rounded-lg" />
          <div className="animate-shimmer h-4 w-4/5 rounded-lg" />
        </div>
      </div>

      {/* Scope skeleton */}
      <div className="glass-card p-6">
        <div className="animate-shimmer h-6 w-40 rounded-lg mb-4" />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-shimmer h-4 rounded-lg" style={{ width: `${85 - i * 10}%` }} />
            ))}
          </div>
          <div className="space-y-2">
            {[1, 2].map((i) => (
              <div key={i} className="animate-shimmer h-4 rounded-lg" style={{ width: `${80 - i * 10}%` }} />
            ))}
          </div>
        </div>
      </div>

      {/* Tech stack skeleton */}
      <div className="glass-card p-6">
        <div className="animate-shimmer h-6 w-36 rounded-lg mb-4" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex gap-4">
              <div className="animate-shimmer h-4 w-24 rounded-lg" />
              <div className="animate-shimmer h-4 w-32 rounded-lg" />
              <div className="animate-shimmer h-4 flex-1 rounded-lg" />
            </div>
          ))}
        </div>
      </div>

      {/* Timeline skeleton */}
      <div className="glass-card p-6">
        <div className="animate-shimmer h-6 w-32 rounded-lg mb-4" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="animate-shimmer w-8 h-8 rounded-full shrink-0" />
              <div className="flex-1 space-y-1">
                <div className="animate-shimmer h-4 w-48 rounded-lg" />
                <div className="animate-shimmer h-3 w-32 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
