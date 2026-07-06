"use client";

export default function SkeletonLoader() {
  return (
    <div className="mt-2 animate-fade-in">
      {/* Document header skeleton */}
      <div className="flex items-center gap-3 mb-6">
        <div className="skeleton-line w-28" />
        <div className="flex-1 h-px bg-rule-light" />
        <div className="skeleton-line w-20" />
      </div>

      {/* Section skeletons */}
      {[1, 2, 3, 4, 5].map((n) => (
        <div key={n} className="mb-8">
          <hr className="hairline mb-6" />
          <div className="clause-section">
            <div className="clause-number animate-pulse-line">
              {String(n).padStart(2, "0")}
            </div>
            <div className="space-y-3">
              <div className="skeleton-line w-40 h-4" />
              <div className="skeleton-line w-full" />
              <div className="skeleton-line w-3/4" />
              {n <= 2 && <div className="skeleton-line w-5/6" />}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
