"use client";

import { useState } from "react";
import Header from "@/components/Header";
import InputPanel from "@/components/InputPanel";
import ResultView from "@/components/ResultView";
import SkeletonLoader from "@/components/SkeletonLoader";
import ErrorBanner from "@/components/ErrorBanner";
import { ScopeData } from "@/lib/types";
import { generateScope } from "@/lib/api";

export default function Home() {
  const [scopeData, setScopeData] = useState<ScopeData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (text?: string, file?: File) => {
    setIsLoading(true);
    setError(null);
    setScopeData(null);

    try {
      const result = await generateScope(text, file);
      setScopeData(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-grid-pattern">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Header />

        <main className="space-y-8">
          {/* Input Section */}
          <InputPanel onGenerate={handleGenerate} isLoading={isLoading} />

          {/* Error State */}
          {error && (
            <ErrorBanner message={error} onDismiss={() => setError(null)} />
          )}

          {/* Loading State */}
          {isLoading && <SkeletonLoader />}

          {/* Results */}
          {scopeData && !isLoading && <ResultView data={scopeData} />}

          {/* Empty State */}
          {!scopeData && !isLoading && !error && (
            <div className="text-center py-16 animate-fade-in">
              <div className="w-20 h-20 rounded-2xl bg-surface-light/50 border border-border/50 flex items-center justify-center mx-auto mb-5">
                <svg
                  className="w-9 h-9 text-text-muted/50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
              </div>
              <h3 className="text-text-secondary font-medium text-lg mb-2">
                No scope document yet
              </h3>
              <p className="text-text-muted text-sm max-w-md mx-auto">
                Paste your client notes or upload a document above, then click{" "}
                <span className="text-accent-blue font-medium">
                  &ldquo;Generate Scope&rdquo;
                </span>{" "}
                to get started.
              </p>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-16 text-center">
          <div className="h-px bg-gradient-to-r from-transparent via-border/60 to-transparent mb-6" />
          <p className="text-text-muted text-xs">
            Built with{" "}
            <span className="gradient-text font-medium">ScopeForge</span> —
            Powered by AI
          </p>
        </footer>
      </div>
    </div>
  );
}
