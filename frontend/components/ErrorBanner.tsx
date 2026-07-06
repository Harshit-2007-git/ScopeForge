"use client";

interface ErrorBannerProps {
  message: string;
  onDismiss: () => void;
}

export default function ErrorBanner({ message, onDismiss }: ErrorBannerProps) {
  return (
    <div className="animate-fade-in border-l-2 border-redline bg-[rgba(196,67,43,0.04)] px-4 py-3 flex items-start justify-between gap-3 rounded-r-lg">
      <div className="flex items-start gap-2.5">
        <span className="font-mono text-[10px] font-semibold text-redline tracking-widest uppercase mt-0.5 shrink-0">
          ERROR
        </span>
        <p className="text-sm text-ink leading-relaxed">
          {message}
        </p>
      </div>
      <button
        onClick={onDismiss}
        className="text-warm-gray hover:text-ink transition-colors shrink-0 p-0.5"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
