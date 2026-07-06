# ScopeForge

**Transform messy client notes into structured scope documents in seconds.**

> Paste a rambling client email, a call transcript, or a rough brief — ScopeForge uses AI to produce a clean, structured project scope document with defined scope boundaries, tech stack recommendations, realistic timelines, and flagged risks. Export it as a polished `.docx` with one click.

---

## 🎯 Problem

Project managers and agency owners spend **2–4 hours** manually converting raw client conversations into structured scope documents. Notes are often vague, disorganized, or missing key details — leading to scope creep, misaligned expectations, and wasted proposal cycles.

## ✅ Solution

ScopeForge reduces that to **under 2 minutes**. Paste your notes (or upload a file), click "Generate Scope," and get a structured, proposal-ready document covering:

- **Scope** — What's included and explicitly excluded
- **Tech Stack** — Practical, budget-appropriate technology recommendations
- **Timeline** — Phase-based delivery estimates
- **Risks & Open Questions** — Ambiguities and red flags flagged automatically

Download the result as a formatted `.docx` ready to drop into your next client proposal.

---

## 🏗️ Architecture

```
┌──────────────┐     ┌──────────────────┐     ┌─────────────┐
│   Frontend   │────▶│    Backend API    │────▶│  Groq API    │
│  (Next.js)   │◀────│    (FastAPI)      │◀────│  (LLaMA 3.3) │
│  :3000       │     │    :8000          │     │              │
└──────────────┘     └──────────────────┘     └─────────────┘
                            │
                     ┌──────┴──────┐
                     │  File I/O   │
                     │ .docx .pdf  │
                     │   .txt      │
                     └─────────────┘
```

**Flow:** Input → Parser → Groq API → Structured JSON → Render / Export

---

## 🛠️ Tech Stack

| Layer      | Technology                    | Purpose                          |
|------------|-------------------------------|----------------------------------|
| Frontend   | Next.js + React + Tailwind    | Editorial spec-document UI       |
| Backend    | FastAPI (Python)              | REST API + file processing       |
| LLM        | Groq API (LLaMA 3.3 70B)     | Structured scope generation      |
| File Parse | python-docx, pypdf            | .docx and .pdf text extraction   |
| File Export| python-docx                   | Formatted .docx generation       |

---

## 🚀 Getting Started

### Prerequisites

- Python 3.12+
- Node.js 18+
- A [Groq API key](https://console.groq.com/)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ScopeForge.git
cd ScopeForge
```

### 2. Set up the Backend

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure API key
copy .env.example .env
# Edit .env and add your GROQ_API_KEY

# Start the server
uvicorn main:app --reload --port 8000
```

The backend will be running at `http://localhost:8000`.

### 3. Set up the Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The frontend will be running at `http://localhost:3000`.

### 4. Use it

1. Open `http://localhost:3000` in your browser
2. Paste client notes into the text area, or upload a `.docx` / `.pdf` / `.txt` file
3. Click **"Generate Scope"**
4. Review the structured output across the four section cards
5. Click **"Download as .docx"** to get a formatted Word document

---

## 📋 Sample Test Inputs

Three sample briefs are included in the `/samples` directory:

| File | Description | Tests |
|------|-------------|-------|
| `clean_brief.txt` | Well-organized auto repair shop portal request | Clean, confident scope output |
| `vague_brief.txt` | Rambling, unclear client email about "an app or something" | Risks & open questions generation |
| `overscoped_brief.txt` | Marketplace platform with 15+ features, tiny budget | Scope creep flagging & realistic boundaries |

---

## 📡 API Reference

### `POST /generate-scope`

Generate a structured scope document from raw client notes.

**Request:** `multipart/form-data`
- `text` (string, optional) — Raw text input
- `file` (file, optional) — Uploaded .docx, .pdf, or .txt file

**Response:** JSON object with `project_title`, `summary`, `scope`, `tech_stack`, `timeline`, `risks_and_questions`

### `POST /export-docx`

Export a scope document as a formatted Word file.

**Request:** `application/json` — The scope JSON object
**Response:** `.docx` file download

---

## 🗺️ Roadmap (Post-MVP)

- [ ] User accounts & authentication
- [ ] Scope history — save and revisit past generations
- [ ] In-place editing of generated scope sections
- [ ] Slack / email integration for direct brief intake
- [ ] CRM integration (HubSpot, Salesforce)
- [ ] Multi-tenant support for agency teams
- [ ] Custom prompt templates per client type
- [ ] Cost estimation module

---

## 📄 Current State

**MVP — Working Local Demo**

- ✅ Paste text or upload .docx/.pdf/.txt
- ✅ AI-powered structured scope generation (Groq / LLaMA 3.3)
- ✅ Editorial spec-document layout with clause numbering
- ✅ Download as formatted .docx
- ✅ Error handling and loading states
- ✅ Premium editorial UI with Fraunces + Inter + IBM Plex Mono typography

---

## 📝 License

MIT License. See [LICENSE](LICENSE) for details.
