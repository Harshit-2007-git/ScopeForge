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
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 md:px-8 pb-16">
        <Header />

        <main>
          {/* Input Section */}
          <InputPanel onGenerate={handleGenerate} isLoading={isLoading} />

          {/* Error State */}
          {error && (
            <div className="mt-6">
              <ErrorBanner message={error} onDismiss={() => setError(null)} />
            </div>
          )}

          {/* Loading State */}
          {isLoading && <SkeletonLoader />}

          {/* Results */}
          {scopeData && !isLoading && <ResultView data={scopeData} />}

          {/* Empty State */}
          {!scopeData && !isLoading && !error && (
            <div className="mt-12 text-center animate-fade-in">
              <p className="text-warm-gray text-sm">
                Your generated scope document will appear here.
              </p>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-16">
          <hr className="hairline mb-5" />
          <div className="flex items-center justify-between">
            <span className="font-display text-xs text-warm-gray">
              ScopeForge
            </span>
            <span className="font-mono text-[10px] text-warm-gray tracking-wider">
              v1.0 — AI-powered scope generation
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
