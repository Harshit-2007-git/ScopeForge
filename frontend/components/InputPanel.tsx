"use client";

import { useState, useRef, useCallback } from "react";

interface InputPanelProps {
  onGenerate: (text?: string, file?: File) => void;
  isLoading: boolean;
}

export default function InputPanel({ onGenerate, isLoading }: InputPanelProps) {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
  ];
  const acceptedExtensions = [".pdf", ".docx", ".txt"];

  const isValidFile = (f: File) => {
    return (
      acceptedTypes.includes(f.type) ||
      acceptedExtensions.some((ext) => f.name.toLowerCase().endsWith(ext))
    );
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && isValidFile(droppedFile)) {
      setFile(droppedFile);
      setText("");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected && isValidFile(selected)) {
      setFile(selected);
      setText("");
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = () => {
    if (file) {
      onGenerate(undefined, file);
    } else if (text.trim()) {
      onGenerate(text.trim(), undefined);
    }
  };

  const canSubmit = (text.trim().length > 0 || file !== null) && !isLoading;

  return (
    <section className="animate-fade-in-up stagger-1">
      <hr className="hairline mb-6" />

      <div className="clause-section">
        {/* Clause number rail */}
        <div className="clause-number pt-1">INPUT</div>

        {/* Content */}
        <div>
          <h2 className="font-display text-lg font-semibold text-ink mb-1">
            Client Notes
          </h2>
          <p className="text-warm-gray text-sm mb-4">
            Paste raw notes below or attach a document
          </p>

          {/* Textarea */}
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (e.target.value) setFile(null);
            }}
            placeholder={`Paste client notes, emails, call transcripts, or rough briefs here...

e.g. "We need a customer portal for our auto repair shop. Customers should book appointments online, see repair status, and pay invoices. We use QuickBooks. Around 200 customers/month, mostly mobile..."`}
            rows={7}
            disabled={isLoading || file !== null}
            className="input-manuscript w-full rounded-lg px-4 py-3 text-sm leading-relaxed resize-none mb-4"
          />

          {/* File Upload */}
          <div className="flex items-center gap-3 mb-5">
            {!file ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`drop-zone flex-1 rounded-lg px-4 py-3 cursor-pointer flex items-center gap-3 ${
                  isDragOver ? "drag-over" : ""
                } ${isLoading ? "opacity-40 pointer-events-none" : ""}`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.txt"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <svg className="w-4 h-4 text-warm-gray shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                </svg>
                <span className="text-warm-gray text-sm">
                  Attach file
                  <span className="text-warm-gray-light ml-1.5 font-mono text-xs">.pdf .docx .txt</span>
                </span>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-between border border-rule rounded-lg px-4 py-2.5 bg-paper-light animate-fade-in">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-semibold text-slate uppercase">
                    {file.name.split(".").pop()}
                  </span>
                  <span className="text-ink text-sm truncate max-w-[240px]">
                    {file.name}
                  </span>
                  <span className="font-mono text-xs text-warm-gray">
                    {(file.size / 1024).toFixed(1)}KB
                  </span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); removeFile(); }}
                  disabled={isLoading}
                  className="text-warm-gray hover:text-redline transition-colors p-1"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Generate Button */}
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="btn-primary px-6 py-2.5 rounded-lg text-sm flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Generating scope…
              </>
            ) : (
              <>Generate Scope</>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
