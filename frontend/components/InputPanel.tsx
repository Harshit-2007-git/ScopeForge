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

  const getFileIcon = () => {
    if (!file) return null;
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (ext === "pdf")
      return (
        <span className="text-red-400 font-semibold text-sm uppercase">
          PDF
        </span>
      );
    if (ext === "docx")
      return (
        <span className="text-blue-400 font-semibold text-sm uppercase">
          DOCX
        </span>
      );
    return (
      <span className="text-green-400 font-semibold text-sm uppercase">
        TXT
      </span>
    );
  };

  return (
    <div className="glass-card p-6 md:p-8 animate-fade-in-up">
      <h2 className="text-xl font-semibold text-text-primary mb-1 flex items-center gap-2">
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
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
        Input Your Notes
      </h2>
      <p className="text-text-muted text-sm mb-6">
        Paste your client notes below or upload a document
      </p>

      {/* Textarea */}
      <div className="mb-5">
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (e.target.value) setFile(null);
          }}
          placeholder={`Paste your messy client notes here...

Example:
"We need an e-commerce platform with user authentication, product catalog, shopping cart, and payment integration. Should work on mobile too. Budget is around $50k and we want it done in 3 months. Worried about scaling during Black Friday sales..."`}
          rows={8}
          disabled={isLoading || file !== null}
          className="w-full bg-surface-light/50 border border-border rounded-xl px-4 py-3 text-text-primary placeholder-text-muted/60 resize-none focus:outline-none focus:border-accent-blue/60 focus:ring-1 focus:ring-accent-blue/30 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed text-sm leading-relaxed"
        />
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-5">
        <div className="flex-1 h-px bg-border/60" />
        <span className="text-text-muted text-xs uppercase tracking-widest font-medium">
          or upload a file
        </span>
        <div className="flex-1 h-px bg-border/60" />
      </div>

      {/* File Upload */}
      {!file ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`drop-zone rounded-xl p-8 text-center cursor-pointer ${
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
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-surface-lighter/60 flex items-center justify-center">
              <svg
                className={`w-6 h-6 transition-colors ${
                  isDragOver ? "text-accent-blue" : "text-text-muted"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
            </div>
            <div>
              <p className="text-text-secondary text-sm font-medium">
                Drag & drop your file here, or{" "}
                <span className="text-accent-blue hover:underline">browse</span>
              </p>
              <p className="text-text-muted text-xs mt-1">
                Supports .pdf, .docx, .txt
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-surface-light/40 border border-border rounded-xl p-4 flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-surface-lighter/60 flex items-center justify-center">
              {getFileIcon()}
            </div>
            <div>
              <p className="text-text-primary text-sm font-medium truncate max-w-[260px]">
                {file.name}
              </p>
              <p className="text-text-muted text-xs">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeFile();
            }}
            disabled={isLoading}
            className="p-1.5 rounded-lg hover:bg-surface-lighter/60 text-text-muted hover:text-danger transition-colors disabled:opacity-40"
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
      )}

      {/* Generate Button */}
      <button
        onClick={handleSubmit}
        disabled={!canSubmit}
        className="btn-gradient w-full mt-6 py-3.5 px-6 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2"
      >
        {isLoading ? (
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
            Generating Scope...
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
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Generate Scope
          </>
        )}
      </button>
    </div>
  );
}
