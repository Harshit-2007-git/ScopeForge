import { ScopeData } from "./types";

const API_BASE = "http://localhost:8000";

export async function generateScope(
  text?: string,
  file?: File
): Promise<ScopeData> {
  const formData = new FormData();

  if (file) {
    formData.append("file", file);
  } else if (text) {
    formData.append("text", text);
  } else {
    throw new Error("Either text or a file must be provided.");
  }

  const response = await fetch(`${API_BASE}/generate-scope`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    let message = `Server error (${response.status})`;
    try {
      const parsed = JSON.parse(errorBody);
      message = parsed.detail || parsed.message || message;
    } catch {
      if (errorBody) message = errorBody;
    }
    throw new Error(message);
  }

  return response.json();
}

export async function exportDocx(scopeData: ScopeData): Promise<void> {
  const response = await fetch(`${API_BASE}/export-docx`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(scopeData),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    let message = `Export failed (${response.status})`;
    try {
      const parsed = JSON.parse(errorBody);
      message = parsed.detail || parsed.message || message;
    } catch {
      if (errorBody) message = errorBody;
    }
    throw new Error(message);
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;

  // Extract filename from Content-Disposition header or use default
  const contentDisposition = response.headers.get("Content-Disposition");
  let filename = `${scopeData.project_title || "scope-document"}.docx`;
  if (contentDisposition) {
    const match = contentDisposition.match(/filename="?(.+?)"?$/);
    if (match) filename = match[1];
  }

  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}
