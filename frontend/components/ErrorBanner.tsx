"use client";

interface ErrorBannerProps {
  message: string;
  onDismiss: () => void;
}

export default function ErrorBanner({ message, onDismiss }: ErrorBannerProps) {
  return (
    <div className="animate-fade-in bg-danger/10 border border-danger/30 rounded-xl p-4 flex items-start gap-3">
      <div className="shrink-0 mt-0.5">
        <div className="w-8 h-8 rounded-full bg-danger/20 flex items-center justify-center">
          <svg
            className="w-4 h-4 text-danger"
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
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-danger font-semibold text-sm mb-0.5">
          Generation Failed
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed break-words">
          {message}
        </p>
      </div>
      <button
        onClick={onDismiss}
        className="shrink-0 p-1 rounded-lg hover:bg-danger/20 text-text-muted hover:text-danger transition-colors"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
