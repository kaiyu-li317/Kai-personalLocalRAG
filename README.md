# KAI – Personal Local RAG

KAI is a cross-platform desktop application for building a **personal knowledge base** and doing **grounded Q&A over your own documents**. All data is stored **locally** for privacy.

---

## What it does

KAI turns your files into a searchable knowledge base:

1. Import documents (PDF / Word / Markdown / plain text / web links)
2. Split content into chunks and build embeddings
3. Store vectors locally (for fast semantic retrieval)
4. Answer questions using retrieved context **with source citations**

---

## Features

### Knowledge Base Management
- Multi-format import: PDF, Word, Markdown, plain text, web links
- Automatic processing: chunking, metadata extraction, indexing
- Organization: folders/tags, batch operations
- Document versioning / revision history (if enabled in the app)

### Intelligent Search & Q&A
- Semantic (vector) search (meaning-based, not only keyword-based)
- Multi-turn conversational Q&A
- Source citations in answers
- Cross-document retrieval and synthesis

### Local LLM Support
- Designed for **offline** usage with **Ollama** as the local LLM provider
- Embedding model: **M3E** (local embedding model used for semantic indexing)

### Desktop App
- Built with **Tauri 2.0** for Windows / macOS / Linux
- Lightweight and fast compared with Electron-based alternatives

---

## Tech Stack

**Frontend**
- Vue 3 (Composition API)
- Vite
- Naive UI
- Tauri 2.0

**Backend**
- Python 3.11+
- FastAPI
- SQLAlchemy (SQLite)
- LangChain
- ChromaDB (vector store)

---

## Project Structure

```txt
Kai-personalLocalRAG/
├── kai-client/        # Vue + Vite + NaiveUI frontend (Tauri shell)
├── kai-server/        # FastAPI backend (RAG pipeline, DB, vector store)
├── start.sh           # start all services (optional)
├── stop.sh            # stop all services (optional)
└── LICENSE


⸻

Requirements
	•	Python >= 3.11
	•	Node.js >= 18.x
	•	Ollama (optional but recommended for local LLM)

⸻

Quick Start

1) Clone

git clone https://github.com/kaiyu-li317/Kai-personalLocalRAG.git
cd Kai-personalLocalRAG

2) Start with scripts (recommended)

chmod +x start.sh stop.sh
./start.sh

Stop:

./stop.sh

3) Manual start

Backend

cd kai-server
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python app.py

Frontend

cd ../kai-client
npm install
npm run dev

Open the app:
	•	http://localhost:11420

⸻

Ports
	•	Frontend: 11420
	•	Backend API: 6088
	•	Ollama: 11434

⸻

Ollama Setup (Optional)

Install Ollama and pull a model:

ollama serve
ollama pull qwen2.5:7b

You can swap models depending on your hardware.

⸻

Configuration

Configuration files are located in kai-server/config/:
	•	llm.py — Ollama host / default model configuration
	•	common.py — common settings (ports, paths, etc.)
	•	datasource.py — database configuration

If the frontend proxies API requests, check:
	•	kai-client/vite.config.* (proxy target and dev server options)

⸻

Development

Backend

cd kai-server
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python app.py

Frontend

cd kai-client
npm install
npm run dev

Build desktop app (Tauri)

cd kai-client
npm run tauri build


⸻

Contributing
	1.	Fork the repo
	2.	Create a branch: git checkout -b feature/your-feature
	3.	Commit: git commit -m "Add your feature"
	4.	Push: git push origin feature/your-feature
	5.	Open a Pull Request

⸻

License

MIT License — see LICENSE.

⸻

Contact
	•	Email: kaiyuli317@gmail.com
	•	GitHub: kaiyu-li317

⸻

Acknowledgements
	•	Ollama — local LLM runtime
	•	M3E — embedding model
	•	LangChain — LLM orchestration
	•	ChromaDB — vector database
	•	FastAPI — backend framework
	•	Tauri — desktop framework
	•	Vue / Vite / Naive UI — frontend stack

If you want this even tighter, I can compress it to a “README that fits on one screen” version without losing the essentials.
